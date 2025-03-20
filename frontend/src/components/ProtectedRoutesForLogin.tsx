// This ProtectedRoutesForLogin is the same as ProtectedRoutes except for the toggled ternary in line XX
// It ensures that if a already logged in user visits /login, the user will be redirected to the root page /

import {Navigate, Outlet} from "react-router";

type Props = {
    isAuthenticated: boolean
    isLoading: boolean
}
export default function ProtectedRoutesForLogin({isAuthenticated, isLoading}: Readonly<Props>){

    if(isLoading){
        return <div>Loading...</div>;
    }

    return !isAuthenticated ? <Outlet/> : <Navigate to="/" />
}