import axios, { AxiosResponse } from 'axios'
import { CategoryGetters, CategoryMutations, CategoryState, PlusData, CategoryStateProps, Category } from '../types/interface'

const state: CategoryState = CategoryStateProps

const actions = {
    async fetchCategory({commit}: any, params: string) {
        const response = await axios.get('api/v1/category', {
            params: {
                params: params
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Authorization, X-Requested-With',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            commit('LOAD_CATEGORY', res.data)
        })
        return response
    },
    async pageFetchCategory({commit}: any, params: string) {
        const response = await axios.get(params, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Authorization, X-Requested-With',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        }).then((res: AxiosResponse<any>) => {
            commit('LOAD_CATEGORY', res.data)
        })
        return response
    }
}

const mutations: CategoryMutations = {
    LOAD_CATEGORY: (c: CategoryState | any, data: PlusData) => {
        c.allCategory = data.data
        c.count = data.count;
        const set = Object.keys(data.links).length
        const createArray = []
        for(let i = 1; i < set + 1; i++) {
            createArray.push({
                'links': data.links[i],
                'page': i
            })

        }
        c.total = data.total
        c.links = createArray
        c.nextPageUrl = data.nextPageUrl
        c.prevPageUrl = data.prevPageUrl
        return;
    },
}

const getters: CategoryGetters = {
    loadCategory: (cx: CategoryState) => cx
}

export default {
    state,
    actions,
    mutations,
    getters
}