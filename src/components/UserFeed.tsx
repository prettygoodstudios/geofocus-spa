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
            data.topUsers.map(({display, profile_url, photos, slug} : ApiData, id: number) => {
                photos = photos.map(p => ({
                    ...p,
                    user: {
                        display,
                        profileUrl: profile_url,
                        slug
                    }
                }))
                return (
                <>
                    <div className={classes.feedHead} >
                        <Profile display={display} profileUrl={profile_url} slug={slug} size="50px" font="2em"/>
                    </div>
                    <Gallery photos={photos}/>
                </>
                )
            }) 
        }
    </div>
}

export default UserFeed;