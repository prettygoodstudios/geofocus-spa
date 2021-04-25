import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    profileImg: ({size}: {size: string, font: string}) => ({
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "10px"
    }),
    text: ({font}: {size: string, font: string}) => ({
        fontSize: font
    }),
    main: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    link: {
        color: "black",
        textDecoration: "none"
    }
});


const Profile = ({
    display,
    profileUrl,
    size,
    font,
    slug
}: {
    display: string,
    profileUrl: string,
    size: string,
    font: string,
    slug: string
}): ReactElement => {
    const classes = useStyles({size, font});
    return <div className={classes.main}>
        <img src={profileUrl} className={classes.profileImg}/>
        <Link to={`/user/${slug}`} className={classes.link}>
            <h2 className={classes.text}>{display}</h2>
        </Link>
        
    </div>
}

export default Profile;