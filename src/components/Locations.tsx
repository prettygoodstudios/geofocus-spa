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
import { isNonEmptyArray } from "@apollo/client/utilities";
 
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
            height: "500px"
        },
        create: {
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1
        },
        search: {
           right: 20,
           top: 20,
           height: 20,
           position: "absolute",
           width: 200 
        },
        searchResults: {
            right: 20,
            top: 60,
            position: "absolute",
            width: 200,
            height: 300,
            overflowY: "scroll"
        },
        result: {
            textDecoration: "none",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            padding: 10,
            '& p': {
                fontSize: "0.5em",
                margin: "5px 0px",
            },
            '& h3': {
                fontSize: "0.6em",
                margin: 0
            }
        }
    });

    const classes = useStyles();

    const buttons = useButtons(theme)();

    const [query, setQuery] = useState("");

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

    const computeLocationRank = (query: string, location: LocationData) => {
        const {title, address, city, state, country} = location;
        let rank = 0;
        query = query.toLowerCase();
        if (title.toLowerCase().indexOf(query) != -1) {
            rank++;
        }
        if (address.toLowerCase().indexOf(query) != -1) {
            rank++;
        }
        if (city.toLowerCase().indexOf(query) != -1) {
            rank++;
        }
        if (state.toLowerCase().indexOf(query) != -1) {
            rank++;
        }
        if (country.toLowerCase().indexOf(query) != -1) {
            rank++;
        }
        if (query === ""){
            rank = 0;
        }
        return rank;
    }

    const locations: LocationData[] = data?.locations;
    const filteredLocations = locations ? locations.filter(l => {
        console.log(computeLocationRank(query, l))
        return computeLocationRank(query, l) != 0;
    }) : [];

    filteredLocations.sort((l1, l2) => {
        return computeLocationRank(query, l1) - computeLocationRank(query, l2);
    });


    return <div className={classes.container}>
        {context.state.user && <Link to="/location/form/create" className={`${classes.create} ${buttons.standard}`}>Create a new Location</Link>}
        <input type="text" placeholder="Search" className={classes.search} value={query} onChange={({target}) => setQuery(target?.value)}/>
        
        { filteredLocations.length > 0 &&
            <div className={classes.searchResults}>
                {
                    filteredLocations.slice(0, 10).map((l, i) => {
                        const {title, address, city, state, country, slug} = l;
                        return <Link key={i} to={`/location/${slug}`} className={classes.result}>
                        <h3>{title}</h3>
                        <p>{address}, {city}, {state}, {country}</p>  
                        </Link>
                    })
                }
            </div>
        }
        <div id="locationMap" className={classes.map}></div>
    </div>;
}

export default Locations;