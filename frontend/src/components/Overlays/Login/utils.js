import api from '../../../axios'

export const login = async (username, password) => {
    const data = JSON.stringify({
        username: username,
        password: password
    })
    try {
        const response = await api.post('auth/', data)
        if (response.status === 200) {
            return {status: response.status, user: response.data}
        }
    } catch (err) {
        if (err.response.status === 401) {
            return {status: err.response.status, user: {}}
        } 
        return {stauts: 404, user: {}}
    }
}
