import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const LogOutButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`)
            dispatch(logout())
            console.log("succesfuly logged out")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <li>
            <button onClick={handleSubmit} className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">Logout</button>
        </li>
    )
}

export default LogOutButton