import { useMutation, useQuery } from "@apollo/client";
import { useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DELETE_REPORT, GET_REPORTS } from "../queries/reports";
import useButtons from "../styles/buttons";
import { PhotoData } from "../types";
import Error from "../widgets/Error";
import Loading from "../widgets/Loading";

type Report = {
    location: Location, 
    photo: PhotoData, 
    review: {
        slug: string, 
        message: string,
        location: Location
    }, 
    message: string,
    id: number
}

export const Admin = () => {
    
    const {error, loading, data, refetch} = useQuery(GET_REPORTS);

    const [deleteReport] = useMutation(DELETE_REPORT);

    const theme = useTheme();
    const buttons = useButtons(theme)();

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Error/>;
    }

    const linkFactory = ({location, review, photo}: any) => {
        if (location) {
            return <Link to={`/location/${location.slug}`}>View Location: {location.title.slice(0, 10)}</Link>;
        }
        if (review) {
            return <Link to={`/location/${review.location.slug}`}>View Review: {review.message.slice(0, 10)}</Link>;
        }
        if (photo) {
            return <Link to={`/photo/${photo.slug}`}>View Photo: {photo.caption.slice(0, 10)}</Link>;
        }
    };

    return <>
        <h1>Admin</h1>
        <h2>Reports</h2>
        <ul>
            {
                data && data.reports.map(({location, photo, review, message, id}: Report, i: number) => (
                    <li key={i}>
                        {linkFactory({location, photo, review})} 
                        <button onClick={() => (deleteReport({variables: { id }}) && refetch()) } className={ buttons.standard }>Dismiss</button>
                        <p>{ message }</p>
                    </li>
                ))
            }
        </ul>
    </>;
}

export default Admin;