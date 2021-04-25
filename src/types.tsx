export type UserData = {
    display: string,
    profileUrl: string
}

export type PhotoData = {
    caption: string,
    url: string,
    width: number,
    height: number,
    zoom: number,
    offsetX: number,
    offsetY: number,
    views: number,
    user: UserData
}

export type ApiData = {
    display: string,
    profile_url: string,
    photos: PhotoData[]
}