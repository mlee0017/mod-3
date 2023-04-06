import { customAxiosWithAuth } from './api'

export async function deleteCommentFromMemo(commentId, memoId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/comments/m/${memoId}/c/${commentId}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createCommentForMemo(comment, memoId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post(`/comments/m/${memoId}`, comment)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function getMemoComment(commentId, memoId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/comments/m/${memoId}/c/${commentId}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateCommentOfIdFromMemo(comment, commentId, memoId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/comments/m/${memoId}/c/${commentId}`, comment)
    } catch(err) {
        console.log(err.message)
    }
}