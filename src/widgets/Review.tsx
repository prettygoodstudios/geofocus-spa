import { useMutation } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactElement, useState } from "react";
import errorParser from "../helpers/errorParser";
import { DELETE_REVIEW_MUTATION, WRITE_REVIEW_MUTATION } from "../queries/reviews";
import useButtons from "../styles/buttons";
import { ReviewData } from "../types";
import Authenticated from "./Authenticated";
import Form from "./Form";
import IsMine from "./IsMine";
import Profile from "./Profile";
import ReportForm from "./ReportForm";

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

export default ({review, location, refetch, me}: {review: ReviewData, location: string, refetch: () => void, me: string} ): ReactElement => {
    const {user: {display, profile_url, offsetX, offsetY, width, height, slug, zoom}, message, score } = review;
    const theme = useTheme();
    const classes = useStyles(theme);
    const buttons = useButtons(theme)();
    const [state, setState] = useState({
        editing: false,
        message,
        score,
        error: {
            message: ''
        },
        reporting: false
    } as {
        editing: boolean,
        message: string,
        score: number | '',
        error: {
            message: string,
            fields?: {
                [key: string]: string
            }
        },
        reporting: boolean
    });
    const {editing, message: msg, score: scr, error, reporting} = state;
    const adminVariables = me === slug ? {} : { user: slug };
    const [update] = useMutation(WRITE_REVIEW_MUTATION, {
        variables: {
            message: msg,
            location,
            score: scr,
            ...adminVariables
        }
    });
    const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
        variables: {
            location,
            ...adminVariables
        }
    });
    return <div className={classes.wrapper}>
        <div className={classes.header}>
            <div>
                <span>{scr}</span>
                <Profile profileUrl={profile_url} offsetX={offsetX} offsetY={offsetY} slug={slug} width={width} height={height} zoom={zoom} color={theme.palette.secondary.main} display={display} size={ 30 } font="1em" />
            </div>
            <IsMine ownerSlug={slug}>
                {
                    editing ?
                        <div>
                            <button className={ buttons.lightBorder } onClick={() => setState({...state, message: message, editing: false, score: score, error: { message: ''}})}>
                                Cancel
                            </button>
                            <button className={ buttons.lightBorder } onClick={() => {
                                update().then(() => {
                                    setState({...state, message: msg, error: { message: '' }, editing: false});
                                }).catch((error) => {
                                    setState({...state, message: msg, error: errorParser(error)});
                                });
                            }}>Save</button>
                        </div>
                    :   
                    <div>
                        <button className={ buttons.lightBorder } onClick={() => deleteReview().then(refetch)}>Delete</button>
                        <button className={ buttons.lightBorder } onClick={() => setState({...state, message: msg, editing: true})}>Edit</button>
                    </div>
                }
            </IsMine>
        </div>
        <div className={classes.body}>
            { editing ? 
                <Form 
                    inputs={[
                        {
                            key: 'score',
                            type: 'number',
                            label: 'Score',
                            value: scr as string,
                            extraProps: {
                                min: 0,
                                max: 10
                            },
                            dispatch: ({target: {value}}) => setState({...state, score: !Number.isNaN(parseFloat(value)) ? parseFloat(value) : ''})
                        },
                        {
                            key: 'message',
                            type: 'textarea',
                            label: 'Message',
                            value: msg,
                            dispatch: ({target: {value}}) => setState({...state, message: value})
                        }
                    ]}
                    error={ error }
                />  
                : msg
            }
            <Authenticated>
                {
                    reporting ?
                        <ReportForm
                            review={ review.slug }
                            cancel={ () => setState({...state, reporting: false}) }
                        />
                    :
                        <a onClick={() => setState({...state, reporting: true})}>Report</a>
                }
            </Authenticated>
        </div>
    </div>;
}