import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { GET_PHOTO } from "../queries/photo";
import { PhotoData } from "../types";
import Error from "../widgets/Error";
import Loading from "../widgets/Loading";
import Profile from "../widgets/Profile";

const useStyles = makeStyles({
    imgContainer: {
        maxWidth: "min(500px, 80vw)",
        marginLeft: "50%",
        transform: "translate(-50%, 0)"
    },
    img: {
        width: "100%"
    }
});


const PhotoPage = (): ReactElement =>  {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data} = useQuery(GET_PHOTO(slug));

    const classes = useStyles();

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Loading/>
    }

    const {views, url, caption, user} : PhotoData = data.photo;

    user.profileUrl = data.photo.user.profile_url;

    return <>
        <div className={classes.imgContainer}>
            <img src={url} className={classes.img}/>
            <Profile slug={user.slug} display={user.display} profileUrl={user.profileUrl} size="20px" font="15px"/>
            {views} views - {caption}
        </div>
    </>
}

export default PhotoPage;