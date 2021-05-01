import { makeStyles } from "@material-ui/styles";
import { ReactElement, useState } from "react";
import ReactCrop from "react-image-crop";
import { GALLER_IMG_SIZE } from "./Gallery";

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

const PhotoUploader = ({updateState} : {updateState:  (data: any) => void}): ReactElement => {

    const [crop, setCrop] = useState({ aspect: 1 } as any);
    const [src, setSrc] = useState({} as any);

    const classes = useStyles();


    
 
    const selectPhoto = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({target}) => {
            const newSrc = {
                url: target!.result!.toString(),
                file
            }
            setSrc(newSrc);
            updateState({
                file
            });
        }
    }

    const updateCrop = (data: any) => {
        setCrop(data);
        const cropper: HTMLImageElement = document.querySelector(".ReactCrop__image")!;
        const factor = (cropper.naturalWidth/cropper.width);
        const zoom = (GALLER_IMG_SIZE/(crop.width*factor));
        updateState({
            file: src.file,
            width: cropper.naturalWidth,
            height: cropper.naturalHeight,
            offsetX: -crop.x*factor*zoom,
            offsetY: -crop.y*factor*zoom,
            zoom: zoom
        });
    }

    return <div className={classes.container}>
        <label htmlFor="photoUpload">Select Photo:</label>
        <input type="file" id="photoUpload" onChange={({target}) => selectPhoto(target!.files![0])}></input>
        <label>Select thumbnail area:</label>
        <ReactCrop className={classes.cropper} src={src.url} crop={crop} onChange={updateCrop} minWidth={200} maxHeight={600}/>
    </div>
}

export default PhotoUploader;