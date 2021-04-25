import { makeStyles } from "@material-ui/styles";
import { ReactElement } from "react";
import {Link} from "react-router-dom";

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
    return <div className={classes.nav}>
        <Link to="/" className={classes.title}>GeoFocus</Link>
    </div>
}

export default Nav;