import {NavLink} from "react-router";
import './Header.css'

export default function Header() {

    return(
        <div>
            <h1>Recap-Project: Fullstack Todo App</h1>
            <div className="navBarContainer">
                <nav>
                    <ul>
                        <li><NavLink to="/">Overview</NavLink></li>
                        <li><NavLink to="/add">Add Todo</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}