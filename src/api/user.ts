// import axios from '../plugins/axios'
// import axios from 'axios'
import axios from '../plugins/axios'
const request = axios.request
export default {
    async login(data: API.LoginData) {
        return request<API.UserData>({
            url: `/user/login`,
            method: 'POST',
            data
        })
    }
}