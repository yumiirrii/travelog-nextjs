"use client";

import { UpdateDetailForm } from "@/lib/validators/log";
import { BasicForm, Travel } from "@/lib/validators/travel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "../ui/search/search-box";
import Table from "../ui/search/table";
import BackButton from "../ui/common/back-button";

export default function Page() {
    const [travels, setTravels] = useState<Travel[]>([]);
    const router = useRouter();

    const fetchTravels = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/travel`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch travel");
            const fetchedTravels: Travel[] = await res.json();
            setTravels(fetchedTravels);
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

    const deleteLog = async (travelId: number) => {
        const fetchedLogs = await fetchLogs(travelId);
        if (fetchedLogs) {
            for (const log of fetchedLogs) {
                try {
                    const res = await fetch("/api/log", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: log.id }),
                    });
                    if (!res.ok) throw new Error("Failed to delete Log");
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const deleteTravel = async (id: number) => {
        try {
            const res = await fetch("/api/travel", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) throw new Error("Failed to delete Travel");

            await fetchTravels();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteItem = async (id: number) => {
        await deleteLog(id);
        await deleteTravel(id);
    };

    const handleDetail = async (id: number) => {
        router.push(`/log/${id}`);
    };

    const fetchSearchTravel = async (params: BasicForm) => {
        try {
            const newParams = new URLSearchParams();
            if (params.date_start)
                newParams.append("date_start", params.date_start);
            if (params.date_end) newParams.append("date_end", params.date_end);
            if (params.destination)
                newParams.append("destination", params.destination);
            const res = await fetch(
                `http://localhost:3000/api/travel/search?${newParams.toString()}`,
                { cache: "no-store" }
            );
            if (!res.ok) throw new Error("Failed to fetch travel");
            const fetchedTravels = await res.json();
            setTravels(fetchedTravels);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    return (
        <div className="flex flex-col">
            <BackButton href="/" />
            <Search onSearch={fetchSearchTravel} />
            <Table
                travels={travels}
                onDelete={deleteItem}
                onLog={handleDetail}
            />
        </div>
    );
}
