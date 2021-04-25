import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { GET_LOCATION } from "../queries/locations";
import { LocationData } from "../types";
import Banner from "../widgets/Banner";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import Loading from "../widgets/Loading";

const LocationPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data} = useQuery(GET_LOCATION(slug));

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Loading/>
    }

    const {location} : {location: LocationData} = data;

    const {title, address, city, state, photos} = location;

    photos.sort((a, b) => b.views - a.views);

    return <>
        <Banner title={title} photo={photos[0]}/>
        <p>{address}, {city}, {state}</p>
        <Gallery photos={photos} query={true}/>
    </>
}

export default LocationPage;