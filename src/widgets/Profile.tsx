import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";

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
    }
});


const Profile = ({
    display,
    profileUrl,
    size,
    font
}: {
    display: string,
    profileUrl: string,
    size: string,
    font: string
}): ReactElement => {
    const classes = useStyles({size, font});
    return <div className={classes.main}>
        <img src={profileUrl} className={classes.profileImg}/>
        <h2 className={classes.text}>{display}</h2>
    </div>
}

export default Profile;