import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { GET_USER } from "../queries/users";
import Error from "../widgets/Error";
import Loading from "../widgets/Loading";

import Profile from "../widgets/Profile";


const UserPage = (slug: string) : ReactElement => {
    const {error, loading, data} = useQuery(GET_USER(slug));

    if (error){
        return <Error/>
    }

    if (loading){
        return <Loading/>
    }

    const {user : {photos, display, profile_url}} = data;

    return <>
        <Profile display={display} profileUrl={profile_url} size="300px" font="40px"/>
        
    </>
}

export default UserPage;