"use client";

import { BasicForm } from "@/lib/validators/travel";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
    onSearch,
}: {
    onSearch: (params: BasicForm) => void;
}) {
    const [searchCon, setSearchCon] = useState<BasicForm>({
        date_start: "",
        date_end: "",
        destination: "",
    });

    const debouncedSearch = useDebouncedCallback(async (params: BasicForm) => {
        onSearch(params);
    }, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updated = { ...searchCon, [name]: value || "" };
        setSearchCon(updated);

        debouncedSearch(updated);
    };

    return (
        <div className="my-5">
            <div className="flex space-x-7">
                <div>
                    <label className="mr-2">DATE:</label>
                    <input
                        type="date"
                        name="date_start"
                        onChange={handleSearch}
                        value={searchCon?.date_start}
                    />
                    ~
                    <input
                        type="date"
                        name="date_end"
                        onChange={handleSearch}
                        value={searchCon?.date_end}
                    />
                </div>
                <div>
                    <label className="mr-2">DESTINATION:</label>
                    <input
                        type="text"
                        name="destination"
                        onChange={handleSearch}
                        value={searchCon?.destination}
                    />
                </div>
            </div>
        </div>
    );
}
