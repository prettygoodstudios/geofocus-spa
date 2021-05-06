import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import { Redirect, useParams } from "react-router";
import { UPLOAD_PHOTO } from "../queries/photo";
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
        uploaded: false
    } as any);

    const {slug}: {slug: string} = useParams();

    const classes = useStyles();

    const [upload] = useMutation(UPLOAD_PHOTO, {
        onCompleted: ({upload}) => {
            setTimeout(() => {
                setState({
                    ...state,
                    uploaded: upload.slug
                });
            }, 500);
        },
        onError: ({message}) => {
            setState({
                ...state,
                error: message
            });
        }
    });

    const updateUploader = (data: any) => {
        setState({
            ...state,
            uploader: data
        })
    }

    const {uploader, error, caption, uploaded} = state;

    const uploadFile = () => {
        upload({
            variables: {
                ...uploader,
                caption: caption,
                location: slug
            }
        });
    }

    if (uploaded) { 
        return <Redirect to={`/photo/${uploaded}`}/>
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