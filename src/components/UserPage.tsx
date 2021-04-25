import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { GET_USER } from "../queries/users";
import { UserData } from "../types";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import Loading from "../widgets/Loading";

import Profile from "../widgets/Profile";


const useStyles = makeStyles({
    banner: {
        backgroundColor: "#ececec",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "50px",
        height: "400px",
        margin: "0px 0px 20px 0px"
    }
});


const UserPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data} = useQuery(GET_USER(slug));
    const classes = useStyles();

    if (error){
        return <Error/>
    }

    if (loading){
        return <Loading/>
    }

    const {user: {photos, display, profile_url}} = data;

    const mappedPhotos = photos.map((p: UserData) => ({
        ...p,
        user: {
            display,
            profileUrl: profile_url,
            slug
        }
    }))

    return <>
        <div className={classes.banner}>
            <Profile display={display} profileUrl={profile_url} slug={slug} size="300px" font="40px"/>
        </div>
        <Gallery photos={mappedPhotos}/>
    </>
}

export default UserPage;