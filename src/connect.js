import Axios from 'axios'
import Qs from 'qs'

const connect = Axios.create({
  baseURL: `${HTTPS ? 'https' : 'http'}://${API_URL}`,
  paramsSerializer: (params) => {
    return Qs.stringify(params)
  },
})

export default axiosInstance
