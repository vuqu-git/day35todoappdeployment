import {Link} from "react-router";
import {JSX} from "react";

const NotFound = (): JSX.Element => {
    return (
        <div>
            <h1>Page not found</h1>
            <Link to={"/"}>Go back to home page</Link>
        </div>
    )
}

export default NotFound;