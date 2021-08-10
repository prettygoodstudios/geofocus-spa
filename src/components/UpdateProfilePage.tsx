import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { UPDATE_PROFILE } from "../queries/users";
import CenteredLoading from "../widgets/CenteredLoading";
import ProfileForm from "../widgets/ProfileForm";

const UpdateProfilePage: React.FC = () => {

    const {dispatch, state: {user}} = useContext(UserContext);
    
    const [update] = useMutation(UPDATE_PROFILE, {
        onCompleted: (data) => {
            dispatch({
                type: SET_USER,
                payload: data.editProfile
            }); 
        }
    });

    if (!user) {
        return <CenteredLoading/>;
    }

    return <>
        <h1>Update Profile</h1>
        <ProfileForm save={ update } data={ user } submitLabel="Update"/>
    </>
}

export default UpdateProfilePage;