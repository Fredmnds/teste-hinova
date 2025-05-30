export interface PhotoDetail {
    uri: string;
    dateTime: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface Photo {
    id?: string,
    uri: string,
    type?: string
}