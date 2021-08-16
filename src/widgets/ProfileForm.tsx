import { FetchResult } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import errorParser from "../helpers/errorParser";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import Form, { FormInput } from "./Form";
import PhotoUploader, { PhotoCropState } from "./PhotoUploader";

type ProfileFormProps = {
    save: (data: any) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
    data?: {
        email: string;
        display: string;
        bio: string;
        cropperData?: PhotoCropState
    },
    submitLabel: string;
};

const initStore = (data: any) => {
    return {
        inputs: {
            email: {
                value: data?.email ? data.email : '',
                label: "Email",
                type: "email"
            },
            password: {
                value: "",
                label: "Password",
                type: "password"
            },
            display: {
                value: data?.display ? data.display : '',
                label: "Display",
                type: "text"
            },
            bio: {
                value: data?.bio ? data.bio : '',
                label: "Bio",
                type: "text"
            }
        }
    }
}

const ProfileForm: React.FC<ProfileFormProps> = ({save, data, submitLabel}) => {
    const SET_INPUT = 'SET_INPUT';
    const UPDATE_UPLOADER = 'UPDATE_UPLOADER';
    const SET_ERROR = 'SET_ERROR';
    const SET_COMPLETED = 'SET_COMPLETED';
    const INIT_STORE = 'INIT_STORE';

    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard(theme);

    const reducer = (state: any, {type, payload}: {type: string, payload: any}) => {
        switch(type){
            case INIT_STORE:
                return payload;
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

    const updateUploader = (data: any) => {
        dispatch({
            type: UPDATE_UPLOADER,
            payload: data
        });
    }

    

    const [{inputs, uploader, error, completed}, dispatch] = useReducer(reducer, initStore(data));

    useEffect(() => {
        dispatch({
            type: INIT_STORE,
            payload: initStore(data)
        })
    }, [data]);


    const submit = () => {
        const {email, password, display, bio} = inputs;
        save({
            variables: {
                ...uploader,
                email: email.value,
                password: password.value,
                display: display.value,
                bio: bio.value
            }
        })
        .then(() => dispatch({
                type: SET_COMPLETED,
                payload: true
            }))
        .catch((error) => 
            dispatch({
                type: SET_ERROR,
                payload: errorParser(error)
            }));
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
            key: input,
            extraProps: {
                autoComplete: "new-password" 
            }
        }
    });

    if (completed) {
        return <Redirect to="/me"/>
    }

    return <>
        <Form inputs={formInputs} error={error}>
            <PhotoUploader initialState={data?.cropperData} updateState={updateUploader}/>
        </Form>
        <button onClick={submit} className={`${buttons.standard} ${standard.center}`}>{ submitLabel }</button>
    </>
};

export default ProfileForm;
