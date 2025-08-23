"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
    BasicForm,
    BasicFormSchema,
    Travel,
    TravelSchema,
} from "@/lib/validators/travel";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    // クエリパラメータ
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    const [basicForm, setBasicForm] = useState<BasicForm>({
        date_start: new Date().toISOString().split("T")[0],
        date_end: new Date().toISOString().split("T")[0],
        destination: "",
    });

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

    useEffect(() => {
        if (id) {
            const loadTravel = async () => {
                const travel = await fetchTravel(id);
                if (travel) {
                    setBasicForm({
                        date_start: travel.date_start,
                        date_end: travel.date_end,
                        destination: travel.destination,
                    });
                }
            };
            loadTravel();
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBasicForm({
            ...basicForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // update
        if (id) {
            const dataToValidate = { id, ...basicForm };
            const parsedForm = TravelSchema.safeParse(dataToValidate);
            if (parsedForm.success) {
                console.log(parsedForm.data);
                try {
                    const res = await fetch("/api/travel", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(parsedForm.data),
                    });
                    if (!res.ok) throw new Error("Failed to update Travel");
                    router.push(`/log/${id}?from=create`);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error(parsedForm.error);
            }
        } else {
            const parsedForm = BasicFormSchema.safeParse(basicForm);
            if (parsedForm.success) {
                try {
                    const res = await fetch("/api/travel", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(parsedForm.data),
                    });
                    if (!res.ok) throw new Error("Failed to insert Travel");
                    const data = await res.json();
                    console.log(data);
                    router.push(`/log/${data.id}?from=create`);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error(parsedForm.error);
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
        } catch (error) {
            console.error(error);
        }
    };

    const onBack = () => {
        if (id) {
            deleteTravel(id);
        }
        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-10">
                <div>
                    <label>TRAVEL DATE</label>
                    <div className="mt-3">
                        <input
                            type="date"
                            name="date_start"
                            value={basicForm.date_start}
                            onChange={handleChange}
                        ></input>
                        ~
                        <input
                            type="date"
                            name="date_end"
                            value={basicForm.date_end}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div>
                    <label>DESTINATION</label>
                    <div className="mt-3">
                        <input
                            type="text"
                            name="destination"
                            value={basicForm.destination}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        type="button"
                        onClick={onBack}
                        className="hover:bg-black hover:text-[#f5f5f5]"
                    >
                        BACK
                    </button>
                    <button
                        type="submit"
                        className="bg-black text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-black"
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </form>
    );
}
