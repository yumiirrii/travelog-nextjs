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
    // const [expenseTotal, setExpenseTotal] = useState<string>("");
    const category: { [key: number]: string } = {
        1: "SIGHTSEEING",
        2: "MEAL",
        3: "ACCOMMODATION",
        4: "ENTERTAINMENT",
        5: "SHOPPING",
        6: "OTHER",
    };

    const calcDailyTotalExpense = (date: string) => {
        const total = logs
            .filter((log) => log.date === date && log.expense)
            .reduce((sum, log) => sum + Number(log.expense), 0);
        return total > 0 ? total.toLocaleString() : "";
    };

    const convertCategory = (key: number) => category[key] || "UNKNOWN";

    return (
        <div>
            <ul>
                {dateList.map((date) => (
                    <li key={date} className="flex flex-col gap-y-5">
                        <div>
                            <div className="flex items-center">
                                <span>{date}</span>
                                <Button
                                    label="ADD"
                                    onClick={() => onDetail(date, null)}
                                    style="ml-5"
                                />
                            </div>
                            <div>{calcDailyTotalExpense(date)}</div>
                        </div>
                        <div>
                            {logs
                                .filter((log) => log.date === date)
                                .map((log) => (
                                    <div
                                        key={log.id}
                                        className="mb-5 ml-5 text-base font-normal"
                                    >
                                        <div>
                                            <p>
                                                {convertCategory(log.category)}
                                            </p>
                                            <p>{log.spot}</p>
                                            <p>{log.note}</p>
                                            <p>
                                                {Number(
                                                    log.expense
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <button
                                                onClick={() =>
                                                    onDetail(date, log)
                                                }
                                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                                            >
                                                <PencilSquareIcon className="w-6 h-6 mr-3" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(log.id)}
                                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                                            >
                                                <TrashIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
