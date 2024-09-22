import {  useQuery } from "@tanstack/react-query";
import axios from "axios";


const useUsers = () => {

    const {data , refetch , isLoading , error} = useQuery({
        queryKey : ["users"],
        queryFn : async () => {

            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
            return res.data

        }
        
    })
    


    return { data, refetch, isLoading, error };
};

export default useUsers;