import { useMutation, useQuery } from "@apollo/client";
import { Dispatch, ReactElement, useReducer } from "react";
import { useParams } from "react-router";
import { GET_LOCATION, UPDATE_LOCATION } from "../queries/locations";
import Form, { FormInput } from "../widgets/Form";


const LocationFormPage = ({create}: {create: boolean}): ReactElement => {

    const UPDATE_INPUT = 'UPDATE_INPUT';
    const SET_INPUT = 'SET_INPUT';
    const SET_ERROR = 'ERROR';

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
            default: 
                return {
                    ...state
                }
        }
    }

    

    const [state, dispatch] = useReducer(reducer, {
        inputs: {
            title: {
                value: "",
                label: "Title"
            },
            address: {
                value: "",
                label: "Address"
            },
            city: {
                value: "",
                label: "City"
            },
            state: {
                value: "",
                label: "State"
            },
            country: {
                value: "",
                label: "Country"
            }
        }
    } as never);

    const { error, inputs } = state; 

    const {slug}: {slug: string} = useParams();

    const [update, location] = useMutation(UPDATE_LOCATION);

    const {data} = useQuery(GET_LOCATION(slug), {
        onCompleted: (data) => {
            const {title, address, city, state, country} = data.location;
            const inputs = {
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
            dispatch({
                type: SET_INPUT,
                payload: inputs
            })
        }
    });

    const submit = () => {
        if(!create){
            update({
                variables: {
                    country: inputs?.country.value,
                    state: inputs?.state.value,
                    city: inputs?.city.value,
                    address: inputs?.address.value,
                    title: inputs?.title.value,
                    slug: data?.location?.slug
                }
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                dispatch({
                    type: SET_ERROR,
                    payload: error.message
                })
            });
        }
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

    return <>
        <Form error={error} inputs={formInputs} />
        <button onClick={submit}>Save!</button>
    </>
}

export default LocationFormPage;