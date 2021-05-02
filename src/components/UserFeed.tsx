import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { GET_TOP_USERS } from "../queries/users";
import { ApiData } from "../types";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import Loading from "../widgets/Loading";
import Profile from "../widgets/Profile";

const styles = makeStyles({
    feedHead: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100px",
        backgroundColor: "#ececec",
        borderRadius: "20px",
        margin: "20px 20px",
        padding: "0px 20px"
    }
});

const UserFeed = (): ReactElement => {
    const {loading, error, data} = useQuery(GET_TOP_USERS);

    const classes = styles();

    if (loading){
        return <Loading/>
    }

    if (error){
        return <Error/>
    }

    return <div className="user-feed">
        {
            data.topUsers.map(({display, profile_url, photos, slug, width, height, offsetX, offsetY, zoom} : ApiData, id: number) => {
                photos = photos.map(p => ({
                    ...p,
                    user: {
                        display,
                        profile_url: profile_url,
                        slug,
                        width,
                        height,
                        offsetX,
                        offsetY,
                        zoom
                    }
                }))
                return (
                <div key={id}>
                    <div className={classes.feedHead} >
                        <Profile display={display} profileUrl={profile_url} slug={slug} size={50} font="2em" width={width} height={height} zoom={zoom} offsetX={offsetX} offsetY={offsetY}/>
                    </div>
                    <Gallery photos={photos}/>
                </div>
                )
            }) 
        }
    </div>
}

export default UserFeed;