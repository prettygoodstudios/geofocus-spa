import { useMutation } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { useState } from "react";
import errorParser from "../helpers/errorParser";
import { CREATE_REPORT } from "../queries/reports";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import Form from "./Form"


const ReportForm = ({location, photo, review, cancel, cancelClass}: {location?: string, photo?: string, review?: string, cancel: () => void, cancelClass?: string}) => {
    const [state, setState] = useState({
        message: "",
        error: {
            message: '',
            fields: {}
        },
        success: false
    });

    const { message, error, success } = state;

    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard(theme);

    const [dispatch] = useMutation(CREATE_REPORT, {
        variables: {
            message,
            location,
            photo,
            review
        }
    });

    const submit = () => {
        dispatch().then(() => {
            setState({
                ...state,
                success: true
            });
        }).catch((error) => {
            setState({
                ...state,
                error: errorParser(error)
            });
        });
    };

    if (success) {
        return <p>Successfully reported content.</p>;
    }

    return <>
        <a onClick={ cancel } className={ cancelClass }>Cancel</a>
        <h2 className={ standard.center }>Report Content</h2>
        <p className={ standard.center }>All reported content will be reviewed before any action will be taken.</p>
        <Form 
            inputs={[
                {
                    label: 'Message',
                    type: 'textarea',
                    value: message,
                    dispatch: ({target: {value}}) => setState({...state, message: value}),
                    key: 'message'
                }
            ]}
            error={ error }
        />
        <button onClick={ submit } className={ `${buttons.standard} ${standard.center}`} >Report</button>
    </>;
};

export default ReportForm;
