import {Todo} from "../types/Todo.ts";
import {StatusType} from "../types/StatusType.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router";

interface EditToDoProps {
    todoList: Todo[];
    handleUpdateTodo: (updatedTodo: Todo) => void;
}

export default function EditTodo( {todoList, handleUpdateTodo}: EditToDoProps) {

    const { id } = useParams<{ id: string }>();

    const editingTodo: Todo | undefined = todoList.find((t) => t.id === id);

    const navigate = useNavigate();

    // !!!!!!!!!!!!!!!!!!!!!!!!!
    // Don't do this here before useState because it causes the useState in line 34 and 35 to be called conditionally
    // issue is handling the case where editingTodo is undefined
    // if (!editingTodo) {
    //     navigate('/');
    //     return null
    // }
    // !!!!!!!!!!!!!!!!!!!!!!!!!

    // also here (in the start values of useState): handling the issue that editingTodo could be undefined
    // even though I've handled the undefined case above by navigating to the main pag (see above)
    // because TypeScript's type checker doesn't "remember"
    // const [description, setDescription] = useState<string>(editingTodo ? editingTodo.description : "");
    // const [status, setStatus] = useState<StatusType>(editingTodo ? editingTodo.status : "OPEN");
    // more concise:
    const [description, setDescription] = useState<string>(editingTodo?.description || "");
    const [status, setStatus] = useState<StatusType>(editingTodo?.status || "OPEN");

    if (!editingTodo) {
        navigate('/');
        return null
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

        // only with this an error would be displayed: complaining about types of property id is incompatible
        //      because TypeScript is likely inferring that editingTodo might be undefined within the onUpdateTodo function,
        //      even though I've handled the undefined case above by navigating to the main page.
        //      However, TypeScript's type checker doesn't "remember" this narrowing when onUpdateTodo is called later.
        //      Spread Operator: The spread operator (...editingTodo) in handleUpdateTodo relies on editingTodo being a Todo object.
        // handleUpdateTodo({ ...editingTodo, description, status});
        // navigate("/");

        // hence again!: handling the case where editingTodo is undefined
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