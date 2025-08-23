"use client";

import DetailModal from "@/app/create/detail/page";
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
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

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
            console.log(logs);
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
        // setSelectedDate(date === selectedDate ? null : date);
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

    const category: { [key: number]: string } = {
        1: "SIGHTSEEING",
        2: "MEAL",
        3: "ACCOMMODATION",
        4: "ENTERTAINMENT",
        5: "SHOPPING",
        6: "OTHER",
    };

    const convertCategory = (key: number) => category[key] || "UNKNOWN";

    const onBack = () => {
        if (from === "create") {
            router.push(`/create/basic?id=${travelId}`);
        } else {
            router.push("/search");
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    {basicInfo?.date_start} ~ {basicInfo?.date_end}
                </p>
                <p>{basicInfo?.destination}</p>
            </div>
            <div>
                <ul>
                    {dateList.map((date) => (
                        <li key={date} className="flex flex-col">
                            <div className="flex items-center">
                                <div className="w-1/2">{date}</div>
                                <button
                                    onClick={() => openModal(date, null)}
                                    type="submit"
                                    className="w-auto bg-black text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-black"
                                >
                                    ADD
                                </button>
                            </div>
                            <div className="text-[18px]">
                                {logs
                                    .filter((log) => log.date === date)
                                    .map((log) => (
                                        <div key={log.id} className="mb-5">
                                            <div>
                                                <p>
                                                    {convertCategory(
                                                        log.category
                                                    )}
                                                </p>
                                                <p>{log.spot}</p>
                                                <p>{log.note}</p>
                                                <p>{log.expense}</p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    openModal(date, log)
                                                }
                                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                                            >
                                                <PencilSquareIcon className="w-7 h-7 mr-3" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteLog(log.id)
                                                }
                                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                                            >
                                                <TrashIcon className="w-7 h-7" />
                                            </button>
                                        </div>
                                    ))}
                            </div>
                            {selectedDate === date && basicInfo && (
                                <DetailModal
                                    log={log}
                                    travel_id={basicInfo.id}
                                    date={selectedDate}
                                    onClose={closeModal}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={onBack}
                    className="hover:bg-black hover:text-[#f5f5f5]"
                >
                    BACK
                </button>
            </div>
        </div>
    );
}
