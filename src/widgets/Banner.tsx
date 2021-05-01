import { ReactElement } from "react";
import { makeStyles } from "@material-ui/styles";

import { PhotoData } from "../types";

const useStyles = makeStyles({
    banner: {
        display: "flex",
        height: "500px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ececec",
        position: "relative",
        overflow: "hidden",
        margin: "0px 0px 20px 0px"
    },
    bannerBackground: {
        minWidth: "100vw",
        minHeight: "500px",
        maxWidth: "200vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    bannerMask: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#000",
        opacity: 0.5
    },
    bannerTitle: {
        zIndex: 1,
        color: "white",
        fontSize: "2em",
        fontWeight: "lighter"
    }
});

const Banner = ({title, photo, children} : {title?: string|undefined, photo: PhotoData|null, children?: ReactElement}): ReactElement => {
    const classes = useStyles();
    return <div className={classes.banner}>
        <img src={photo?.url} className={classes.bannerBackground}/>
        <div className={classes.bannerMask}></div>
        <h1 className={classes.bannerTitle}>{title}{children}</h1>
    </div>
}

export default Banner;