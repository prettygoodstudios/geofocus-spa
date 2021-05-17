import { useQuery } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import mapboxgl from "mapbox-gl";
import { Link, Redirect } from "react-router-dom";
import { Dispatch, KeyboardEvent, ReactElement, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MAPBOX_KEY } from "../helpers/secrets";
import { UserContext } from "../helpers/UserContext";

import {GET_LOCATIONS} from "../queries/locations";
import { LocationData } from "../types";
import useButtons from "../styles/buttons"; 
import useInputs from "../styles/inputs";
 
mapboxgl.accessToken = MAPBOX_KEY;


const NOT_SELECTED = -1;


const Locations = (): ReactElement => {
    const {data} = useQuery(GET_LOCATIONS, {
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
            height: "500px",
            position: "relative",
            overflow: "hidden"
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
        searchContainer: {
           right: 20,
           top: 20,
           position: "absolute",
           zIndex: 1
        },
        search: {
           width: 200
        },
        searchResults: {
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
            width: 200,
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
        },
        selected: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main
        },
        popupImg: {
            maxWidth: "100%",
            maxHeight: 200,
            marginBottom: 20,
            display: "block"
        }
    });

    const classes = useStyles();

    const buttons = useButtons(theme)();
    const inputs = useInputs(theme);

    const [query, setQuery] = useState({
        query: "",
        selectIndex: NOT_SELECTED,
        redirect: ""
    });

    const createPopupHtml = (title: string, slug: string, imgUrl: string): HTMLElement => {
        const div = document.createElement("div");
        const titleElement = document.createElement("h2");
        titleElement.innerText = title;
        const link = document.createElement("a");
        link.href = `/location/${slug}`;
        link.innerText = `View`;
        link.className = buttons.standard;
        div.appendChild(titleElement);

        if(imgUrl) {
            const img = document.createElement("img");
            img.src = imgUrl;
            img.className = classes.popupImg;
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
        for(let word of query.split(" ")) {
            if (title.toLowerCase().indexOf(word) != -1) {
                rank+=2;
            }
            if (address.toLowerCase().indexOf(word) != -1) {
                rank++;
            }
            if (city.toLowerCase().indexOf(word) != -1) {
                rank++;
            }
            if (state.toLowerCase().indexOf(word) != -1) {
                rank++;
            }
            if (country.toLowerCase().indexOf(word) != -1) {
                rank++;
            }
        }
        if (query === ""){
            rank = 0;
        }
        return rank;
    }

    const locations: LocationData[] = data?.locations;
    const filteredLocations: LocationData[] = locations ? locations
        .map(location => [computeLocationRank(query.query, location), location])
        .filter(location => location[0] !== 0)
        .sort((l1, l2) => (l2[0] as number) - (l1[0] as number))
        .map(location => location[1] as LocationData)
    : [];

    const selectLocation = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;
        let {selectIndex} = query;
        switch(key){
            case "ArrowUp":
                selectIndex -= 1;
                event.preventDefault();
                break;
            case "ArrowDown":
                selectIndex += 1
                event.preventDefault();
                break;
            case "Enter":
                setQuery({
                    ...query,
                    redirect: filteredLocations[selectIndex].slug
                });
                return;
            default:
                selectIndex = NOT_SELECTED
        }
        if (selectIndex != NOT_SELECTED) {
            if (selectIndex < 0) {
                selectIndex = Math.min(filteredLocations.length, 10) - (-selectIndex-1) % Math.min(filteredLocations.length, 10)
            }
            selectIndex %= Math.min(filteredLocations.length, 10);
        }
        setQuery({
            ...query,
            selectIndex
        })
    }

    if(query.selectIndex >= 0 && map){
        const location = filteredLocations[query.selectIndex];
        map!.flyTo({
            center: [location.longitude, location.latitude],
            speed: 0.5,
            zoom: 8
        });
    }

    if(query.redirect) {
        return <Redirect push to={`/location/${query.redirect}`}/>;
    }

    return <div className={classes.container}>
        {context.state.user && <Link to="/location/form/create" className={`${classes.create} ${buttons.standard}`} tabIndex={-1}>Create a new Location</Link>}
        <div className={classes.searchContainer}>
            <input type="text" placeholder="Search" className={`${classes.search} ${inputs.pill}`} value={query.query} onChange={({target}) => setQuery({...query, query: target?.value})} onKeyDown={selectLocation} tabIndex={0}/>
            { filteredLocations.length > 0 &&
                <div className={classes.searchResults}>
                    {
                        filteredLocations.slice(0, 10).map((l, i) => {
                            const {title, address, city, state, country, slug} = l;
                            return <Link key={i} to={`/location/${slug}`} className={`${classes.result} ${query.selectIndex === i ? classes.selected : ''}`} onMouseEnter={() => setQuery({...query, selectIndex: i})}>
                                <h3>{title}</h3>
                                <p>{address}, {city}, {state}, {country}</p>  
                            </Link>
                        })
                    }
                </div>
            }
        </div>
        <div id="locationMap" className={classes.map}></div>
    </div>;
}

export default Locations;