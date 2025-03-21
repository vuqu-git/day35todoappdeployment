import {Todo} from "../types/Todo.ts";
import {StatusType} from "../types/StatusType.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";

interface EditToDoProps {
    todoList: Todo[];
    handleUpdateTodo: (updatedTodo: Todo) => void;
}

export default function EditTodo( {todoList, handleUpdateTodo}: EditToDoProps) {

    const { id } = useParams<{ id: string }>();
    const editingTodo: Todo | undefined = todoList.find((t) => t.id === id);

    const navigate = useNavigate();

    // also here (in the start values of useState): handling the issue that editingTodo could be undefined
    // even though I've handled the undefined case above by navigating to the main pag (see above)
    // because TypeScript's type checker doesn't "remember"
    // const [description, setDescription] = useState<string>(editingTodo ? editingTodo.description : "");
    // const [status, setStatus] = useState<StatusType>(editingTodo ? editingTodo.status : "OPEN");
    // more concise:
    const [description, setDescription] = useState<string>(editingTodo?.description || "");
    const [status, setStatus] = useState<StatusType>(editingTodo?.status || "OPEN");

    console.log("editingTodo: " + editingTodo?.description);

    useEffect(() => {
        if (!editingTodo) {
            navigate("/");
        }
    }, [editingTodo, navigate]);

    if (!editingTodo) {
        return null; // This prevents the rest of the form from rendering
    }

    const handleChangeDesc = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleChangeStat = (event: ChangeEvent<HTMLSelectElement>)=> {
        // setStatus(event.target.value as "OPEN" | "IN_PROGRESS" | "DONE");
        setStatus(event.target.value as StatusType);
    }

    const onUpdateTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // hence again!: handling the case where editingTodo is undefined
        //      Spread Operator: The spread operator (...editingTodo) in handleUpdateTodo relies on editingTodo being a Todo object.
        //      error would be displayed: complaining about types of property id is incompatible
        //      maybe this additional handling is not required
        if (editingTodo) {
            handleUpdateTodo({ ...editingTodo, description, status});
            navigate("/");
        } else {
            console.error("editingTodo is invalid");
            navigate("/");
        }
    };

    return (
            <form className="myForm" onSubmit={onUpdateTodo}>
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

                <button type="submit">Update</button>
            </form>
    )
}