import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'

export default class CarrierService {
    static async getRequests(): Promise<AxiosResponse<RequestsResponse[]>> {
        return $api.get<RequestsResponse[]>('/requests')
    }
}