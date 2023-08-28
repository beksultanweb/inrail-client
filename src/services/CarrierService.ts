import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'

export default class CarrierService {
    static async getRequests(): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>('/requests')
    }
    static async setPrice(userId: string, requestId: string, price: string): Promise<AxiosResponse> {
        return $api.post('/setprice', { userId, requestId, price })
    }
    static async getMyPrices(userId: string): Promise<AxiosResponse> {
        return $api.get(`/myprices/${userId}`)
    }
}