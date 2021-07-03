import { useMutation, useQuery } from "@apollo/client";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useContext, useState  } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { SET_LOCATION } from "../helpers/Reducer";
import { UserContext } from "../helpers/UserContext";
import { GET_LOCATION } from "../queries/locations";
import { WRITE_REVIEW_MUTATION } from "../queries/reviews";
import useButtons from "../styles/buttons";
import useStandard from "../styles/standard";
import { LocationData, UserData } from "../types";
import Authenticated from "../widgets/Authenticated";
import Banner from "../widgets/Banner";
import CenteredLoading from "../widgets/CenteredLoading";
import Error from "../widgets/Error";
import Form from "../widgets/Form";
import Gallery from "../widgets/Gallery";
import IsMine from "../widgets/IsMine";
import Review from "../widgets/Review";
import LocationFormPage from "./LocationFormPage";

const useStyles = makeStyles({
    container: {
        margin: '20px auto',
        maxWidth: 500,
        '@media only screen and (max-width: 500px)': {
            margin: 20
        }
    }
});

const LocationPage = () : ReactElement => {
    const {slug} : {slug: string} = useParams();

    const context = useContext(UserContext);
    const theme = useTheme();
    const buttons = useButtons(theme)();
    const standard = useStandard(theme);


    const {error, loading, refetch} = useQuery(GET_LOCATION(slug), {
        onCompleted: (data) => {
            context.dispatch({
                type: SET_LOCATION,
                payload: data.location
            });
        },
        fetchPolicy: "network-only"
    });

    const classes = useStyles();

    const [inputState, setInputs] : [any, (state: any) => void] = useState(
        { 
            'score': {
                label: 'Score',
                type: 'number',
                value: 0 
            },
            'message': {
                label: 'Message',
                type: 'textarea',
                value: ''
            }
        }
    );

    const uploadData: any = {};

    for (let k in inputState) {
        uploadData[k] = inputState[k].value;
    }

    const [update, results] = useMutation(WRITE_REVIEW_MUTATION, {
        variables: {
            location: slug,
            ...uploadData
        }
    });

    const submitReview = () => {
        update().then(() => {
            refetch();
        });
    }

    const updateInputs = (key: string, value: any, number: boolean = false) => {
        inputState[key].value = number ? parseFloat(value) : value;
        setInputs({...inputState});
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

    const posted = reviews.filter(({user}) => user.slug === me.slug).length > 0;

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
        </Authenticated>
        <Gallery photos={mutablePhotos} query={true}/>
        <div className={classes.container}>
            <Authenticated>
                {
                    !posted && 
                    <>
                        <h3>Leave a review!</h3>
                        <Form 
                            inputs={
                                Object.keys(inputState).map(input => {
                                    return {
                                        ...inputState[input],
                                        dispatch: ({target: {value}}) => updateInputs(input, value, inputState[input].type === "number")
                                    }
                                })
                            }
                            error={""}
                        >   
                            <button onClick={submitReview}>Submit</button>
                        </Form>
                    </>
                }
            </Authenticated>
            <h3>Reviews</h3>
            {
                reviews.map((r, i) => <Review review={r} location={slug} key={i}/>)
            }
        </div>
    </>
}

export default LocationPage;