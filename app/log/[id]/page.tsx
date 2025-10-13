"use client";

import {
    CreateDetailForm,
    UpdateDetailForm,
    CreateLogSchema,
    UpdateLogSchema,
} from "@/lib/validators/log";
import { Travel } from "@/lib/validators/travel";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogList from "@/app/ui/log/list";
import BackButton from "@/app/ui/common/back-button";
import DetailForm from "@/app/ui/create/detail-form";

export default function Page() {
    // パスパラメータ
    const params = useParams();
    const travelId = Number(params.id);
    // クエリパラメータ
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const router = useRouter();

    const [basicInfo, setBasicInfo] = useState<Travel>();
    const [logs, setLogs] = useState<UpdateDetailForm[]>([]);
    const [dateList, setDateList] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [log, setLog] = useState<UpdateDetailForm | null>(null);

    const fetchTravel = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/api/travel/${id}`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch travel");
            const fetchedTravel: Travel = await res.json();
            return fetchedTravel;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchLogs = async (id: number) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/log?travel_id=${id}`,
                { cache: "no-store" }
            );
            if (!res.ok) throw new Error("Failed to fetch travel");
            const fetchedLogs: UpdateDetailForm[] = await res.json();
            return fetchedLogs;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getData = async (id: number) => {
        const travel = await fetchTravel(id);
        if (travel) {
            const logs = await fetchLogs(travel.id);
            setBasicInfo(travel);
            if (logs) {
                setLogs(logs);
            } else {
                setLogs([]);
            }
            setDateList(calcDates(travel.date_start, travel.date_end));
        }
    };

    useEffect(() => {
        if (!isNaN(travelId)) getData(travelId);
    }, []);

    const calcDates = (date_start: string, date_end: string) => {
        const dateS = new Date(date_start);
        const dateE = new Date(date_end);
        const diffTime = dateE.getTime() - dateS.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const dates: string[] = [];
        for (let x = 0; x <= diffDays; x++) {
            const startDate = new Date(dateS);
            startDate.setDate(startDate.getDate() + x);
            dates.push(startDate.toISOString().split("T")[0]);
        }
        return dates;
    };

    const openModal = (date: string, log: UpdateDetailForm | null) => {
        setSelectedDate(date);
        setLog(log);
    };

    const closeModal = (
        detailForm: CreateDetailForm | UpdateDetailForm | null,
        isEdit: boolean
    ) => {
        if (detailForm) {
            handleSubmit(detailForm, isEdit);
        }
        openModal("", null);
    };

    const handleSubmit = async (
        detailForm: CreateDetailForm | UpdateDetailForm,
        isEdit: boolean
    ) => {
        // update
        if (isEdit) {
            const parsedForm = UpdateLogSchema.safeParse(detailForm);
            if (parsedForm.success) {
                try {
                    const res = await fetch("/api/log", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(parsedForm.data),
                    });
                    if (!res.ok) throw new Error("Failed to update Log");

                    await getData(travelId);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error(parsedForm.error);
            }
        } else {
            // insert
            const parsedForm = CreateLogSchema.safeParse(detailForm);
            if (parsedForm.success) {
                try {
                    const res = await fetch("/api/log", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(parsedForm.data),
                    });
                    if (!res.ok) throw new Error("Failed to insert Log");

                    await getData(travelId);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error(parsedForm.error);
            }
        }
    };

    const deleteLog = async (id: number) => {
        try {
            const res = await fetch("/api/log", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) throw new Error("Failed to delete Log");

            await getData(travelId);
        } catch (error) {
            console.error(error);
        }
    };

    const onBack = () => {
        if (from === "create") {
            router.push(`/create?id=${travelId}`);
        } else {
            router.push("/search");
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <BackButton onClick={onBack} />
            <div>
                <p>
                    {basicInfo?.date_start} ~ {basicInfo?.date_end}
                </p>
                <p>{basicInfo?.destination}</p>
            </div>
            <LogList
                dateList={dateList}
                logs={logs}
                onDetail={openModal}
                onDelete={deleteLog}
            />
            {selectedDate && basicInfo && (
                <DetailForm
                    log={log}
                    travel_id={basicInfo.id}
                    date={selectedDate}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
