import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'
import { Values } from '../types/Values'
import { Carrier } from '../types/Carrier'

export default class ShipperService {
    static async createRequest(values: Values): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>('/requests', { values })
    }
    static async getRequests(userId: string): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>(`/requests/${userId}`)
    }
    static async getPrices(requestId: string): Promise<AxiosResponse<Carrier[]>> {
        return $api.get<Carrier[]>(`/getprices/${requestId}`)
    }
    static async setChooseCarrier(requestId: string, price: string, userId: string): Promise<AxiosResponse> {
        return $api.post('/choosecarrier', {requestId, price, userId})
    }
}