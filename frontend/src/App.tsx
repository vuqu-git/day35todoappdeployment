import {useEffect, useState} from 'react'

import './App.css'
import axios from "axios";
import {Route, Routes} from "react-router";

import Login from "./components/Login.tsx";
import TodoApp from "./components/TodoApp.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import AddToDo from "./components/AddTodo.tsx";
import EditTodo from "./components/EditTodo.tsx";
import {Todo} from "./types/Todo.ts";
import {StatusType} from "./types/StatusType.ts";
import ProtectedRoutesForLogin from "./components/ProtectedRoutesForLogin.tsx";
import Navbar from "./components/Navbar.tsx";
import NotFound from "./components/notFound.tsx";

function App() {

    // state variable to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state
    const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading status

    const [todoList, setTodoList] = useState<Todo[]>([]);

    const fetchTodoList = () => {
        axios.get("/api/todo")
            .then(
                response => {setTodoList(response.data)}
            )
            .catch(
                error => console.error("Error fetching todo list:", error.message)
            )
    }

    // ##################################################################################################

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

    // ##################################################################################################

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                console.log("user name: " + response.data);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(e => {
                console.error("Error authenticating the user:", e.message);
                setIsLoading(false); // Set loading to false even if there’s an error
            });
    }

    useEffect( () => {
            loadUser();
            fetchTodoList()
        }
        , []);

    return (
        <Routes>
            {/*<Route path="/" element={<Login/>}/>*/}
            {/*<Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} isLoading={isLoading}/>}>*/}
            {/*    <Route path="/todos" element={<TodoApp todoList={todoList} handleAdvanceStatus={handleAdvanceStatus} handleDeleteTodo={handleDeleteTodo}/>}/>*/}
            {/*    <Route path="/add" element={<AddToDo onAddTodo={handleAddTodo} />} />*/}
            {/*    <Route path="/:id" element={<EditTodo todoList={todoList} handleUpdateTodo={handleUpdateTodo} />} />*/}
            {/*</Route>*/}

            <Route element={<ProtectedRoutesForLogin isAuthenticated={isAuthenticated} isLoading={isLoading}/>}>
                <Route path="/login" element={<Login/>}/>
            </Route>


            <Route path="/" element={<Navbar />}>
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} isLoading={isLoading}/>}>
                    <Route path="/" element={<TodoApp todoList={todoList} onAdvanceStatus={handleAdvanceStatus} onDeleteTodo={handleDeleteTodo}/>}/>
                    <Route path="/add" element={<AddToDo onAddTodo={handleAddTodo} />} />
                    <Route path="/edit/:id" element={<EditTodo todoList={todoList} handleUpdateTodo={handleUpdateTodo} />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App
