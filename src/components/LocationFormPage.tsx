import { useMutation } from "@apollo/client";
import { useTheme } from "@material-ui/core/styles";
import { ReactElement, useContext, useEffect, useReducer } from "react";
import { Redirect } from "react-router";
import { SET_LOCATION } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { CREATE_LOCATION, UPDATE_LOCATION } from "../queries/locations";
import useButtons from "../styles/buttons";
import Form, { FormInput } from "../widgets/Form";


const LocationFormPage = ({create}: {create: boolean}): ReactElement => {

    const UPDATE_INPUT = 'UPDATE_INPUT';
    const SET_INPUT = 'SET_INPUT';
    const SET_ERROR = 'ERROR';
    const SUCCESS = 'SUCCESS';

    const reducer = (state: any, {type, payload} : {type: string, payload: any}) => {
        switch(type){
            case UPDATE_INPUT:
                const {inputs} = state;
                inputs[payload[0]].value = payload[1];
                return {
                    ...state,
                    ...inputs
                }
            case SET_INPUT:
                return {
                    ...state,
                    inputs: payload
                }
            case SET_ERROR:
                return {
                    ...state,
                    error: payload
                }
            case SUCCESS:
                return {
                    ...state,
                    success: true,
                    slug: payload
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
        error: "",
        success: false,
        slug: ""
    };

    const [state, dispatch] = useReducer(reducer, initInputs);

    const { error, inputs, success, slug } = state; 

    const [update] = useMutation(UPDATE_LOCATION);
    const [createLocaton] = useMutation(CREATE_LOCATION);

    const context = useContext(UserContext);

    const theme = useTheme();
    const buttons = useButtons(theme)();

    useEffect(() => {
        if (!create) {
            const {title, address, city, state, country} = context.state.location;
            const inputs = generateInputs(title, address, city, state, country);
            dispatch({
                type: SET_INPUT,
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
                    type: SUCCESS,
                    payload: data[property].slug
                });
            }
        }).catch((error) => {
            dispatch({
                type: SET_ERROR,
                payload: error.message
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
                    type: UPDATE_INPUT,
                    payload: [input, target.value]
                })
            }
        }
    }); 

    if (success) {
        return <Redirect to={`/location/${slug}`}/>
    }

    return <>
        <Form error={error} inputs={formInputs} />
        <button onClick={create ? () => submit(createLocaton, "createLocation") : () => submit(update, "updateLocation")} className={buttons.standard}>Save!</button>
    </>
}

export default LocationFormPage;