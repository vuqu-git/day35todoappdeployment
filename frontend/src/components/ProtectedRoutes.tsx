import {Link, Navigate, Outlet} from "react-router";

type Props = {
    isAuthenticated: boolean
}
export default function ProtectedRoutes({isAuthenticated}: Readonly<Props>){

    if(!isAuthenticated){
        return <Link to={"/login"}>Please login</Link>
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/" />
}