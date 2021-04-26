import { useMutation } from "@apollo/client";
import { ReactElement, useContext } from "react";
import { Redirect } from "react-router";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { LOGOUT } from "../queries/users";
import { ApiData } from "../types";
import Banner from "../widgets/Banner";
import Gallery from "../widgets/Gallery";

import Profile from "../widgets/Profile";


const MePage = () : ReactElement => {

    const {state, dispatch} = useContext(UserContext);

    const [clearCookies, result] = useMutation(LOGOUT);

    

    if (!state.user && state.loaded){
        return <Redirect to="/"/>;
    }

    if(!state.user){
        return <div>We are currenlty working on finding your info.</div>
    }

    const {user: {photos, display, slug, profile_url}} : {user: ApiData} = state;

    photos.sort((a, b) => b.views - a.views);

    const logout = () => {
        clearCookies().then(() => {
            dispatch({
                type: SET_USER,
                payload: null
            });
        });
    }

    

    return <>
        <Banner photo={photos[0]}>
            <Profile display={display} profileUrl={profile_url} slug={slug} size="300px" font="40px" color="white"/>
        </Banner>
        <button onClick={logout}>Log out!</button>
        <Gallery photos={photos} query={true}/>
    </>
}

export default MePage;