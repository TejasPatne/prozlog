import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Backend_URL = import.meta.env.VITE_REACT_BACKEND_URL;

export const useGetProfile = () => {
    const [profile, setProfile] = useState(null);
    const { id } = useParams();

    const getProfile = async () => {

        try {
            const res = await fetch(Backend_URL + `/api/v1/users/${id}`);
            const data = await res.json();

            if(data.success === true){
                setProfile({
                    ...profile,
                    userName: data.user.userName,
                    fullName: data.user.fullName,
                    email: data.user.email,
                    avatar: data.user.avatar
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProfile();
    }, [id]);

    return { profile };
}