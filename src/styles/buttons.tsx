import { makeStyles } from "@material-ui/styles";

const useButtons = makeStyles({
    standard: {
        backgroundColor: "#ececec",
        borderRadius: "30px",
        padding: "10px 20px",
        fontSize: "1.5em",
        textDecoration: "none",
        color: "black",
        display: "inline-block",
        '&:hover': {
            backgroundColor: "black",
            color: "#ececec"
        }
    }
});

export default useButtons;