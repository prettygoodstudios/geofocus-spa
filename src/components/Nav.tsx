import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { ME } from "../queries/users";
import Profile from "../widgets/Profile";

const useStyles = makeStyles({
    nav: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100px",
        backgroundColor: "#ececec",
        padding: "0px 20px",
        margin: "0px 0px 20px 0px"
    },
    title: {
        color: "black",
        fontSize: "2em",
        textDecoration: "none"
    }
})

const Nav = (): ReactElement => {
    const classes = useStyles();

    const {state: {user}, dispatch} = useContext(UserContext);

    const {data, error, loading, refetch} = useQuery(ME, {
        onCompleted: () => {
            dispatch({
                type: SET_USER,
                payload: data.me
            })
        },
        fetchPolicy: "network-only"
    });

    const history = useHistory();

    history.listen((location) => {
        if(location.pathname.indexOf("/me/") != -1){
            refetch({
                fetchPolicy: "network-only"
            });
        }
    })

    return <div className={classes.nav}>
        <Link to="/" className={classes.title}>GeoFocus</Link>
        {user ? 
            <Profile display={user.display} profileUrl={user.profile_url} slug={user.slug} size={30} font="20px" path="me" width={user.width} height={user.height} zoom={user.zoom} offsetX={user.offsetX} offsetY={user.offsetY}/>
            : 
            !loading && <Link to="/login">Login</Link>
        }
    </div>
}

export default Nav;