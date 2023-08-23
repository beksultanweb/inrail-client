import { AxiosResponse } from 'axios'
import $api from '../http'
import { RequestsResponse } from '../types/RequestsResponse'
import { Values } from '../types/Values'

export default class UserService {
    static async setUserInfo(formData: FormData): Promise<AxiosResponse> {
        return $api.post('/User-info', formData)
    }
    static async getUserLogo(userId: number): Promise<AxiosResponse> {
        return $api.get(`/getmylogo/${userId}`, {responseType: 'blob'})
    }
    static async getUserInfo(userId: number): Promise<AxiosResponse> {
        return $api.get(`/getmyinfo/${userId}`)
    }
}