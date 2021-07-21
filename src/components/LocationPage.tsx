import { useQuery } from "@apollo/client";
import { useTheme } from "@material-ui/core/styles";
import { ReactElement, useContext, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SET_LOCATION } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { GET_LOCATION } from "../queries/locations";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import { LocationData, UserData } from "../types";
import Authenticated from "../widgets/Authenticated";
import Banner from "../widgets/Banner";
import CenteredLoading from "../widgets/CenteredLoading";
import Error from "../widgets/Error";
import Gallery from "../widgets/Gallery";
import IsMine from "../widgets/IsMine";
import ReportForm from "../widgets/ReportForm";
import ReviewSection from "../widgets/ReviewSection";
import LocationFormPage from "./LocationFormPage";

const LocationPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();

    const context = useContext(UserContext);
    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard(theme);

    const [reporting, setReporting] = useState(false);

    const {error, loading, refetch} = useQuery(GET_LOCATION(slug), {
        onCompleted: (data) => {
            context.dispatch({
                type: SET_LOCATION,
                payload: data.location
            });
        },
        fetchPolicy: "network-only"
    });

    const refetchData = () => {
        refetch().then(({data: {location}}) => {
            context.dispatch({
                type: SET_LOCATION,
                payload: location
            });
        });
    };

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <CenteredLoading/>
    }

    const {location, user: me} : {location: LocationData, user: UserData} = context.state;

    const setEditing = (state: boolean, location: LocationData) => {
        context.dispatch({
            type: SET_LOCATION,
            payload: {
                ...location,
                editing: state
            }
        })
    }

    if (!location) {
        return <CenteredLoading/>
    }

    const {title, address, city, state, photos, country, editing, reviews} = location;

    const mutablePhotos = [...photos];
    mutablePhotos.sort((a, b) => b.views - a.views);


    return <>
        <Banner title={title} photo={photos[0]}/>
        <p className={standard.standardMargin}>{address}, {city}, {state}, {country}</p>
        <Authenticated>
            <Link to={`/photo/upload/new/${location.slug}`} className={`${buttons.standard} ${standard.standardMargin}`}>Add Photo</Link>
            <IsMine ownerSlug={location.user?.slug}>
                <a onClick={() => setEditing(!editing, location)} className={`${buttons.standard} ${standard.standardMargin}`}>{ editing ? "Cancel" : "Edit"}</a>
                { editing && <LocationFormPage create={false}/> }
            </IsMine>
            {
                reporting ?
                    <ReportForm
                        cancel={() => setReporting(false)}
                        location={ slug }
                    />
                : <a onClick={() => setReporting(true)}>Report</a>
            }
        </Authenticated>
        <Gallery photos={mutablePhotos} query={true} refetch={refetchData}/>
        <ReviewSection reviews={reviews} location={slug} me={me?.slug} refetch={refetchData}/>
    </>
}

export default LocationPage;