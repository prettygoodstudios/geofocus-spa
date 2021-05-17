import { useMutation } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {ReactElement, useContext, useReducer } from "react";
import { Redirect} from "react-router";
import { Link } from "react-router-dom";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { LOGIN } from "../queries/users";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import Form, {FormInput} from "../widgets/Form";

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
})

const LoginPage = (): ReactElement => {

    const SET_EMAIL = "SET_EMAIL";
    const SET_PASSWORD = "SET_PASSWORD";
    const SET_ERROR = "SET_ERROR";

    const [login, result] = useMutation(LOGIN);
    const {data} = result;

    const classes = useStyles();

    const context = useContext(UserContext);
    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard(theme);
    

    const reducer = (state: any, {type, payload}: {type: string, payload: any}) : any => {
        switch(type){
            case SET_EMAIL:
                return {
                    ...state,
                    email: payload
                }
            case SET_PASSWORD:
                return {
                    ...state,
                    password: payload
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
        email: "",
        password: "",
        error: ""
    } as never);

    const submit = () => {
        login({
            variables: {
                email,
                password
            }
        }).then(({data}) => { 
            if(data?.login) {
                context.dispatch({
                    type: SET_USER,
                    payload: data.login
                });
            }
        }).catch(({message}) => {
            dispatch({
                type: SET_ERROR,
                payload: message
            })
        });
    }

    if (context.state.user) {
        return <Redirect to={`/user/${context.state.user.slug}`}/>;
    }

    const {email, password, error} = state;

    const inputs: FormInput[] = [
        {
            label: "Email",
            type: "email",
            value: email,
            dispatch: ({target: {value}}) => dispatch({
                type: SET_EMAIL,
                payload: value
            })
        },
        {
            label: "Password",
            type: "password",
            value: password,
            dispatch: ({target: {value}}) => dispatch({
                type: SET_PASSWORD,
                payload: value
            })
        }
    ];

    return <div className={classes.form}>
        <h2>Login</h2>
        <Form inputs={inputs} error={error}/>
        <button onClick={() => submit()} className={`${buttons.standard} ${standard.standardMargin}`}>Login</button>
        <Link to="/register">Don't have an account? Click here!</Link>
    </div>
}

export default LoginPage;