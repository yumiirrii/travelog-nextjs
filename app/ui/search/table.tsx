import { Travel } from "@/lib/validators/travel";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/solid";

interface Props {
    travels: Travel[];
    onDelete: (id: number) => void;
    onLog: (id: number) => void;
}
export default function Table({ travels, onDelete, onLog }: Props) {
    return (
        <div className="my-5">
            <ul>
                {travels.map((travel) => (
                    <li key={travel.id} className="mb-5">
                        <div className="flex gap-x-10">
                            <button
                                onClick={() => onDelete(travel.id)}
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
        </div>
    );
}
