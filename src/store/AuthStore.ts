import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { AuthResponse } from '../models/response/AuthResponse'
import { IUser } from '../models/response/IUser'
import AuthService from '../services/AuthService'
import { Roles } from '../types/Roles'
import { RequestsResponse } from '../types/RequestsResponse'
import CarrierService from '../services/ShipperService'


class AuthStore {
    user = {} as IUser
    requests: RequestsResponse[] = []
    isAuth = false
    error = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setRequests(requests: RequestsResponse[]) {
        this.requests = requests
    }

    setUser(user: IUser) {
        this.user = user
    }

    setError(error: string) {
        this.error = error
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async registration(email: string, password: string, roles: Roles) {
        try {
            console.log(email, password, roles)
            const response = await AuthService.registration(email, password, roles)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                this.setError(error.response.data.message)
            }
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${process.env.API_URL}/refresh`, { withCredentials: true })
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
    }
}

export default new AuthStore()