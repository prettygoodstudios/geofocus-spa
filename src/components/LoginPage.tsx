import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import {ReactElement, useContext, useReducer } from "react";
import { Redirect } from "react-router";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { LOGIN } from "../queries/users";

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

    const [login, result] = useMutation(LOGIN);
    const {data} = result;

    const classes = useStyles();

    const context = useContext(UserContext);
    

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
        });
    }

    if (context.state.user) {
        return <Redirect to={`/user/${context.state.user.slug}`}/>;
    }

    const {email, password, error} = state;

    return <div className={classes.form}>
        <input type="placeholder" placeholder="Email" value={email} onChange={({target: {value}}) => dispatch({
            type: SET_EMAIL,
            payload: value
        })}/>
        <input type="password" placeholder="Password" value={password} onChange={({target: {value}}) => dispatch({
            type: SET_PASSWORD,
            payload: value
        })}/>
        <button onClick={() => submit()}>Login</button>
        {result.error && <p>Incorrect credentials provided.</p>}
    </div>
}

export default LoginPage;