import api from "./BaseAxios"

const apiUser = {
    // getAll: (limit = 10, page = 1) => {
    account: (limit = 10, page = 1) => {
        const endpoint = `/accounts?limit = ${limit}&page =${page}`
        return api.get(endpoint)
    },
    signup: (body) => {
        const endPoint = `/signup`;
        return api.post(endPoint, body)
    },
    login: (body) => {
        const endPoint = '/';
        return api.post(endPoint, body)
    },
    fechtcurrent: () => {
        const endPoint = `/fechtcurrent`
        return api.get(endPoint)
    },
    updateUser: (body) => {
        const endPoint = `/updateuser`
        return api.post(endPoint, body)
    },
    deleteUser: (body) => {
        const endPoint = `/deleteuser`
        return api.post(endPoint, body)
    },
    account: () => {
        const endPoint = `/accounts`
        return api.get(endPoint)
    }
}

export default apiUser
