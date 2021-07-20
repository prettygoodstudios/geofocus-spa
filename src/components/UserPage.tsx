import { useMutation, useQuery } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { ReactElement, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SET_USER } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { GET_USER, LOGOUT } from "../queries/users";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import { ApiData } from "../types";
import Banner from "../widgets/Banner";
import CenteredLoading from "../widgets/CenteredLoading";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import IsAdmin from "../widgets/IsAdmin";
import IsMine from "../widgets/IsMine";

import Profile from "../widgets/Profile";



const UserPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();
    const {error, loading, data, refetch} = useQuery(GET_USER(slug), {
        fetchPolicy: "network-only"
    });
    const {state, dispatch} = useContext(UserContext);
    const [clearCookies, result] = useMutation(LOGOUT);
    const logout = () => {
        clearCookies().then(() => {
            dispatch({
                type: SET_USER,
                payload: null
            });
        });
    }
    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard();


    if (error){
        return <Error/>
    }

    if (loading){
        return <CenteredLoading/>
    }

    const {user: {photos, display, profile_url, width, height, zoom, offsetX, offsetY}} : {user: ApiData} = data;

    const processedPhotos = photos ?  [...photos] : [];
    const photo = photos ? processedPhotos[0] : null; 

    processedPhotos.sort((a, b) => b.views - a.views);

    return <>
        <Banner photo={photo}>
            <Profile display={display} profileUrl={profile_url} slug={slug} size={300} font="40px" color="white" width={width} height={height} zoom={zoom} offsetX={offsetX} offsetY={offsetY}/>
        </Banner>
        <IsMine ownerSlug={slug}>
            <button onClick={logout} className={`${buttons.standard} ${standard.standardMargin}`}>Log out!</button>
        </IsMine>
        <IsAdmin>
            <Link to="/admin" className={`${buttons.standard} ${standard.standardMargin}`}>Admin</Link>
        </IsAdmin>
        <Gallery photos={processedPhotos} query={true} refetch={refetch}/>
    </>
}

export default UserPage;