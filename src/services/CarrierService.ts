import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'
import { Values } from '../types/Values'
import { CarrierInfo } from '../types/CarrierInfo'

export default class CarrierService {
    static async createRequest(values: Values): Promise<AxiosResponse<RequestsResponse>> {
        return $api.post<RequestsResponse>('/requests', { values })
    }
    static async getRequests(userId: number): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>(`/requests/${userId}`)
    }
    static async setCarrierInfo(formData: FormData): Promise<AxiosResponse> {
        return $api.post('/carrier-info', formData)
    }
    static async getCarrierLogo(userId: number): Promise<AxiosResponse> {
        return $api.get(`/getmylogo/${userId}`)
    }
    static async getCarrierInfo(userId: number): Promise<AxiosResponse> {
        return $api.get(`/getmyinfo/${userId}`)
    }
}