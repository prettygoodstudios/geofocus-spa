import { useMutation } from "@apollo/client";
import { ReactElement, useContext } from "react";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { REGISTER } from "../queries/users";
import ProfileForm from "../widgets/ProfileForm";

const RegistrationPage = () : ReactElement => {

    const context = useContext(UserContext);
    const [register] = useMutation(REGISTER, {
        onCompleted: (data) => {
            context.dispatch({
                type: SET_USER,
                payload: data.register
            });
        }
    });

    return <>
        <h1>Register</h1>
        <ProfileForm save={ register } />
    </>
}

export default RegistrationPage;