import api from "./BaseAxios"

const apiRepo = {
    repo: (body) => {
        const endPoint = `/repo`;
        return api.post(endPoint, body)
    },
    addShelves: (body) => {
        const endPoint = `/addShelves`;
        return api.post(endPoint, body)
    },
    addSupplies: (body) => {
        const endPoint = `/addsupplies`;
        return api.post(endPoint, body)
    },
    listSupplies: (body) => {
        const endPoint = `/listsupplies`;
        return api.post(endPoint, body)
    },
    deleteSupplies: (body) => {
        const endPoint = `/deletesupplies`;
        return api.post(endPoint, body)
    },
    updateSupplies: (body) => {
        const endPoint = `/updatesupplies`;
        return api.post(endPoint, body)
    }

}

export default apiRepo