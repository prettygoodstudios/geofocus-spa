import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { UPDATE_PROFILE } from "../queries/users";
import CenteredLoading from "../widgets/CenteredLoading";
import ProfileForm from "../widgets/ProfileForm";
import { UserData } from "../types";

const UpdateProfilePage: React.FC = () => {

    const {dispatch, state: {user}}: {dispatch: (action: {type: string, payload?: any}) => void, state: {user: UserData}} = useContext(UserContext);
    
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
        <ProfileForm save={ update } data={ {...user as any, cropperData: { ...user, url: user.profile_url } } } submitLabel="Update"/>
    </>
}

export default UpdateProfilePage;