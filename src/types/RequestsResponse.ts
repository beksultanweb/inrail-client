export interface RequestsResponse {
    _id: string
    counter: number
    user: string
    departure: string,
    destination: string,
    date: string,
    weight: number,
    capacity: number,
    wagon_numbers: number,
    cargo_type: string,
    wagon_type: string,
    carrier?: string,
    price?: string
}

