import {Todo} from "../types/Todo.ts";
import TodoCard from "./TodoCard.tsx";

type Props = {
    todoList: Todo[];
    onAdvanceStatus: (newTodo: Todo) => void;
    onDeleteTodo: (targetId: string) => void;
}

function TodoApp({todoList, onAdvanceStatus, onDeleteTodo}: Props) {

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
    );
}

export default TodoApp
