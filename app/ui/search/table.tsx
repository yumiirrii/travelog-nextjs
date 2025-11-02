import { Travel } from "@/lib/validators/travel";
import { ChevronRightIcon, TrashIcon } from "@heroicons/react/24/solid";

interface Props {
    travels: Travel[];
    onDelete: (id: number) => void;
    onLog: (id: number) => void;
}
export default function Table({ travels, onDelete, onLog }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">TRAVEL DATE</th>
                    <th className="px-3 py-3">DESTINATION</th>
                    <th className="px-3 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {travels.map((travel) => (
                    <tr key={travel.id}>
                        <td className="px-3 py-1">
                            <button
                                onClick={() => onDelete(travel.id)}
                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                            >
                                <TrashIcon className="w-6 h-6" />
                            </button>
                        </td>
                        <td className="px-3 py-1">
                            {travel.date_start} ~ {travel.date_end}
                        </td>
                        <td className="px-3 py-1">{travel.destination}</td>
                        <td className="px-3 py-1">
                            <button
                                onClick={() => onLog(travel.id)}
                                className="!p-1 !m-0 !border-0 !bg-transparent !rounded-none !focus:outline-none"
                            >
                                <ChevronRightIcon className="text-bold w-6 h-6" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
