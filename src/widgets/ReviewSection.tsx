import { useMutation } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import errorParser from "../helpers/errorParser";
import { WRITE_REVIEW_MUTATION } from "../queries/reviews";
import useButtons from "../styles/buttons";
import { ReviewData } from "../types"
import Authenticated from "./Authenticated"
import Form from "./Form"
import Review from "./Review"

const useStyles = makeStyles({
    container: {
        margin: '20px auto',
        maxWidth: 500,
        '@media only screen and (max-width: 500px)': {
            margin: 20
        }
    },
    inputs: {
        width: '100%',
        margin: '20px 0'
    }
});

export default ({reviews, location, refetch, me} : {reviews: ReviewData[], location: string, refetch: () => void, me: string}) => {
    const classes = useStyles();
    const theme = useTheme();
    const buttons = useButtons(theme)();
    const [inputError, setInputError]: [any, (state: any) => void] = useState();

    const [inputState, setInputs] : [any, (state: any) => void] = useState(
        { 
            'score': {
                label: 'Score',
                type: 'number',
                value: 0,
                extraProps: {
                    min: 0,
                    max: 10,
                    inputClassName: classes.inputs
                }
            },
            'message': {
                label: 'Message',
                type: 'textarea',
                value: '',
                extraProps: {
                    inputClassName: classes.inputs
                }
            }
        }
    );

    const uploadData: any = {};

    for (let k in inputState) {
        uploadData[k] = inputState[k].value;
    }

    const [update, results] = useMutation(WRITE_REVIEW_MUTATION, {
        variables: {
            location,
            ...uploadData
        }
    });

    const submitReview = () => {
        update().then(() => {
            setInputError({
                message: "",
                fields: {}
            });
            refetch();
        }).catch((error) => {
            setInputError(errorParser(error));
        });
    }

    const updateInputs = (key: string, value: any, number: boolean = false) => {
        inputState[key].value = number ? parseFloat(value) : value;
        setInputs({...inputState});
    };

    const posted = reviews?.filter(({user}) => user.slug === me)?.length > 0;

    return (
        <div className={classes.container}>
            <Authenticated>
                {
                    !posted && 
                    <>
                        <h3>Leave a review!</h3>
                        <Form 
                            inputs={
                                Object.keys(inputState).map(input => {
                                    return {
                                        ...inputState[input],
                                        dispatch: ({target: {value}}) => updateInputs(input, value, inputState[input].type === "number"),
                                        key: input
                                    }
                                })
                            }
                            error={ inputError }
                        >   
                            <button onClick={submitReview} className={ buttons.standard }>Submit</button>
                        </Form>
                    </>
                }
            </Authenticated>
            { reviews.length > 0 ? <h3>Reviews</h3> : <p>There are currently no reviews available for this location.</p> }
            {
                reviews.map((r, i) => <Review review={r} location={location} key={i} refetch={refetch} me={me}/>)
            }
        </div>
    );
}