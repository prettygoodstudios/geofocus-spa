import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { ME } from "../queries/users";
import { SET_USER } from "./Reducer";
import { UserContext } from "./UserContext";


const useUser = () => {
    const { dispatch } = useContext(UserContext);


    const { data } = useQuery(ME, {
        onCompleted: () => {
            dispatch({
                type: SET_USER,
                payload: data.me
            })
        },
        fetchPolicy: "network-only"
    });
}

export default useUser;
