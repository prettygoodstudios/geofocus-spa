import { ReactElement, useContext } from "react";
import { UserContext } from "../helpers/UserContext";


const IsMine = ({ownerSlug, children}: {ownerSlug: string, children: any}): ReactElement => {

    const {state} = useContext(UserContext);

    if (ownerSlug != state.user?.slug || !ownerSlug)  {
        return <></>
    }
    return <>
        {children}
    </>
}

export default IsMine;