import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const makeButton = (primary: string, secondary: string, border: string = "none") => ({
    backgroundColor: primary,
        borderRadius: "30px",
        padding: "10px 20px",
        fontSize: "1em",
        textDecoration: "none",
        color: secondary,
        display: "inline-block",
        border,
        '&:hover': {
            backgroundColor: secondary,
            color: primary,
            cursor: "pointer"
        },
        '&:focus': {
            outline: "none"
        }
});

const useButtons = (theme: Theme) => makeStyles({
    standard: makeButton(theme.palette.primary.main, theme.palette.secondary.main),
    light: makeButton(theme.palette.secondary.main, theme.palette.primary.main),
    lightBorder: makeButton(theme.palette.secondary.main, theme.palette.primary.main, `2px solid ${theme.palette.secondary.main}`)
});

export default useButtons;