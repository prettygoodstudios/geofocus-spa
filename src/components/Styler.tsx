import {  useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const Styler: React.FC = ({children})=> {
    const theme =  useTheme();
    const useStyles = makeStyles({
        main: {
            fontFamily: theme.typography.fontFamily
        }
    });
    const classes = useStyles(theme);
    return <div className={classes.main}>
        {children}
    </div>
}

export default Styler;