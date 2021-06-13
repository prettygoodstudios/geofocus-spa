import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GET_PHOTO } from "../queries/photo";
import { PhotoData } from "../types";
import CenteredLoading from "../widgets/CenteredLoading";
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
    },
    detailWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
        return <CenteredLoading/>
    }

    const {views, url, caption, user, location} : PhotoData = data.photo;

    return <>
        <div className={classes.imgContainer}>
            <img src={url} className={classes.img}/>
            <div className={classes.detailWrapper}>
                <Profile slug={user.slug} display={user.display} profileUrl={user.profile_url} size={20} font="15px" spacing={ 3 } width={user.width} height={user.height} zoom={user.zoom} offsetX={user.offsetX} offsetY={user.offsetY}/>
                <span style={{marginLeft: 5}}><Link to={`/location/${location.slug}`}>{location.title}</Link> - {views} views - {caption}</span>
            </div>
        </div>
    </>
}

export default PhotoPage;