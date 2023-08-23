import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'
import { Values } from '../types/Values'

export default class ShipperService {
    static async createRequest(values: Values): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>('/requests', { values })
    }
    static async getRequests(userId: number): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>(`/requests/${userId}`)
    }
}