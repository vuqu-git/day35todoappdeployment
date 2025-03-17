import {Todo} from "../types/Todo.ts";
import './TodoCard.css'
import {useNavigate} from "react-router";

interface TodoCardProps {
    todoItem: Todo;
    onAdvanceStatus: (newTodo: Todo) => void;
    onDeleteTodo: (targetId: string) => void;
}

export default function TodoCard( {todoItem, onAdvanceStatus, onDeleteTodo}: TodoCardProps) {

    let noteColor: string;
    switch (todoItem.status) {
        case "OPEN": noteColor = "orange"; break;
        case "IN_PROGRESS": noteColor = "yellow"; break;
        case "DONE": noteColor = "green"; break;
    }

    const handleAdvanceStatus = () => {
        onAdvanceStatus(todoItem);
    }

    const handleDeleteTodo = () => {
        onDeleteTodo(todoItem.id);
    }

    const navigate = useNavigate();
    // new for re-routing
    const handleEdit = () => {
        navigate(`/${todoItem.id}`); // Navigate to /edit/todoId, here string literal is used
    };

return (

        <div className="card-big-shadow">
            <div className="card card-just-text" data-background="color" data-color={noteColor} data-radius="none">
                <div className="content">
                    <h6 className="category">{todoItem.status}</h6>
                    {/*<h4 className="title"><a href="#">To do {todoItem.id}</a></h4>*/}
                    {/*<p className="title"><a href="#">To do: {todoItem.id}</a></p>*/}
                    <p className="description">{todoItem.description}</p>
                    {   todoItem.status !== "DONE"
                            ? <button onClick={handleAdvanceStatus}>advance</button>
                            : ""
                    }
                    <div>
                    <button onClick={handleDeleteTodo}>delete</button>
                    <button onClick={handleEdit}>edit</button>
                    </div>
                </div>
            </div>
        </div>


)
}