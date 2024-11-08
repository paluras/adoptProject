import axios from "axios";
import { t } from "i18next";
import React from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../store/userSlice";
import { handleAxiosError } from "../../utils/handleAxiosError";

const LogOutButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (): Promise<void> => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`)
            dispatch(logout())
        } catch (error) {
            handleAxiosError(error)

        }
    }
    return (
        <li>
            <button onClick={handleSubmit} className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">{t('common.logout')}</button>
        </li>
    )
}

export default LogOutButton