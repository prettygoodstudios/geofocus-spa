import { makeStyles, Theme } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    '@keyframes infinite-spinning': {
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: "rotate(360deg)"
        }
    },
    loading: {
        animation: "$infinite-spinning 2s infinite",
        animationTimingFunction: "linear",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        position: "absolute",
        '& div': {
            height: "50%",
            width: "100%",
            backgroundColor: theme.palette.secondary.main
        }
    },
    mask: ({size}: {theme: Theme, size: number}) => ({
        width: size*0.8,
        height: size*0.8,
        position: "absolute",
        top: size*0.1,
        left: size*0.1,
        backgroundColor: "white",
        borderRadius: "50%"
    }),
    container: ({size}: {theme: Theme, size: number}) => ({
        position: "relative",
        height: size,
        width: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.main,
        margin: 20
    })
}));

const Loading = ({size = 50} : {size?: number}) => {

    const theme = useTheme();
    const classes = useStyles({theme, size});

    return <div>
        <div className={classes.container}>
            <div className={classes.loading}>
                <div></div>
            </div>
            <div className={classes.mask}></div>
        </div>
    </div>
}

export default Loading;