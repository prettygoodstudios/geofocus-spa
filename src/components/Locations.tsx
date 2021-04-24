import { useQuery } from "@apollo/client";
import mapboxgl from "mapbox-gl";
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

import {GET_LOCATIONS} from "../queries/locations";
import Error from "../widgets/Error";
import Loading from "../widgets/Loading";

console.log(mapboxgl);
 
mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHR5Z29vZHN0dWRpb3MiLCJhIjoiY2pkamx4aTZlMWt4dDJwbnF5a3ZmbTEzcyJ9.lu_9eqO1kmUMPf9LXU80yg';

const Locations = (): ReactElement => {
    const {loading, error, data} = useQuery(GET_LOCATIONS);

    if (loading){
        return <Loading/>;
    }

    if (error){
        return <Error/>
    }

    const [map, setMap]:  [mapboxgl.Map|null, Dispatch<SetStateAction<null|mapboxgl.Map>>] = useState(null);

    useEffect(() => {
        setMap(new mapboxgl.Map({
            container: 'locationMap',
            style: 'mapbox://styles/mapbox/streets-v11'
        }));
    }, []);

    useEffect(() => {
        if(map){

        }
    }, [map]);

    return <div className="feed">
        <div id="locationMap"></div>
        {
            data.locations.map(({address, title} : {address: string, title: string}, id: number) => {
                return <div key={id}>{title} - {address}</div>
            })
        }
    </div>;
}

export default Locations;