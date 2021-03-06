import { makeStyles } from "@material-ui/styles";
import { ChangeEventHandler, Fragment, ReactChild, ReactChildren, ReactElement } from "react";
import { toTitleCase } from "../helpers/titleCase";
import Loading from "./Loading";

export type FormInput = {
    label: string,
    type: string,
    value: string,
    dispatch: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>,
    extraProps?: {
        min?: number,
        max?: number,
        inputClassName?: string,
        autoComplete?: string
    },
    key: string
}

type FormError = {
    message: string;
    fields?: {
        [key: string]: string
    }
}

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const inputFactory = ({type, label, value, dispatch, extraProps = {}}: FormInput, i: number) => {
    switch(type){
        case "textarea":
            return <textarea id={`${label}_${i}`} value={value} onChange={dispatch} className={ extraProps.inputClassName }></textarea>;
        default:
            return <input id={`${label}_${i}`} type={type} value={value} onChange={dispatch} {...extraProps} className={ extraProps.inputClassName }></input>;
    }
}

const Form: React.FC<{error: undefined|FormError, inputs: FormInput[], loading?: boolean}> = ({error, inputs, children, loading}): ReactElement => {
    if (loading) {
        return <Loading/>;
    }
    const classes = useStyles();
    return (
        <div className={classes.form}>
            {
                inputs.map((input, i) => {
                    const {label, key} = input;
                    return <Fragment key={i}>
                        <label htmlFor={`${label}_${i}`}>{label}</label>
                        { inputFactory(input, i) }
                        { error?.fields && error.fields[key] && error.fields[key].replace(key, toTitleCase(key)) }
                    </Fragment>
                })
            }
            {children}
            {error && <p>{error.message}</p>}
        </div>
    );
}

export default Form;