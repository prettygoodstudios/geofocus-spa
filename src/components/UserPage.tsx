import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { GET_USER } from "../queries/users";
import { UserData } from "../types";
import Banner from "../widgets/Banner";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import Loading from "../widgets/Loading";

import Profile from "../widgets/Profile";


const UserPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data} = useQuery(GET_USER(slug));

    if (error){
        return <Error/>
    }

    if (loading){
        return <Loading/>
    }

    const {user: {photos, display, profile_url}} = data;

    const mappedPhotos = photos.map((p: UserData) => ({
        ...p,
        user: {
            display,
            profile_url: profile_url,
            slug
        }
    }))

    return <>
        <Banner photo={mappedPhotos[0]}>
            <Profile display={display} profileUrl={profile_url} slug={slug} size="300px" font="40px"/>
        </Banner>
        <Gallery photos={mappedPhotos}/>
    </>
}

export default UserPage;