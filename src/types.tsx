export type UserData = {
    display: string,
    profile_url: string,
    slug: string
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
    photos: PhotoData[]
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
}