import { makeStyles } from "@material-ui/styles";
import { ChangeEventHandler, Fragment, ReactChild, ReactChildren, ReactElement } from "react";

export type FormInput = {
    label: string,
    type: string,
    value: string,
    dispatch: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement>,
    extraProps?: {
        min?: number,
        max?: number
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
            return <textarea id={`${label}_${i}`} value={value} onChange={dispatch}></textarea>;
        default:
            return <input id={`${label}_${i}`} type={type} value={value} onChange={dispatch} {...extraProps}></input>;
    }
}

const Form = ({error, inputs, children}: {error: string|undefined, inputs: FormInput[], children?: ReactChildren|ReactChild|ReactChildren[]}): ReactElement => {
    
    const classes = useStyles();

    return <div className={classes.form}>
        {
            inputs.map((input, i) => {
                const {label, type, value, dispatch} = input;
                return <Fragment key={i}>
                    <label htmlFor={`${label}_${i}`}>{label}</label>
                    { inputFactory(input, i) }
                </Fragment>
            })
        }
        {children}
        {error && <p>{error}</p>}
    </div>
}

export default Form;