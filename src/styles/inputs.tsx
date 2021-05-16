import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


const useInputs = makeStyles({
    pill: (theme: Theme) => ({
        borderRadius: 20,
        border: `1px solid ${theme.palette.primary.main}`,
        padding: "10px 20px",
        color: theme.palette.primary.main,
        '&::placeholder': {
            opacity: 1,
            color: theme.palette.primary.main
        },
        '&:focus': {
            outline: "none"
        }
    })
});

export default useInputs;