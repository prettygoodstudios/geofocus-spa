import { useQuery } from "@apollo/client";
import { ReactElement, useContext, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../helpers/UserContext";
import { GET_LOCATION } from "../queries/locations";
import { LocationData } from "../types";
import Banner from "../widgets/Banner";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import Loading from "../widgets/Loading";
import LocationFormPage from "./LocationFormPage";

const LocationPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data} = useQuery(GET_LOCATION(slug));

    const context = useContext(UserContext);

    const [editing, setEditing] = useState(false);

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Loading/>
    }

    const {location} : {location: LocationData} = data;

    const {title, address, city, state, photos, country} = location;

    photos.sort((a, b) => b.views - a.views);

    return <>
        <Banner title={title} photo={photos[0]}/>
        <p>{address}, {city}, {state}, {country}</p>
        { context.state?.user?.slug === location?.user?.slug && <button onClick={() => setEditing(!editing)}>{ editing ? "Cancel" : "Edit"}</button>}
        { editing && <LocationFormPage create={false}/> }
        <Gallery photos={photos} query={true}/>
    </>
}

export default LocationPage;