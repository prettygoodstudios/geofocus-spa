import { useQuery } from "@apollo/client";
import { ME } from "../queries/users";
import { SET_USER } from "./Reducer";


const useUser = (dispatch: (action: any) => void) => {
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
