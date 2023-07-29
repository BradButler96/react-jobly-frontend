import { useEffect } from "react";
import { Navigate } from "react-router-dom";


const UserLogout = ({ logout }) => {

    useEffect(() => {
        const logUserOut = async () => {
            logout()
        };
        logUserOut()
    }, [])

    return (
        <Navigate to='/Login' />
    )
}

export default UserLogout