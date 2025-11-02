import { BasicForm } from "@/lib/validators/travel";
import { ChangeEvent } from "react";

interface Props {
    basicForm: BasicForm;
    setBasicForm: React.Dispatch<React.SetStateAction<BasicForm>>;
}

export default function CreateBasicForm({ basicForm, setBasicForm }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBasicForm({
            ...basicForm,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className="flex justify-center items-center h-full">
            <div className="flex flex-col gap-10 my-5">
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
            </div>
        </form>
    );
}
