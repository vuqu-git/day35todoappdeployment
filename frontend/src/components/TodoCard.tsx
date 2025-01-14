import {Todo} from "../types/Todo.ts";
import {ChangeEvent, useState} from "react";
import axios from "axios";

type TodoCardProps = {
    todo:Todo,
    fetchAllTodo: () => void
}
export default function TodoCard(props:Readonly<TodoCardProps>){

    const [description, setDescription] = useState<string>(props.todo.description)

    function changeDescription(event:ChangeEvent<HTMLInputElement>){
        const newDescription = event.target.value
        setDescription(newDescription)
        axios.put("api/todo/"+ props.todo.id,
            {
                id: props.todo.id,
                description: newDescription,
                status: props.todo.status
            })
            .then(props.fetchAllTodo)
    }

    function moveBack(){
         let newStatus = ""
        if (props.todo.status === "IN_PROGRESS"){
            newStatus = "OPEN"
        } else if (props.todo.status === "DONE"){
            newStatus = "IN_PROGRESS"
        }else {
            newStatus = "OPEN"
        }

        axios.put("api/todo/"+ props.todo.id,
            {
                id: props.todo.id,
                description: props.todo.description,
                status: newStatus
            })
            .then(props.fetchAllTodo)

    }

    function moveForward(){
        let newStatus = ""
        if (props.todo.status === "OPEN"){
            newStatus = "IN_PROGRESS"
        } else if (props.todo.status === "IN_PROGRESS"){
            newStatus = "DONE"
        }else {
            newStatus = "DONE"
        }

        axios.put("api/todo/"+ props.todo.id,
            {
                id: props.todo.id,
                description: props.todo.description,
                status: newStatus
            })
            .then(props.fetchAllTodo)

    }

    function deleteTodo(){
        axios.delete("api/todo/"+props.todo.id)
            .then(props.fetchAllTodo)
    }

    return(
        <>
            <input
                value={description}
                onChange={changeDescription}/>
            <p>{props.todo.status}</p>
            <button onClick={moveBack}>Zurück</button>
            <button onClick={deleteTodo}>Delete</button>
            <button onClick={moveForward}>Vor</button>
        </>

    )
}