import { customAxios, customAxiosWithAuth } from './api'

export async function getAllMemos() {
    const axios = customAxios()
    try {
        const response = await axios.get('/memo')
        return response.data
    } catch(err) {
        console.log(err.message)
        return []
    }
}

export async function getMemo(id) {
    const axios = customAxios()
    try {
        const response = await axios.get(`/memo/${id}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function deleteMemo(id) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/memo/${id}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createMemo(memo) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post('/memo', memo)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateMemo(id, memo) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/memo/${id}`, memo)
    } catch(err) {
        console.log(err.message)
    }
}