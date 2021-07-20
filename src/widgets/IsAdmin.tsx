import { ReactElement, useContext } from "react";
import { UserContext } from "../helpers/UserContext";


const IsAdmin = ({children}: {children: any}): ReactElement => {

    const {state} = useContext(UserContext);

    if (state.user?.role !== 'admin')  {
        return <></>
    }
    return <>
        {children}
    </>
}

export default IsAdmin;