import {Navigate, Outlet} from "react-router";

type Props = {
    isAuthenticated: boolean
    isLoading: boolean
}
export default function ProtectedRoutes({isAuthenticated, isLoading}: Readonly<Props>){

    if(isLoading){
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/" />
}