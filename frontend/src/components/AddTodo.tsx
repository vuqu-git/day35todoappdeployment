import {ChangeEvent, FormEvent, useState} from "react";
import "./AddTodo.css"
import {useNavigate} from "react-router";
import {StatusType} from "../types/StatusType.ts";

export default function AddToDo({onAddTodo}: {onAddTodo: (newTodo: {description: string, status: StatusType}) => void}) {

    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<StatusType>("OPEN");

    const handleChangeDesc = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleChangeStat = (event: ChangeEvent<HTMLSelectElement>)=> {
        // setStatus(event.target.value as "OPEN" | "IN_PROGRESS" | "DONE");
        setStatus(event.target.value as StatusType);
    }

    const navigate = useNavigate();
    const onSaveTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddTodo({description, status});
        navigate("/");
    };


    return (
        <>
            <form className="myForm" onSubmit={onSaveTodo}>
                <label>
                    Description:
                    <input type="text" value={description} onChange={handleChangeDesc}/>
                </label>
                <label>
                    Status:
                    <select value={status} onChange={handleChangeStat}>
                        <option value="OPEN">open</option>
                        <option value="IN_PROGRESS">in progress</option>
                        <option value="DONE">done</option>
                    </select>
                </label>

                <button type="submit">Save</button>
            </form>
        </>
    )
}