import { AxiosResponse } from 'axios'
import $api from '../http'
import { AuthResponse } from '../models/response/AuthResponse'
import { Roles } from '../types/Roles'

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password })
    }

    static async registration(email: string, password: string, roles: Roles): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password, roles })
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}