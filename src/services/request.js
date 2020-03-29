import axios from 'axios'
import network from '../constants/network'

export default() => {
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL: network.baseUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}