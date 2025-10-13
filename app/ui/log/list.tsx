import { UpdateDetailForm } from "@/lib/validators/log";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Button from "../common/button";

interface Props {
    logs: UpdateDetailForm[];
    dateList: string[];
    onDetail: (date: string, log: UpdateDetailForm | null) => void;
    onDelete: (id: number) => void;
}

export default function LogList({ logs, dateList, onDetail, onDelete }: Props) {
    const category: { [key: number]: string } = {
        1: "SIGHTSEEING",
        2: "MEAL",
        3: "ACCOMMODATION",
        4: "ENTERTAINMENT",
        5: "SHOPPING",
        6: "OTHER",
    };

    const convertCategory = (key: number) => category[key] || "UNKNOWN";

    return (
        <div>
            <ul>
                {dateList.map((date) => (
                    <li key={date} className="flex flex-col">
                        <div className="flex items-center">
                            <div className="w-1/2">{date}</div>
                            <Button
                                label="ADD"
                                onClick={() => onDetail(date, null)}
                                style="w-auto"
                            />
                        </div>
                        <div className="text-[18px]">
                            {logs
                                .filter((log) => log.date === date)
                                .map((log) => (
                                    <div key={log.id} className="mb-5">
                                        <div>
                                            <p>
                                                {convertCategory(log.category)}
                                            </p>
                                            <p>{log.spot}</p>
                                            <p>{log.note}</p>
                                            <p>{log.expense}</p>
                                        </div>
                                        <button
                                            onClick={() => onDetail(date, log)}
                                            className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                                        >
                                            <PencilSquareIcon className="w-7 h-7 mr-3" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(log.id)}
                                            className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                                        >
                                            <TrashIcon className="w-7 h-7" />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
