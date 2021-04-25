import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type StyleType = {
    size: string, 
    font: string, 
    color: string
}

const useStyles = makeStyles({
    profileImg: ({size}: StyleType) => ({
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "10px"
    }),
    text: ({font}: StyleType) => ({
        fontSize: font
    }),
    main: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    link: ({color}: StyleType) => ({
        color,
        textDecoration: "none"
    })
});


const Profile = ({
    display,
    profileUrl,
    size,
    font,
    slug,
    color = "black"
}: {
    display: string,
    profileUrl: string,
    size: string,
    font: string,
    slug: string,
    color?: string
}): ReactElement => {
    const classes = useStyles({size, font, color});
    return <div className={classes.main}>
        <img src={profileUrl} className={classes.profileImg}/>
        <Link to={`/user/${slug}`} className={classes.link}>
            <h2 className={classes.text}>{display}</h2>
        </Link>
        
    </div>
}

export default Profile;