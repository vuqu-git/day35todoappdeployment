import {Todo} from "../types/Todo.ts";
import TodoCard from "../components/TodoCard.tsx";


type TodoGalleryProps ={
    todos: Todo[]
    fetchAllTodo: () => void
    status: string
}

export default function TodoGallery(props:Readonly<TodoGalleryProps>){



    return(
        <>
            <h1>{props.status}</h1>
            {props.todos.map(todo =>
            <TodoCard todo={todo} fetchAllTodo={props.fetchAllTodo} key={todo.id}/>)}
        </>
    )
}