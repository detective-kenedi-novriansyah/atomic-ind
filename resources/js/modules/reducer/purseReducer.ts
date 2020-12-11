import axios, { AxiosResponse } from 'axios'
import { data } from 'jquery'
import { Purse, PurseActiveState, PurseData, PurseGetters, PurseMutations, PurseState } from '../types/interface'

const state: PurseState = {
    purse: {
        id: 0,
        name: '',
        reference: '',
        description: '',
        create_at: '',
        update_at: '',
        status: false,
        user_id: {
            id: 0,
            username: '',
            email: '',
            create_at: '',
            update_at: '',
            password: '',
            confirm_password: ''
        }
    },
    allPurse: [],
    nextPageUrl: '',
    prevPageUrl: '',
    total: 0,
    count: 0,
    links: [],
    active: [],
}

const actions = {
    async fetchPurse({commit}: any, params: number) {
        const response = await axios.get('api/v1/purse', {
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
        })
        return response
    },
    async purseGetPage({commit}: any, newUrl: string) {
        const response = await axios.get(newUrl, {
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
        }).then((res: AxiosResponse) => {
            commit('LOAD_PURSE', res.data)
        })
        return response
    },
    async purseActive({commit}: any, newData: PurseActiveState) {
        const response = await axios.post(`api/v1/purse/active/${newData.id}`, {
            status: newData.status
        },{
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
        })
        return response
    },
    async recordPurse({commit}: any, newData: Purse) {
        const response = await axios.post(`api/v1/purse`, newData,{
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
            validateStatus: (status: number) => status >= 201 && status < 300
        })
        return response
    },
    async retrievePurse({commit}: any, newData: number) {
        const response = await axios.get(`api/v1/purse/${newData}`,{
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
        })
        return response
    },
    async updatePurse({commit}: any, newData: Purse) {
        const response = await axios.put(`api/v1/purse/${newData.id}`,newData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Authorization, X-Requested-With',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        })
        return response
    },
    async destroyPurse({commit}: any, newData: Purse) {
        const response = await axios.delete(`api/v1/purse/${newData.id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Authorization, X-Requested-With',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            timeout: 865000,
            responseType: 'json',
            withCredentials: false,
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: (status: number) => status >= 200 && status < 300
        })
        return response
    },
}

const mutations: PurseMutations = {
    LOAD_PURSE: (purse: PurseState | any, data: PurseData) => {
        const active_ = data.data.filter(function(x: Purse) {
            return x.status === 1
        })
        console.log(active_)
        purse.active = active_
        purse.allPurse = data.data
        purse.count = data.count;
        const set = Object.keys(data.links).length
        const createArray = []
        for(let i = 1; i < set + 1; i++) {
            createArray.push({'links': data.links[i],'page': data.links[i].split('page=')[1]})
        }
        purse.total = data.total
        purse.links = createArray
        purse.nextPageUrl = data.nextPageUrl
        purse.prevPageUrl = data.prevPageUrl
        return;
    },
    SET_PURSE: (purse: PurseState | any, data: Purse) => {
        const newData = purse.allPurse.map((x: Purse) => x.id === data.id ? data : x)
        purse.allPurse = newData
        return;
    },
    DESTROY_PURSE: (purse: PurseState | any, data: Purse) => {
        const find = purse.allPurse.filter(function(x: Purse) {
            return x.id !== data.id
        })
        purse.allPurse = find
        return;
    },
    DETAIL_PURSE: (purse: PurseState | any, data: Purse) => (purse.purse = data)
}

const getters: PurseGetters = {
    allPurse: (purse: PurseState) => purse,
    detailPurse: (purse: PurseState) => purse.purse
}

export default {
    state,
    actions,
    mutations,
    getters
}