import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import 'react-image-crop/lib/ReactCrop.scss';
import { Redirect, useParams } from "react-router";
import { UPLOAD_PHOTO } from "../queries/photo";
import { GALLER_IMG_SIZE } from "../widgets/Gallery";
import PhotoUploader from "../widgets/PhotoUploader";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const PhotoUploadPage = (): ReactElement => {
    const [state, setState] = useState({} as any);

    const {slug}: {slug: string} = useParams();

    const classes = useStyles();

    const [upload] = useMutation(UPLOAD_PHOTO, {
        onCompleted: ({upload}) => {
            setState({
                ...state,
                uploaded: upload.slug
            });
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
        const cropper: HTMLImageElement = document.querySelector(".ReactCrop__image")!;
        const factor = (cropper.naturalWidth/cropper.width);
        

        const zoom = (GALLER_IMG_SIZE/(uploader.width*factor));
        upload({
            variables: {
                file: uploader.file,
                caption: caption,
                width: cropper.naturalWidth,
                height: cropper.naturalHeight,
                offsetX: -uploader.x*factor*zoom,
                offsetY: -uploader.y*factor*zoom,
                location: slug,
                zoom: zoom
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
        <input type="text" id="caption" onChange={({target}) => setState({
            ...state,
            caption: target.value
        })} value={caption}></input>
        <button onClick={uploadFile}>Upload!</button>
        {error && <p>{error}</p>}
    </div>
}

export default PhotoUploadPage;