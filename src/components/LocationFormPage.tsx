import { useMutation } from "@apollo/client";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactElement, useContext, useEffect, useReducer } from "react";
import { Redirect } from "react-router";
import errorParser from "../helpers/errorParser";
import { SET_LOCATION } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { CREATE_LOCATION, UPDATE_LOCATION } from "../queries/locations";
import useButtons from "../styles/buttons";
import Form, { FormInput } from "../widgets/Form";


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    }
})


const LocationFormPage = ({create}: {create: boolean}): ReactElement => {

    const reducer = (state: any, {type, payload} : {type: 'UPDATE_INPUT' | 'SET_ERROR' | 'ERROR' | 'SUCCESS' | 'SET_INPUT' | 'SET_LOADING', payload?: any}) => {
        switch(type){
            case 'UPDATE_INPUT':
                const {inputs} = state;
                inputs[payload[0]].value = payload[1];
                return {
                    ...state,
                    ...inputs
                }
            case 'SET_INPUT':
                return {
                    ...state,
                    inputs: payload
                }
            case 'SET_ERROR':
                return {
                    ...state,
                    error: payload,
                    loading: false
                }
            case 'SUCCESS':
                return {
                    ...state,
                    success: true,
                    slug: payload,
                    loading: false
                }
            case 'SET_LOADING':
                return {
                    ...state,
                    loading: true
                }
            default: 
                return {
                    ...state
                }
        }
    }

    const generateInputs = (title: string = "", address: string = "", city: string = "", state: string = "", country: string = "") => {
        return {
            title: {
                value: title,
                label: "Title"
            },
            address: {
                value: address,
                label: "Address"
            },
            city: {
                value: city,
                label: "City"
            },
            state: {
                value: state,
                label: "State"
            },
            country: {
                value: country,
                label: "Country"
            }
        }
    }

    const initInputs = {
        inputs: generateInputs(),
        error: {
            message: '',
            fields: {}
        },
        success: false,
        slug: ""
    };

    const [state, dispatch] = useReducer(reducer, initInputs);

    const { error, inputs, success, slug, loading } = state; 

    const [update] = useMutation(UPDATE_LOCATION);
    const [createLocaton] = useMutation(CREATE_LOCATION);

    const context = useContext(UserContext);

    const theme = useTheme();
    const classes = useStyles();
    const buttons = useButtons(theme)();

    useEffect(() => {
        if (!create) {
            const {title, address, city, state, country} = context.state.location;
            const inputs = generateInputs(title, address, city, state, country);
            dispatch({
                type: 'SET_INPUT',
                payload: inputs
            })
        }
    }, []);

    const submit = (hook: (options: any) => Promise<any>, property: string) => {
        const data = {
            country: inputs?.country.value,
            state: inputs?.state.value,
            city: inputs?.city.value,
            address: inputs?.address.value,
            title: inputs?.title.value,
            slug: context.state?.location?.slug
        }
        hook({variables: data}).then(({data}) => {
            if (!create){
                context.dispatch({
                    type: SET_LOCATION,
                    payload: {
                        ...data[property],
                        photos: context.state.location.photos,
                        user: context.state.user
                    }
                });
            } else {
                dispatch({
                    type: 'SUCCESS',
                    payload: data[property].slug
                });
            }
        }).catch((error) => {
            dispatch({
                type: "SET_ERROR",
                payload: errorParser(error)
            });
        });
    }

    const formInputs: FormInput[] = Object.keys(inputs).map((input: string) => {
        return {
            type: "text",
            value: inputs[input].value,
            label: inputs[input].label,
            dispatch: ({target}) => {
                dispatch({
                    type: 'UPDATE_INPUT',
                    payload: [input, target.value]
                })
            },
            key: input
        }
    }); 

    if (success) {
        return <Redirect to={`/location/${slug}`}/>
    }

    const submitHandler = () => {
        dispatch({
            type: 'SET_LOADING'
        });
        if (create) {
            submit(createLocaton, "createLocation")
        } else {
            submit(update, "updateLocation")
        }
    }

    return <div className={classes.container}>
        <Form error={error} inputs={formInputs} loading={ loading }/>
        <button onClick={ submitHandler } className={buttons.standard}>Save!</button>
    </div>
}

export default LocationFormPage;