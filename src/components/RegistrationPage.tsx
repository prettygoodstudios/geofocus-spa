import { useMutation } from "@apollo/client";
import { useTheme } from "@material-ui/core/styles";
import { ReactElement, useReducer, useContext, useMemo } from "react";
import { Redirect } from "react-router";
import errorParser from "../helpers/errorParser";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { REGISTER } from "../queries/users";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import Form, {FormInput} from "../widgets/Form";
import PhotoUploader from "../widgets/PhotoUploader";

const RegistrationPage = () : ReactElement => {
    const SET_INPUT = 'SET_INPUT';
    const UPDATE_UPLOADER = 'UPDATE_UPLOADER';
    const SET_ERROR = 'SET_ERROR';
    const SET_COMPLETED = 'SET_COMPLETED';

    const context = useContext(UserContext);
    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard(theme);

    const reducer = (state: any, {type, payload}: {type: string, payload: any}) => {
        switch(type){
            case SET_INPUT:
                const {inputs} = state;
                inputs[payload[0]].value = payload[1];
                return {
                    ...state,
                    inputs
                }
            case UPDATE_UPLOADER:
                return {
                    ...state,
                    uploader: payload
                }
            case SET_ERROR:
                return {
                    ...state,
                    error: payload
                }
            case SET_COMPLETED:
                return {
                    ...state,
                    completed: payload
                }
            default:
                return {
                    ...state
                }
        }
    }

    const [register, data] = useMutation(REGISTER, {
        onCompleted: (data) => {
            dispatch({
                type: SET_COMPLETED,
                payload: true
            });
            context.dispatch({
                type: SET_USER,
                payload: data.register
            });
        },
        onError: (error) => {
            debugger;
            dispatch({
                type: SET_ERROR,
                payload: errorParser(error)
            })
        }
    });

    const updateUploader = (data: any) => {
        dispatch({
            type: UPDATE_UPLOADER,
            payload: data
        })
    }

    const [{inputs, uploader, error, completed}, dispatch] = useReducer(reducer, {
        inputs: {
            email: {
                value: "",
                label: "Email",
                type: "email"
            },
            password: {
                value: "",
                label: "Password",
                type: "password"
            },
            display: {
                value: "",
                label: "Display",
                type: "text"
            },
            bio: {
                value: "",
                label: "Bio",
                type: "text"
            }
        }
    });


    const submit = () => {
        const {email, password, display, bio} = inputs;
        register({
            variables: {
                ...uploader,
                email: email.value,
                password: password.value,
                display: display.value,
                bio: bio.value
            }
        })
    }

    const formInputs: FormInput[] = Object.keys(inputs).map(input => {
        return {
            ...inputs[input],
            dispatch: ({target}) => {
                dispatch({
                    type: SET_INPUT,
                    payload: [input, target.value]
                })
            },
            key: input
        }
    });

    if (completed) {
        return <Redirect to="/me"/>
    }

    return <>
        <h1>Register</h1>
        <Form inputs={formInputs} error={error}>
            <PhotoUploader updateState={updateUploader}/>
        </Form>
        <button onClick={submit} className={`${buttons.standard} ${standard.center}`}>Register!</button>
    </>
}

export default RegistrationPage;