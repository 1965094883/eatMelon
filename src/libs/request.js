import Vue from 'vue'

const apiHost = "http://192.168.1.9:2000";

export const getRequest = (url, params={}) => {
    return Vue.axios.get(`${apiHost}${url}`, {
        params: {...params }
    })
}

export const postRequest = (url, params={}) => {
    return Vue.axios.post(`${apiHost}${url}`, {...params })
}