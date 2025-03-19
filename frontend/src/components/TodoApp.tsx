
import {Todo} from "../types/Todo.ts";


import Header from "./Header.tsx";


import DisplayAllTodos from "./DisplayAllTodos.tsx";


type Props = {
    todoList: Todo[];
    handleAdvanceStatus: (newTodo: Todo) => void;
    handleDeleteTodo: (targetId: string) => void;
}

function TodoApp({todoList, handleAdvanceStatus, handleDeleteTodo}: Props) {


    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;
        window.open(host + '/logout', '_self');
    }


    return (
        <>
            <button onClick={logout}>Logout</button>
            <Header />
            <DisplayAllTodos todoList={todoList} onAdvanceStatus={handleAdvanceStatus} onDeleteTodo={handleDeleteTodo} />
        </>
    );

}

export default TodoApp
