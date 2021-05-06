import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import mapboxgl from "mapbox-gl";
import { Dispatch, ReactElement, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MAPBOX_KEY } from "../helpers/secrets";

import {GET_LOCATIONS} from "../queries/locations";
import { LocationData } from "../types";
 
mapboxgl.accessToken = MAPBOX_KEY;


const useStyles = makeStyles({
    map: {
        width: "100vw",
        height: "500px"
    }
})

const Locations = (): ReactElement => {
    const {loading, error, data} = useQuery(GET_LOCATIONS);

    const [map, setMap]:  [mapboxgl.Map|null, Dispatch<SetStateAction<null|mapboxgl.Map>>] = useState(null);


    const classes = useStyles();

    useEffect(() => {
        setMap(new mapboxgl.Map({
            container: 'locationMap',
            style: 'mapbox://styles/prettygoodstudios/cjdjnyk9047qy2rmm28tmk0m8'
        }));
    }, []);

    const createPopupHtml = (title: string, slug: string): HTMLElement => {
        const div = document.createElement("div");
        const titleElement = document.createElement("h2");
        titleElement.innerText = title;
        const link = document.createElement("a");
        link.href = `/location/${slug}`;
        link.innerText = `View`;
        div.appendChild(titleElement);
        div.appendChild(link);
        return div;
    }

    useEffect(() => {
        if(map && data){
            const {locations} : {locations: LocationData[]} = data;
            locations.forEach(({latitude, longitude, title, slug}) => {
                if(longitude && latitude) {
                    new mapboxgl.Marker({
                        color: "#ececec"
                    }).setLngLat([longitude, latitude])
                    .addTo(map)
                    .setPopup(new mapboxgl.Popup().setDOMContent(createPopupHtml(title, slug)));
                }
                
            });
        }
    }, [data, map]);


    return <div className="feed">
        <div id="locationMap" className={classes.map}></div>
    </div>;
}

export default Locations;