import { useQuery } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import mapboxgl from "mapbox-gl";
import { Link } from "react-router-dom";
import { Dispatch, ReactElement, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MAPBOX_KEY } from "../helpers/secrets";
import { UserContext } from "../helpers/UserContext";

import {GET_LOCATIONS} from "../queries/locations";
import { LocationData } from "../types";
import useButtons from "../styles/buttons";
 
mapboxgl.accessToken = MAPBOX_KEY;




const Locations = (): ReactElement => {
    const {loading, error, data} = useQuery(GET_LOCATIONS, {
        fetchPolicy: "network-only"
    });

    const [map, setMap]:  [mapboxgl.Map|null, Dispatch<SetStateAction<null|mapboxgl.Map>>] = useState(null);

    const context = useContext(UserContext);

    

    useEffect(() => {
        setMap(new mapboxgl.Map({
            container: 'locationMap',
            style: 'mapbox://styles/prettygoodstudios/cjdjnyk9047qy2rmm28tmk0m8'
        }));
    }, []);

    const theme = useTheme();

    const useStyles = makeStyles({
        map: {
            width: "100%",
            height: "500px"
        },
        container: {
            position: "relative",
            width: "100%",
            height: "500px",
            overflow: "hidden"
        },
        create: {
            position: "absolute",
            top: 20,
            left: 20
        }
    });

    const classes = useStyles();

    const buttons = useButtons(theme)();

    const createPopupHtml = (title: string, slug: string, imgUrl: string): HTMLElement => {
        const div = document.createElement("div");
        const titleElement = document.createElement("h2");
        titleElement.innerText = title;
        const link = document.createElement("a");
        link.href = `/location/${slug}`;
        link.innerText = `View`;
        div.appendChild(titleElement);

        if(imgUrl) {
            const img = document.createElement("img");
            img.src = imgUrl;
            img.style.maxWidth = "100%";
            div.appendChild(img);
        }

        div.appendChild(link);
        return div;
    }

    useEffect(() => {
        if(map && data){
            const {locations} : {locations: LocationData[]} = data;
            locations.forEach(({latitude, longitude, title, slug, photos}) => {
                if(longitude && latitude) {
                    new mapboxgl.Marker({
                        color: theme.palette.primary.main
                    }).setLngLat([longitude, latitude])
                    .addTo(map)
                    .setPopup(new mapboxgl.Popup().setDOMContent(createPopupHtml(title, slug, photos[0]?.url)));
                }
                
            });
        }
    }, [data, map]);


    return <div className={classes.container}>
        {context.state.user && <Link to="/location/form/create" className={`${classes.create} ${buttons.standard}`}>Create a new Location</Link>}
        <div id="locationMap" className={classes.map}></div>
    </div>;
}

export default Locations;