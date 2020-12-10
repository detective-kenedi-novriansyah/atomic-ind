import axios, { AxiosResponse } from 'axios'
import { User, UserGetters, UserMutations, UserState } from '../types/interface'

const state: UserState = {
    user: {
        id: 0,
        username: '',
        email: '',
        create_at: Date(),
        update_at: Date(),
        password: '',
        confirm_password: ''
    },
    allUser: [],
    token: '',
}

const actions = {
    async recordUser({commit}: any, data: User) {
        const response = await axios.post('api/v1/auth/create', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Content-Type'
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        })
        return response
    },
    async loginUser({commit}: any, data: User) {
        const response = await axios.post('api/v1/auth/login', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Content-Type'
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        })
        return response
    },
    async me({commit}: any, data: User) {
        const response = await axios.post('api/v1/auth/me', {}, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Content-Type',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxContentLength: 2000,
            maxRedirects: 5,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse) => {
            commit('LOAD_USER_DETAIL', res.data)
        }).catch((err) => {
            localStorage.clear()
            window.location.reload()
        })
        return response
    },
}

const mutations: UserMutations = {
    ACCESS_USER: (user: UserState| any, data: string) => {
        if(data) {
            localStorage.setItem('token', data)
        }
        if(localStorage.getItem('token')) {
            user.token = localStorage.getItem('token')
        }
        return;
    },
    LOAD_USER_DETAIL: (user: UserState | any, data: User) => (user.user = data)
}

const getters: UserGetters = {
    authenticate: (user: UserState) => user.token,
    userDetail: (user: UserState) => user.user
}

export default {
    state,
    actions,
    mutations,
    getters
}