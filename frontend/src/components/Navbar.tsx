import {NavLink, Outlet} from "react-router";
import './Navbar.css'

const Navbar = () => {

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin;
        window.open(host + '/logout', '_self');
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>

            <h1>Navbar component: Recap-Project: Fullstack Todo App</h1>
            <div className="navBarContainer">
                <nav>
                    <ul>
                        <li><NavLink to="/">Overview</NavLink></li>
                        <li><NavLink to="/add">Add Todo</NavLink></li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;