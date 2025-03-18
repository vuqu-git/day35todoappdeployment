import {useEffect, useState} from 'react'
import {Todo} from "./types/Todo.ts";

import './App.css'
import Header from "./components/Header.tsx";
import axios from "axios";

import DisplayAllTodos from "./components/DisplayAllTodos.tsx";
import {Route, Routes} from "react-router";
import AddToDo from "./components/AddTodo.tsx";

import {StatusType} from "./types/StatusType.ts";
import EditTodo from "./components/EditTodo.tsx";

function App() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    // const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const fetchTodoList = () => {
        axios.get("/api/todo")
            .then(
                response => {setTodoList(response.data)}
            )
            .catch(
                error => console.error("Error setting up the request:", error.message)
            )
    }

    useEffect(
        () => {
            fetchTodoList();
        }
    , [])

    // add function to pass on as callback
    const handleAddTodo = (newTodo: {description: string, status: StatusType}) => {

        axios.post("/api/todo", newTodo)
            .then(
                //this one ist the short version, otherwise use an arrow function with response parameter:
                fetchTodoList
                // response => {
                //     // Handle successful response (status code 200-299)
                //     if (response.status >= 200 && response.status < 300) {
                //         // Process the response data
                //         console.log('POST request successful:', response.data);
                //
                //         // Pessimistic Update:
                //         //     Wait for the POST request to complete successfully.
                //         //     Then, fetch the updated data from the API (using another GET request) or add the new item received from the post response to the current state.
                //         fetchTodoList();
                //
                //     } else {
                //         console.error('POST request failed with status:', response.status);
                //         console.error('Response data:', response.data); // Log response data
                //     }
                // }
            )
            .catch(
                error => console.error("Error setting up the request:", error.message)
            )
    }

    // update status function to pass in as callback
    const handleAdvanceStatus = (newTodo: Todo): void => {
        const targetStatus: StatusType = newTodo.status === "OPEN" ? "IN_PROGRESS" : "DONE";

        const updatedTodo: Todo = {...newTodo, status: targetStatus};

        axios.put("/api/todo/" + newTodo.id, updatedTodo)
            .then(
                response => {
                    // Handle successful response (status code 200-299)
                    if (response.status >= 200 && response.status < 300) {
                        // Process the response data
                        console.log('PUT request successful:', response.data);

                        // Pessimistic Update:
                        //     Wait for the POST request to complete successfully.
                        //     Then, fetch the updated data from the API (using another GET request) or add the new item received from the post response to the current state.
                        fetchTodoList();

                    } else {
                        console.error('PUT request failed with status:', response.status);
                        console.error('Response data:', response.data); // Log response data
                    }
                }
            )
            .catch(
                error => console.error("Error setting up the request:", error.message)
            )
    }

    // delete function to pass as callback
    const handleDeleteTodo = (targetId: string): void => {

        axios.delete("/api/todo/" + targetId)
            .then(
                response => {
                    // Handle successful response (status code 200-299)
                    if (response.status >= 200 && response.status < 300) {
                        // Process the response data
                        console.log('DELETE request successful:', response.data);

                        // Pessimistic Update:
                        //     Wait for the POST request to complete successfully.
                        //     Then, fetch the updated data from the API (using another GET request) or add the new item received from the post response to the current state.
                        fetchTodoList();

                    } else {
                        console.error('DELETE request failed with status:', response.status);
                        console.error('Response data:', response.data); // Log response data
                    }
                }
            )
            .catch(
                error => console.error("Error setting up the request:", error.message)
            )
    }

    // update function to pass as callback
    const handleUpdateTodo = (updatedTodo: Todo): void => {

        axios.put("/api/todo/" + updatedTodo.id, updatedTodo)
            .then(
                response => {
                    // Handle successful response (status code 200-299)
                    if (response.status >= 200 && response.status < 300) {
                        // Process the response data
                        console.log('PUT request successful:', response.data);

                        // Pessimistic Update:
                        //     Wait for the POST request to complete successfully.
                        //     Then, fetch the updated data from the API (using another GET request) or add the new item received from the post response to the current state.
                        fetchTodoList();

                    } else {
                        console.error('PUT request failed with status:', response.status);
                        console.error('Response data:', response.data); // Log response data
                    }
                }
            )
            .catch(
                error => console.error("Error setting up the request:", error.message)
            )
        // setEditingTodo(null);
    }

    // const handleEdit = (editingTodo: Todo) => {
    //     setEditingTodo(editingTodo);
    // };

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

        window.open(host + '/oauth2/authorization/github', '_self')
    }

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                console.log(response.data)
            })
    }

    useEffect(() => {
        loadUser();
    }, []);


    if (todoList) {
        return  (
            <>
                <button onClick={login}>Login with GitHub</button>
                <p>Please login to access the Todos!</p>
            </>
        )
    }

  return (
    <>
        <Header />
        <Routes>
            <Route path={"/"} element={
                <DisplayAllTodos
                    todoList={todoList}
                    onAdvanceStatus={handleAdvanceStatus}
                    onDeleteTodo={handleDeleteTodo}
                />
            } />

            <Route path={"/add"} element={
                <AddToDo onAddTodo={handleAddTodo} />
            } />

            <Route path={"/:id"} element={
                <EditTodo todoList={todoList} handleUpdateTodo={handleUpdateTodo} />
            } />

        </Routes>


    </>
  )

}

export default App
