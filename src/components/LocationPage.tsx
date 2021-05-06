import { useQuery } from "@apollo/client";
import { ReactElement, useContext, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SET_LOCATION } from "../helpers/Reducer";
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

    const context = useContext(UserContext);

    const {error, loading} = useQuery(GET_LOCATION(slug), {
        onCompleted: (data) => {
            context.dispatch({
                type: SET_LOCATION,
                payload: data.location
            });
        }
    });

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Loading/>
    }

    const {location} : {location: LocationData} = context.state;

    const setEditing = (state: boolean, location: LocationData) => {
        context.dispatch({
            type: SET_LOCATION,
            payload: {
                ...location,
                editing: state
            }
        })
    }

    if (!location) {
        return <Loading/>
    }

    const {title, address, city, state, photos, country, editing} = location;

    const mutablePhotos = [...photos];
    mutablePhotos.sort((a, b) => b.views - a.views);

    return <>
        <Banner title={title} photo={photos[0]}/>
        <p>{address}, {city}, {state}, {country}</p>
        { context.state?.user && <Link to={`/photo/upload/new/${location.slug}`}>Add Photo</Link>}
        { context.state?.user?.slug === location.user?.slug && <button onClick={() => setEditing(!editing, location)}>{ editing ? "Cancel" : "Edit"}</button>}
        { editing && <LocationFormPage create={false}/> }
        <Gallery photos={mutablePhotos} query={true}/>
    </>
}

export default LocationPage;