import { ReactElement, useContext } from "react"
import { JsxElement } from "typescript";
import { UserContext } from "../helpers/UserContext"


const Authenticated = ({children}: {children?: any}): ReactElement => {
    const {state} = useContext(UserContext);
    
    if (!state.user?.slug) {
        return <></>
    }

    return <>
        {children}
    </>
}

export default Authenticated;