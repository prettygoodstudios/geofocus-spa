import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { GET_USER } from "../queries/users";
import { ApiData } from "../types";
import Banner from "../widgets/Banner";
import CenteredLoading from "../widgets/CenteredLoading";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";

import Profile from "../widgets/Profile";



const UserPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data, refetch} = useQuery(GET_USER(slug), {
        fetchPolicy: "network-only"
    });

    if (error){
        return <Error/>
    }

    if (loading){
        return <CenteredLoading/>
    }

    const {user: {photos, display, profile_url, width, height, zoom, offsetX, offsetY}} : {user: ApiData} = data;

    const processedPhotos = photos ?  [...photos] : [];
    const photo = photos ? processedPhotos[0] : null; 

    processedPhotos.sort((a, b) => b.views - a.views);

    return <>
        <Banner photo={photo}>
            <Profile display={display} profileUrl={profile_url} slug={slug} size={300} font="40px" color="white" width={width} height={height} zoom={zoom} offsetX={offsetX} offsetY={offsetY}/>
        </Banner>
        <Gallery photos={processedPhotos} query={true} refetch={refetch}/>
    </>
}

export default UserPage;