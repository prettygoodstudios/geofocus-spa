import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

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
    const [crop, setCrop] = useState({ aspect: 1 });
    const [src, setSrc] = useState("");

    const classes = useStyles();

    const selectPhoto = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({target}) => {
            setSrc(target!.result!.toString());
        }
    }

    return <div className={classes.container}>
        <h2>Photo Upload</h2>
        <label htmlFor="photoUpload">Select Photo:</label>
        <input type="file" id="photoUpload" onChange={({target}) => selectPhoto(target!.files![0])}></input>
        <label>Select thumbnail area:</label>
        <ReactCrop className={classes.cropper} src={src} crop={crop} onChange={(newCrop: any) => setCrop(newCrop)} minWidth={200} minHeight={200} />
        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption"></input>
    </div>
}

export default PhotoUploadPage;