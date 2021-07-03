import { useQuery } from "@apollo/client";
import { useTheme} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useContext } from "react";
import { UserContext } from "../helpers/UserContext";
import { GET_TOP_USERS } from "../queries/users";
import { ApiData } from "../types";
import CenteredLoading from "../widgets/CenteredLoading";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import Loading from "../widgets/Loading";
import Profile from "../widgets/Profile";



const UserFeed = (): ReactElement => {
    const {loading, error, data, refetch} = useQuery(GET_TOP_USERS);

    const theme = useTheme();
 
    const {state:  {styleTheme}, dispatch} : {state: {styleTheme: string}, dispatch: (action: any) => void} = useContext(UserContext);

    const useStyles = makeStyles({
        feedHead: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            borderRadius: "20px",
            margin: "20px 20px",
            padding: "0px 20px"
        }
    });

    const classes = useStyles();

    if (loading){
        return <CenteredLoading/>
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
                        <Profile display={display} profileUrl={profile_url} color={theme.palette.secondary.main} slug={slug} size={50} font="2em" width={width} height={height} zoom={zoom} offsetX={offsetX} offsetY={offsetY}/>
                    </div>
                    <Gallery photos={photos} refetch={refetch}/>
                </div>
                )
            }) 
        }
    </div>
}

export default UserFeed;