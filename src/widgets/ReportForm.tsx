import { useMutation } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { useState } from "react";
import { CREATE_REPORT } from "../queries/reports";
import useButtons from "../styles/buttons";
import Form from "./Form"


const ReportForm = ({location, photo, review}: {location?: string, photo?: string, review?: string}) => {
    const [state, setState] = useState({
        message: "",
        error: "",
        success: false
    });

    const { message, error, success } = state;

    const theme = useTheme();
    const buttons = useButtons(theme)();

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
        }).catch(({message}) => {
            setState({
                ...state,
                error: message
            });
        });
    };

    if (success) {
        return <p>Successfully reported content.</p>;
    }

    return <>
        <h2>Report Content</h2>
        <p>All reported content will be reviewed before any action will be taken.</p>
        <Form 
            inputs={[
                {
                    label: 'Message',
                    type: 'textarea',
                    value: message,
                    dispatch: ({target: {value}}) => setState({...state, message: value})
                }
            ]}
            error={ error }
        >
            <button onClick={ submit } className={ buttons.standard } >Report</button>
        </Form>
    </>;
};

export default ReportForm;
