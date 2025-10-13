import { CreateDetailForm, UpdateDetailForm } from "@/lib/validators/log";
import { ChangeEvent, useState } from "react";

type Props = {
    log: UpdateDetailForm | null;
    travel_id: number;
    date: string;
    onClose: (
        detailForm: CreateDetailForm | UpdateDetailForm | null,
        isEdit: boolean
    ) => void;
};

export default function DetailForm({ log, travel_id, date, onClose }: Props) {
    const isEdit: boolean = !!log; //log ? true : falseと同義;
    const [detailForm, setDetailForm] = useState<
        CreateDetailForm | UpdateDetailForm
    >(() =>
        isEdit && log
            ? {
                  id: Number(log.id),
                  date: log.date,
                  category: log.category,
                  spot: log.spot,
                  note: log.note,
                  expense: log.expense,
                  travel_id: Number(log.travel_id),
              }
            : {
                  date,
                  category: 1,
                  spot: "",
                  note: "",
                  expense: "",
                  travel_id,
              }
    );

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setDetailForm((prev) => ({
            ...prev,
            [name]: type === "radio" ? Number(value) : value,
        }));
    };

    return (
        <>
            {/* overlay */}
            <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
            {/* modal content */}
            <div className="fixed inset-0 flex justify-center items-center z-50 text-[24px]">
                <div className="w-4/5 max-w-4xl max-h-[90vh] bg-white p-8 flex flex-col gap-5 overflow-y-auto">
                    <div>DATE : {detailForm.date}</div>
                    <div>
                        <div className="flex flex-wrap gap-x-8 text-[20px]">
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="1"
                                    checked={detailForm.category === 1}
                                    onChange={handleChange}
                                />
                                <label>SIGHTSEEING</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="2"
                                    checked={detailForm.category === 2}
                                    onChange={handleChange}
                                />
                                <label>MEAL</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="3"
                                    checked={detailForm.category === 3}
                                    onChange={handleChange}
                                />
                                <label>ACCOMMODATION</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="4"
                                    checked={detailForm.category === 4}
                                    onChange={handleChange}
                                />
                                <label>ENTERTAINMENT</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="5"
                                    checked={detailForm.category === 5}
                                    onChange={handleChange}
                                />
                                <label>SHOPPING</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="6"
                                    checked={detailForm.category === 6}
                                    onChange={handleChange}
                                />
                                <label>OTHER</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mr-11 text-[20px]">SPOT : </label>
                        <input
                            type="text"
                            name="spot"
                            value={detailForm.spot}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex items-start">
                        <label className="mr-12 text-[20px]">NOTE : </label>
                        <textarea
                            name="note"
                            value={detailForm.note}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label className="mr-2 text-[20px]">EXPENSE : </label>
                        <input
                            type="text"
                            name="expense"
                            value={detailForm.expense}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="hover:bg-black hover:text-[#f5f5f5]"
                            onClick={() => onClose(null, isEdit)}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-black"
                            onClick={() => {
                                if (isEdit && log) {
                                    onClose(
                                        {
                                            ...(detailForm as UpdateDetailForm),
                                            id: Number(log.id),
                                        },
                                        true
                                    );
                                } else {
                                    onClose(detailForm, false);
                                }
                            }}
                        >
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
