import { useMutation, useQuery } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactElement, useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { LOGOUT, ME } from "../queries/users";
import Profile from "../widgets/Profile";



const Nav = (): ReactElement => {

    const theme = useTheme();

    const useStyles = makeStyles({
        nav: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100px",
            backgroundColor: theme.palette.primary.main,
            padding: "0px 20px",
            margin: "0px",
            color: theme.palette.secondary.main,
            '& a': {
                color: theme.palette.secondary.main,
                textDecoration: "none",
                cursor: "pointer",
                textWrap: "none"
            }
        },
        title: {
            color: theme.palette.secondary.main,
            fontSize: "2em",
            textDecoration: "none"
        },
        user: {
            height: 30,
            width: 30,
            '&:hover': {
                '& div': {
                    display: "flex",
                }
            },
            position: "relative"
        },
        menu: {
            display: 'none',
            backgroundColor: theme.palette.primary.main,
            flexDirection: "column",
            position: "absolute",
            top: 20,
            right: 0,
            zIndex: 2,
            padding: 20,
            fontSize: "1.2em",
            borderRadius: 10,
            width: 200,
            alignItems: "flex-end"
        }
    });

    const classes = useStyles();

    const {state: {user}, dispatch} = useContext(UserContext);
    const [clearCookies, result] = useMutation(LOGOUT);


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
    });

    const logout = () => {
        clearCookies().then(() => {
            dispatch({
                type: SET_USER,
                payload: null
            });
        });
    }

    return <div className={classes.nav}>
        <Link to="/" className={classes.title} tabIndex={-1}>GeoFocus</Link>
        {user ? 
            <div className={classes.user}>
                <Profile style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 3
                }} color={theme.palette.secondary.main} profileUrl={user.profile_url} slug={user.slug} size={30} font="20px" path="me" width={user.width} height={user.height} zoom={user.zoom} offsetX={user.offsetX} offsetY={user.offsetY}/>
                <div className={classes.menu}>
                    <Link to="/me">{user.display}</Link>
                    <a onClick={logout}>Log out!</a>
                </div>
            </div>
            : 
            !loading && <Link to="/login" tabIndex={-1}>Login</Link>
        }
    </div>
}

export default Nav;