import { useMemo, useReducer } from "react";
import { reducer } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import useUser from "../helpers/userHook";


const UserProvider: React.FC<{}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        loaded: false
    });

    const context = useMemo(() => ({state, dispatch}), [state, dispatch]);
    useUser(dispatch);

    return (
        <UserContext.Provider value={context}>
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;
