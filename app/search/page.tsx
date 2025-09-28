"use client";

import { UpdateDetailForm } from "@/lib/validators/log";
import { BasicForm, Travel } from "@/lib/validators/travel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Page() {
    const [travels, setTravels] = useState<Travel[]>([]);
    const router = useRouter();
    const [searchCon, setSearchCon] = useState<BasicForm>({
        date_start: "",
        date_end: "",
        destination: "",
    });
    // デバウンス用タイマー
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
        null
    );

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

    const onLog = async (id: number) => {
        router.push(`/log/${id}`);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchCon((prev) => ({ ...prev, [name]: value || "" }));
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer);

        const timer = setTimeout(async () => {
            try {
                const params = new URLSearchParams();
                if (searchCon.date_start)
                    params.append("date_start", searchCon.date_start);
                if (searchCon.date_end)
                    params.append("date_end", searchCon.date_end);
                if (searchCon.destination)
                    params.append("destination", searchCon.destination);
                const res = await fetch(
                    `http://localhost:3000/api/travel/search?${params.toString()}`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("Failed to fetch travel");
                const fetchedTravels = await res.json();
                setTravels(fetchedTravels);
            } catch (error) {
                console.error(error);
                return null;
            }
        }, 500);

        setDebounceTimer(timer);
        // クリーンアップ
        return () => clearTimeout(timer);
    }, [searchCon]);

    return (
        <div className="flex flex-col">
            <div>
                <input
                    type="date"
                    name="date_start"
                    onChange={handleChange}
                    value={searchCon?.date_start}
                />
                <input
                    type="date"
                    name="date_end"
                    onChange={handleChange}
                    value={searchCon?.date_end}
                />
                <input
                    type="text"
                    name="destination"
                    onChange={handleChange}
                    value={searchCon?.destination}
                />
            </div>
            <ul>
                {travels.map((travel) => (
                    <li key={travel.id} className="mb-5">
                        <div className="flex gap-x-10">
                            <button
                                onClick={() => deleteItem(travel.id)}
                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                            >
                                <TrashIcon className="w-7 h-7" />
                            </button>
                            <div>
                                <div>
                                    {travel.date_start} ~ {travel.date_end}
                                </div>
                                <div>{travel.destination}</div>
                            </div>
                            <button
                                onClick={() => onLog(travel.id)}
                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                            >
                                <ChevronRightIcon className="text-bold w-10 h-10" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center">
                <Link
                    href="/"
                    className="px-4 py-2 text-lg rounded-lg border-2 border-solid hover:bg-black hover:text-[#f5f5f5]"
                >
                    BACK
                </Link>
            </div>
        </div>
    );
}
