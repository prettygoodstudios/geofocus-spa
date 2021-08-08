import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ReactElement, useMemo, useState } from "react";
import {Link} from "react-router-dom";
import LazyLoad from "react-lazyload";

import useButtons from "../styles/buttons";

import { PhotoData } from "../types";


import Profile from "./Profile";
import Loading from "./Loading";
import useInputs from "../styles/inputs";
import IsMine from "./IsMine";
import { useMutation } from "@apollo/client";
import { DELETE_PHOTO } from "../queries/photo";
import Authenticated from "./Authenticated";
import ReportForm from "./ReportForm";

export const GALLERY_IMG_SIZE = 400;

const styles = makeStyles((theme) => ({
    feedBody: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "calc(100vw - 40px)"
    },
    feedImg: {
        width: "30vw"
    },
    feedImgWrapper: {
        width: GALLERY_IMG_SIZE,
        height: GALLERY_IMG_SIZE,
        overflow: "hidden",
        borderRadius: 20
    },
    card: {
        width: GALLERY_IMG_SIZE,
        marginBottom: '20px',
        pageBreakInside: 'avoid',
        pageBreakAfter: 'auto'
    },
    search: {
        width: "80vw",
        fontSize: "20px",
        borderRadius: "30px !important",
        borderWidth: "2px !important",
        margin: "20px 0px"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    detailWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    links: {
        float: 'right',
        color: theme.palette.primary.main,
        margin: 20,
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const Gallery = ({photos, refetch, query = false}: {photos: PhotoData[], query?: boolean, refetch: () => void}) : ReactElement => {

    const [queryTerm, setQuery] = useState("");
    const [reportSlug, setReportSlug] = useState("");

    const theme = useTheme();
    const classes = styles(theme);

    const buttons = useButtons(theme)();
    const inputs = useInputs(theme);

    const [deletePhoto] = useMutation(DELETE_PHOTO);

    const filteredPhotos = useMemo(() => {
        let filteredPhotos = photos ? photos : [];

        if (queryTerm !== "") {
            filteredPhotos = filteredPhotos.filter((p : PhotoData) => {
                const {slug, location: {title, state, city}, caption} = p;
                const search = [slug, title, state, city, caption];
                let retVal = false;
                search.forEach(s => {
                    if(s && s.toLowerCase().indexOf(queryTerm.toLowerCase()) != -1) {
                        retVal = true;
                    }
                });
                return retVal;
            })
        }
        return filteredPhotos;
    }, [photos, queryTerm]);

    return  <div className={classes.container}>
        {query && photos.length > 0 && <input type="text" placeholder="Search..." value={queryTerm} onChange={({target}) => setQuery(target.value)} className={`${classes.search} ${inputs.pill}`}></input>}
        <div className={classes.feedBody}>
            {filteredPhotos.map(({caption, url, zoom, width, height, offsetX, offsetY, views, user, slug, location}: PhotoData, id: number) => {
                return (
                <div key={id} className={classes.card}>
                    <LazyLoad height={400} placeholder={<Loading size={360}/>} offset={300}>
                        <div className={classes.feedImgWrapper}>
                            <img src={url} className={classes.feedImg} style={{
                                width: width*zoom,
                                height: height*zoom,
                                marginLeft: offsetX,
                                marginTop: offsetY
                            }}/>
                        </div>
                    </LazyLoad>
                    <div className={classes.detailWrapper}>
                        <Profile display={user.display} spacing={ 3 } profileUrl={user.profile_url} slug={user.slug} size={20} font="1em" width={user.width} height={user.height} zoom={user.zoom} offsetX={user.offsetX} offsetY={user.offsetY}/>
                        <span style={{marginLeft: 5}}><Link to={`/location/${location.slug}`}>{location.title}</Link> - {views} views - {caption}</span>
                    </div>
                    <Link to={`/photo/${slug}`} className={buttons.standard}>View</Link>
                    <IsMine ownerSlug={user.slug}>
                        <a className={classes.links} onClick={() => {
                            deletePhoto({
                                variables: {
                                    slug
                                }
                            }).then(() => {
                                refetch();
                            });
                        }}>Delete</a>
                    </IsMine>
                    <Authenticated>
                        {
                            slug === reportSlug ?
                                <ReportForm 
                                    cancelClass={classes.links}
                                    cancel={() => setReportSlug('')}
                                    photo={ slug }
                                />
                            :
                                <a className={classes.links} onClick={() => setReportSlug(slug)}>
                                    Report
                                </a>
                        }
                    </Authenticated>
                </div>
                )
            })}
            {
                filteredPhotos.length === 0 && <h2>Sorry there are no photos available.</h2>
            }
        </div>
    </div>
}

export default Gallery;