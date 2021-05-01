import { makeStyles } from "@material-ui/styles";
import { ReactElement, useReducer, useState } from "react";
import ReactCrop from "react-image-crop";
import Form, {FormInput} from "../widgets/Form";
    
const useStyles = makeStyles({
    cropper: {
        width: "min(80vw, 500px)"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const RegistrationPage = () : ReactElement => {
    const SET_INPUT = 'SET_INPUT';
    const reducer = (state: any, {type, payload}: {type: string, payload: any}) => {
        switch(type){
            case SET_INPUT:
                const {inputs} = state;
                inputs[payload[0]].value = payload[1];
                return {
                    ...state,
                    inputs
                }
            default:
                return {
                    ...state
                }
        }
    }

    const [crop, setCrop] = useState({ aspect: 1 } as any);
    const [src, setSrc] = useState({} as any);

    const inputsInit: FormInput[] = [
        {
            type: "text",
            label: "Email",
            value: "",
            dispatch: ({target}) => dispatch({
                type: SET_INPUT,
                payload: target.value
            })
        },
        {
            type: "password",
            label: "Password",
            value: "",
            dispatch: ({target}) => dispatch({
                type: SET_INPUT,
                payload: target.value
            })
        },
        {
            type: "text",
            label: "Display Name",
            value: "",
            dispatch: ({target}) => dispatch({
                type: SET_INPUT,
                payload: target.value
            })
        },
        {
            type: "text",
            label: "Bio",
            value: "",
            dispatch: ({target}) => dispatch({
                type: SET_INPUT,
                payload: target.value
            })
        }
    ]

    const classes = useStyles();

    const [{inputs}, dispatch] = useReducer(reducer, {
        inputs: inputsInit
    });

    const selectPhoto = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({target}) => {
            setSrc({
                ...src,
                url: target!.result!.toString(),
                file: file
            });
        }
    }
    

    return <>
        <h1>Register</h1>
        <Form inputs={inputs} error=""/>
        <label htmlFor="photoUpload">Select Photo:</label>
        <input type="file" id="photoUpload" onChange={({target}) => selectPhoto(target!.files![0])}></input>
        <label>Select thumbnail area:</label>
        <ReactCrop className={classes.cropper} src={src.url} crop={crop} onChange={(newCrop: any) => setCrop(newCrop)} minWidth={200} maxHeight={600}/>
        <button>Register!</button>
    </>
}

export default RegistrationPage;