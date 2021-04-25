import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { GET_USER } from "../queries/users";
import { ApiData } from "../types";
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

    const {user: {photos, display, profile_url}} : {user: ApiData} = data;

    photos.sort((a, b) => b.views - a.views);

    return <>
        <Banner photo={photos[0]}>
            <Profile display={display} profileUrl={profile_url} slug={slug} size="300px" font="40px" color="white"/>
        </Banner>
        <Gallery photos={photos} query={true}/>
    </>
}

export default UserPage;