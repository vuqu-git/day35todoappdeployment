import {Todo} from "../types/Todo.ts";
import TodoCard from "./TodoCard.tsx";

interface DisplayAllTodosProps {
    todoList: Todo[];
    onAdvanceStatus: (newTodo: Todo) => void;
    onDeleteTodo: (targetId: string) => void;
}

// export default function DisplayAllTodos({todoList, handleAdvanceStatus}: {todoList: Todo[], handleAdvanceStatus: (newTodo: Todo) => void}) {
export default function DisplayAllTodos({todoList, onAdvanceStatus, onDeleteTodo}: DisplayAllTodosProps) {
    return (
        <div style={ {
                padding: "1em",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
            }

        }>
            {
                todoList.map( (t: Todo) => <TodoCard
                                                        key={t.id} todoItem={t}
                                                        onAdvanceStatus={onAdvanceStatus}
                                                        onDeleteTodo={onDeleteTodo}/>)
            }
        </div>
    )
}