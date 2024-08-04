import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Backend_URL = import.meta.env.VITE_BACKEND_URL;

export const useSignOut = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const signout = async () => {
        setLoading(true);
        try {
            const res = await fetch(Backend_URL +"/api/v1/auth/logout");
            const data = await res.json();
            if(data.success === true) {
                // local storage
                localStorage.removeItem("dp-user");

                // set auth user context
                setAuthUser(null);
                toast.success(data.message);
                navigate("/signin");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signout};
};