import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import {Link} from "react-router-dom";

import { PhotoData } from "../types";


import Profile from "./Profile";



const styles = makeStyles({
    feedBody: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    feedImg: {
        width: "30vw"
    },
    feedImgWrapper: {
        width: "400px",
        height: "400px",
        overflow: "hidden"
    }
});

const Gallery = ({photos}: {photos: PhotoData[]}) : ReactElement => {
    const classes = styles();

    return <div className={classes.feedBody}>
        {photos.map(({caption, url, zoom, width, height, offsetX, offsetY, views, user, slug}: PhotoData, id: number) => {
            return (
            <div key={id}>
                <div className={classes.feedImgWrapper}>
                    <img src={url} className={classes.feedImg} style={{
                        width: width*zoom,
                        height: height*zoom,
                        marginLeft: offsetX,
                        marginTop: offsetY
                    }}/>
                </div>
                <Profile display={user.display} profileUrl={user.profileUrl} slug={user.slug} size="20px" font="1em"/>
                <p>{views} views - {caption}</p>
                <Link to={`/photo/${slug}`}>View</Link>
            </div>
            )
        })}
    </div>
}

export default Gallery;