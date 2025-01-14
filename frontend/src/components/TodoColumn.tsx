import {Todo} from "../types/Todo.ts";
import TodoGallery from "../pages/TodoGallery.tsx";
import {FormEvent, useState} from "react";
import axios from "axios";

type TodoColumnProps ={
    todos: Todo[]
    fetchAllTodo: () => void
}

export default function TodoColumn(props:Readonly<TodoColumnProps>){

    const allStatus = ["OPEN", "IN_PROGRESS", "DONE"]
    const [description, setDescription] = useState<string>("")

    function saveNewTodo(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.post("/api/todo",
            {
                description: description,
                status: "OPEN"
            })
            .then(props.fetchAllTodo)

        setDescription("")
    }

    return(
        <>
            <form onSubmit={saveNewTodo}>
                <label> Add your Todo:
                    <input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
                <button>Submit!</button>
            </form>
            {allStatus.map(status => {
                const filteredList = props.todos.filter(todo => todo.status === status)
                return <TodoGallery todos={filteredList} fetchAllTodo={props.fetchAllTodo} status={status}/>
            })
            }
        </>
    )
}