import { ReactElement, useContext } from "react";
import { UserContext } from "../helpers/UserContext";


const IsMine = ({ownerSlug, children, ignoreAdmin = false}: {ownerSlug: string, children: any, ignoreAdmin?: boolean}): ReactElement => {

    const {state} = useContext(UserContext);

    if ((state.user?.role !== 'admin' || ignoreAdmin) && (ownerSlug != state.user?.slug || !ownerSlug))  {
        return <></>
    }
    return <>
        {children}
    </>
}

export default IsMine;