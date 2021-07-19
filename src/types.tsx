export type UserData = {
    display: string,
    profile_url: string,
    slug: string,
    width: number,
    height: number,
    zoom: number,
    offsetX: number,
    offsetY: number
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
    user: UserData,
    slug: string,
    location: LocationData
}

export type ApiData = {
    display: string,
    profile_url: string,
    slug: string,
    photos: PhotoData[],
    width: number,
    height: number,
    zoom: number,
    offsetX: number,
    offsetY: number
}

export type ReviewData = {
    score: number,
    message: string,
    user: UserData,
    slug: string
}

export type LocationData = {
    title: string,
    address: string,
    state: string,
    city: string,
    latitude: number,
    longitude: number,
    photos: PhotoData[],
    slug: string,
    user: UserData,
    country: string
    editing?: boolean
    reviews: ReviewData[]
}