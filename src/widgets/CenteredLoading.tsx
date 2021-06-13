import { makeStyles } from "@material-ui/styles";
import { FC } from "react";

import Loading from "./Loading";

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh'
    }
})

const CenteredLoading: FC = () => {

    const classes = useStyles();

    return <div className={ classes.wrapper } >
        <h1>Loading...</h1>
        <Loading size={ 200 } />
    </div>
}

export default CenteredLoading;