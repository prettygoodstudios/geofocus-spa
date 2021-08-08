import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import { Redirect, useParams } from "react-router";
import { UPLOAD_PHOTO } from "../queries/photo";
import CenteredLoading from "../widgets/CenteredLoading";
import PhotoUploader from "../widgets/PhotoUploader";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const PhotoUploadPage = (): ReactElement => {
    const [state, setState] = useState({
        caption: "",
        uploaded: false,
        loading: false
    } as any);

    const {slug}: {slug: string} = useParams();

    const classes = useStyles();

    const [upload] = useMutation(UPLOAD_PHOTO, {
        onCompleted: ({upload}) => {
            setState({
                ...state,
                uploaded: upload.slug,
                loading: false
            });
        },
        onError: ({message}) => {
            setState({
                ...state,
                error: message,
                loading: false
            });
        }
    });

    const updateUploader = (data: any) => {
        setState({
            ...state,
            uploader: data
        });
    }

    const {uploader, error, caption, uploaded, loading} = state;

    const uploadFile = () => {
        setState({
            ...state,
            loading: true
        });
        upload({
            variables: {
                ...uploader,
                caption: caption,
                location: slug
            }
        }).then(({data: { upload }}) => {
            setState({
                ...state,
                uploaded: upload.slug,
                loading: false
            });
        });
    }

    if (uploaded) { 
        return <Redirect to={`/photo/${uploaded}`}/>;
    }

    if (loading) {
        return <CenteredLoading />;
    }
    

    return <div className={classes.container}>
        <h2>Photo Upload</h2>
        <PhotoUploader updateState={updateUploader}/>
        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption" onChange={({target: {value}}) => setState({
            ...state,
            caption: value
        })} value={caption}></input>
        <button onClick={uploadFile}>Upload!</button>
        {error && <p>{error}</p>}
    </div>
}

export default PhotoUploadPage;