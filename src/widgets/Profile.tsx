import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { GALLERY_IMG_SIZE } from "./Gallery";

type StyleType = {
    size: number, 
    font: string, 
    color: string
}

const useStyles = makeStyles({
    profileImg: ({size}: StyleType) => ({
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "10px",
        position: "relative"
    }),
    img: {
        position: "absolute"
    },
    text: ({font}: StyleType) => ({
        fontSize: font,
        textAlign: "center"
    }),
    main: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    link: ({color}: StyleType) => ({
        color,
        textDecoration: "none"
    })
});


const Profile = ({
    display = "",
    profileUrl,
    size,
    font,
    slug,
    offsetX,
    offsetY,
    zoom,
    width,
    height,
    color = "black",
    path = "user",
    style = {}
}: {
    display?: string,
    profileUrl: string,
    size: number,
    font: string,
    slug: string,
    color?: string,
    path?: string,
    offsetX: number,
    offsetY: number,
    zoom: number,
    width: number,
    height: number,
    style?: any
}): ReactElement => {
    const classes = useStyles({size, font, color});
    const factor = (size/GALLERY_IMG_SIZE);
    return <div className={classes.main} style={style}>
        <div className={classes.profileImg}>
            <img src={profileUrl} className={classes.img} style={{
                marginLeft: offsetX*factor,
                marginTop: offsetY*factor,
                width: width*factor*zoom,
                height: height*factor*zoom
            }}/>
        </div>
        <Link to={`/${path}/${slug}`} className={classes.link}>
            <h2 className={classes.text}>{display}</h2>
        </Link>
        
    </div>
}

export default Profile;