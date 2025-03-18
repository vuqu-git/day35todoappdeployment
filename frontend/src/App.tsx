import {useEffect, useState} from 'react'
import {Todo} from "./types/Todo.ts";

import './App.css'
import Header from "./components/Header.tsx";
import axios from "axios";

import DisplayAllTodos from "./components/DisplayAllTodos.tsx";
import {Route, Routes, useNavigate} from "react-router";
import AddToDo from "./components/AddTodo.tsx";

import {StatusType} from "./types/StatusType.ts";
import EditTodo from "./components/EditTodo.tsx";

function App() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    // const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    // state variable to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchTodoList = () => {
        axios.get("/api/todo")
            .then(
                response => {setTodoList(response.data)}
            )
            .catch(
                error => console.error("Error setting up the request:", error.message)
            )
    }

    const checkAuthentication = () => {
        // This function sends a GET request to /api/auth/me.
        //  If the request is successful (returns a 200 status), it means the user is authenticated
        //  If the request fails (e.g., 401 Unauthorized), it means the user is not authenticated
        axios.get("/api/auth/me")
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    };

    useEffect(() => {
        // calls checkAuthentication when the component mounts. This ensures that the authentication status is checked when the app loads.
        checkAuthentication(); // Check authentication on mount
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTodoList();
        } else {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

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

    // this method initiates an OAuth2 authorization flow with GitHub
    function login() {
        // window.location.host: This retrieves the hostname and port of the current browser window (e.g., localhost:5173).
        // window.location.host === 'localhost:5173': This checks if the current hostname and port are localhost:5173, which is typically the development server for a React application running with Vite.
        // 'http://localhost:8080': If the condition is true (i.e., you're running in development), this sets the host variable to http://localhost:8080, assuming your Spring Boot backend is running on port 8080.
        // window.location.origin: If the condition is false (i.e., you're not running in development, likely in a production environment), this sets the host variable to the origin of the current page (e.g., https://your-production-domain.com). This is crucial for production deployments where the frontend and backend might be on the same domain.
        // In summary, this line dynamically determines base URL of your backend server (= the backend URL) based on whether the frontend is running in development or production.
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;

        // This line opens a new browser window or tab (or replaces the current one) to initiate the OAuth2 authorization flow.
        //     host + '/oauth2/authorization/github': This constructs the URL for the GitHub OAuth2 authorization endpoint on your backend server. The /oauth2/authorization/github path is typically configured by Spring Security's OAuth2 client support.
        //     window.open(...): This JavaScript function opens a new browser window or tab.
        //     '_self': This argument specifies that the URL should be opened in the same browser window or tab, effectively redirecting the user.
        window.open(host + '/oauth2/authorization/github', '_self');
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


    // if (todoList) {
    //     return  (
    //         <>
    //             <button onClick={login}>Login with GitHub</button>
    //             <p>Please login to access the Todos!</p>
    //         </>
    //     )
    // }

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <Header />
                        <Routes>
                            <Route path="/" element={<DisplayAllTodos todoList={todoList} onAdvanceStatus={handleAdvanceStatus} onDeleteTodo={handleDeleteTodo} />} />
                            <Route path="/add" element={<AddToDo onAddTodo={handleAddTodo} />} />
                            <Route path="/:id" element={<EditTodo todoList={todoList} handleUpdateTodo={handleUpdateTodo} />} />
                        </Routes>
                    </>
                ) : (
                    <div className="login-container">
                        <h1>Please Login to the Todo app</h1>
                        <button onClick={login}>Login with GitHub</button>
                    </div>
                )
            }
        </>
    );

}

export default App
