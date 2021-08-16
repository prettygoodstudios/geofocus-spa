import { makeStyles } from "@material-ui/styles";
import { ReactElement, useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import { GALLERY_IMG_SIZE } from "./Gallery";
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

export interface PhotoCropState {
    url: string;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    zoom: number;
};

const generateInitialState = (state?: PhotoCropState): any => {
    if (!state) {
        return {}
    }
    const {width, offsetX, offsetY, zoom} = state as PhotoCropState;
    // zoom = GALLERY_IMG_SIZE/( ( width / cropperDOMWidth ) * cropperSelectionSize )
    // zoom * ( width / cropperDOMWidth ) * cropperSelectionSize = GALLERY_IMG_SIZE
    // cropperSelectionSize = GALLERY_IMG_SIZE / ( zoom * ( width / cropperDOMWidth ))
    const cropper: HTMLElement = document.querySelector(".ReactCrop")!;
    const size =  GALLERY_IMG_SIZE / ( zoom * ( width / cropper.clientWidth ) );

    const factor = (width/cropper.clientWidth);

    // offsetX = -crop.x * factor * zoom
    // - offsetX / (factor * zoom) = crop.x

    return {
        width: size,
        height: size,
        x: - offsetX / (factor * zoom),
        y: - offsetY / (factor * zoom),
        unit: "px",
        aspect: 1
    };
};

const PhotoUploader = ({updateState, initialState} : {updateState:  (data: any) => void, initialState?: PhotoCropState}): ReactElement => {

    const [crop, setCrop] = useState({ 
        aspect: 1
    } as any);
    const [src, setSrc] = useState((initialState ? { url: initialState.url } : {}) as any);

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
        const zoom = (GALLERY_IMG_SIZE/(crop.width*factor));
        updateState({
            file: src.file,
            width: cropper.naturalWidth,
            height: cropper.naturalHeight,
            offsetX: -crop.x*factor*zoom,
            offsetY: -crop.y*factor*zoom,
            zoom: zoom
        });
    }

    useEffect(() => {
        updateCrop(generateInitialState(initialState));
    }, []);

    return <div className={classes.container}>
        <label htmlFor="photoUpload">Select Photo:</label>
        <input type="file" id="photoUpload" onChange={({target}) => selectPhoto(target!.files![0])}></input>
        <label>Select thumbnail area:</label> 
        <ReactCrop className={classes.cropper} src={src.url} crop={crop} onChange={updateCrop} minWidth={200} maxHeight={600}/>
    </div>
}

export default PhotoUploader;