import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
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
        width: "100%",
        marginTop: 20
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

    const {views, url, caption, user, location} : PhotoData = data.photo;

    return <>
        <div className={classes.imgContainer}>
            <img src={url} className={classes.img}/>
            <Profile slug={user.slug} display={user.display} profileUrl={user.profile_url} size={20} font="15px" width={user.width} height={user.height} zoom={user.zoom} offsetX={user.offsetX} offsetY={user.offsetY}/>
            <Link to={`/location/${location.slug}`}>{location.title}</Link> - {views} views - {caption}
        </div>
    </>
}

export default PhotoPage;