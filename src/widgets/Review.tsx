import { useMutation } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactElement, useState } from "react";
import { WRITE_REVIEW_MUTATION } from "../queries/reviews";
import useButtons from "../styles/buttons";
import { ReviewData } from "../types";
import IsMine from "./IsMine";
import Profile from "./Profile";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        borderRadius: 20,
        padding: 20,
        maxWidth: 500,
        margin: '20px 0px'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 20,
        '& span': {
            fontSize: 20,
            borderRadius: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `2px solid ${theme.palette.secondary.main}`,
            marginRight: 20,
            width: 60,
            height: 60
        },
        '& > div': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        '& textarea': {
            width: '100%'
        }
    }
}));


;

export default ({review, location}: {review: ReviewData, location: string} ): ReactElement => {
    const {user: {display, profile_url, offsetX, offsetY, width, height, slug, zoom}, message, score } = review;
    const theme = useTheme();
    const classes = useStyles(theme);
    const buttons = useButtons(theme)();
    const [{editing, message: msg, score: scr}, setState] = useState({
        editing: false,
        message,
        score
    });
    const [update, result] = useMutation(WRITE_REVIEW_MUTATION, {
        variables: {
            message: msg,
            location,
            score: scr
        }
    });
    return <div className={classes.wrapper}>
        <div className={classes.header}>
            <div>
                <span>{scr}</span>
                <Profile profileUrl={profile_url} offsetX={offsetX} offsetY={offsetY} slug={slug} width={width} height={height} zoom={zoom} color={theme.palette.secondary.main} display={display} size={ 50 } font="2em" />
            </div>
            <IsMine ownerSlug={slug}>
                {
                    editing ?
                        <button className={ buttons.lightBorder } onClick={() => {
                            update().then(() => {
                                setState({message: msg, editing: false, score: scr})
                            });
                        }}>Save</button>
                    :   <button className={ buttons.lightBorder } onClick={() => setState({message: msg, editing: true, score: scr})}>Edit</button>
                }
            </IsMine>
        </div>
        <div className={classes.body}>
            { editing ? 
                <>
                    <label htmlFor="score">Score:</label>
                    <input name="score" type="number" min="0" max="10" value={scr}  onChange={({target: {value}}) => setState({message: msg, editing: true, score: parseFloat(value)})}/>
                    <label htmlFor="message">Message:</label>
                    <textarea rows={ 5 } name="message" onChange={({target: {value}}) => setState({message: value, editing: true, score: scr})} value={msg}></textarea> 
                </>    
                : msg
            }
        </div>
    </div>;
}