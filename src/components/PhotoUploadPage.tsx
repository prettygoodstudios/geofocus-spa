import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import { Redirect, useParams } from "react-router";
import { UPLOAD_PHOTO } from "../queries/photo";

const useStyles = makeStyles({
    cropper: {
        width: "min(80vw, 500px)"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});

const PhotoUploadPage = (): ReactElement => {
    const [crop, setCrop] = useState({ aspect: 1, minWidth: 400, maxWidth: 400 } as any);
    const [src, setSrc] = useState({} as any);

    const {slug}: {slug: string} = useParams();

    const classes = useStyles();

    const [upload] = useMutation(UPLOAD_PHOTO, {
        onCompleted: ({upload}) => {
            setSrc({
                ...src,
                uploaded: upload.slug
            });
        },
        onError: ({message}) => {
            setSrc({
                ...src,
                error: message
            });
        }
    });

    
 
    const selectPhoto = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({target}) => {
            const img = new Image()
            img.onload = () => {
                setSrc({
                    ...src,
                    url: target!.result!.toString(),
                    file: file,
                    width: img.width,
                    height: img.height
                });
            }
            img.src = target!.result!.toString();
        }
    }

    const uploadFile = () => {
        upload({
            variables: {
                ...src,
                offsetX: -crop.x,
                offsetY: -crop.y,
                location: slug,
                zoom: 1 
            }
        });
    }

    if (src.uploaded) { 
        return <Redirect to={`/photo/${src.uploaded}`}/>
    }
    

    return <div className={classes.container}>
        <h2>Photo Upload</h2>
        <label htmlFor="photoUpload">Select Photo:</label>
        <input type="file" id="photoUpload" onChange={({target}) => selectPhoto(target!.files![0])}></input>
        <label>Select thumbnail area:</label>
        <ReactCrop className={classes.cropper} src={src.url} crop={crop} onChange={(newCrop: any) => setCrop(newCrop)} minWidth={200} minHeight={200} />
        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption" onChange={({target}) => setSrc({
            ...src,
            caption: target.value
        })}></input>
        <button onClick={uploadFile}>Upload!</button>
        {src.error && <p>{src.error}</p>}
    </div>
}

export default PhotoUploadPage;