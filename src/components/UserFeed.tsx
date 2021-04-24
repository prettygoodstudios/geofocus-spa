import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import { GET_TOP_USERS } from "../queries/users";
import Error from "../widgets/Error";
import Loading from "../widgets/Loading";

const styles = makeStyles({
    feedHead: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    profileImg: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        overflow: "hidden"
    },
    feedBody: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    feedImg: {
        width: "30vw"
    },
    feedImgWrapper: {
        width: "30vw",
        height: "300px",
        overflow: "hidden"
    }
});

type ApiData = {
    display: string,
    profile_url: string,
    photos: {
        caption: string,
        url: string
    }[]
}


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
            data.users.map(({display, profile_url, photos} : ApiData, id: number) => {
                return (
                <>
                    <div className={classes.feedHead} >
                        <img src={profile_url} className={classes.profileImg}/>
                        <h2>{display}</h2>
                    </div>
                    <div className={classes.feedBody}>
                        {photos.map(({caption, url}, id: number) => {
                            return (
                            <div key={id}>
                                <div className={classes.feedImgWrapper}>
                                    <img src={url} className={classes.feedImg}/>
                                </div>
                                <p>{caption}</p>
                            </div>
                            )
                        })}
                    </div>
                </>
                )
            }) 
        }
    </div>
}

export default UserFeed;