import { makeStyles } from "@material-ui/styles";
import { ChangeEventHandler, ReactChild, ReactChildren, ReactElement } from "react";

export type FormInput = {
    label: string,
    type: string,
    value: string,
    dispatch: ChangeEventHandler<HTMLInputElement>
}

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const Form = ({error, inputs, children}: {error: string|undefined, inputs: FormInput[], children?: ReactChildren|ReactChild}): ReactElement => {
    
    const classes = useStyles();

    return <div className={classes.form}>
        {
            inputs.map((input, i) => {
                const {label, type, value, dispatch} = input;
                return <>
                    <label htmlFor={`${label}_${i}`}>{label}</label>
                    <input id={`${label}_${i}`} type={type} value={value} onChange={dispatch}></input>
                </>
            })
        }
        {children}
        {error && <p>{error}</p>}
    </div>
}

export default Form;