import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const useButtons = (theme: Theme) => makeStyles({
    standard: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "30px",
        padding: "10px 20px",
        fontSize: "1em",
        textDecoration: "none",
        color: theme.palette.secondary.main,
        display: "inline-block",
        border: "none",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    }
});

export default useButtons;