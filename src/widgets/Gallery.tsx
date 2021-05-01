import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import {Link} from "react-router-dom";

import { PhotoData } from "../types";


import Profile from "./Profile";

export const GALLER_IMG_SIZE = 400;

const styles = makeStyles({
    feedBody: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "calc(100vw - 40px)"
    },
    feedImg: {
        width: "30vw"
    },
    feedImgWrapper: {
        width: `${GALLER_IMG_SIZE}px`,
        height: `${GALLER_IMG_SIZE}px`,
        overflow: "hidden"
    },
    card: {
        width: `${GALLER_IMG_SIZE}px`
    },
    search: {
        padding: "20px",
        width: "80vw",
        fontSize: "30px",
        borderRadius: "50px",
        border: "4px solid black",
        margin: "20px 0px",
        outline: "none"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
});

const Gallery = ({photos, query = false}: {photos: PhotoData[], query?: boolean}) : ReactElement => {
    const classes = styles();

    const [queryTerm, setQuery] = useState("");

    let filteredPhotos = photos;

    if (queryTerm !== "") {
        filteredPhotos = filteredPhotos.filter((p : PhotoData) => {
            const {slug, location: {title, state, city}, caption} = p;
            const search = [slug, title, state, city, caption];
            let retVal = false;
            search.forEach(s => {
                if(s && s.toLowerCase().indexOf(queryTerm.toLowerCase()) != -1) {
                    retVal = true;
                }
            });
            return retVal;
        })
    }

    return  <div className={classes.container}>
        {query && <input type="text" placeholder="Search..." value={queryTerm} onChange={({target}) => setQuery(target.value)} className={classes.search}></input>}
        <div className={classes.feedBody}>
            {filteredPhotos.map(({caption, url, zoom, width, height, offsetX, offsetY, views, user, slug, location}: PhotoData, id: number) => {
                return (
                <div key={id} className={classes.card}>
                    <div className={classes.feedImgWrapper}>
                        <img src={url} className={classes.feedImg} style={{
                            width: width*zoom,
                            height: height*zoom,
                            marginLeft: offsetX,
                            marginTop: offsetY
                        }}/>
                    </div>
                    <Profile display={user.display} profileUrl={user.profile_url} slug={user.slug} size="20px" font="1em"/>
                    <p><Link to={`/location/${location.slug}`}>{location.title}</Link> - {views} views - {caption}</p>
                    <Link to={`/photo/${slug}`}>View</Link>
                </div>
                )
            })}
            {
                filteredPhotos.length === 0 && <h2>Sorry there are no photos available.</h2>
            }
        </div>
    </div>
}

export default Gallery;