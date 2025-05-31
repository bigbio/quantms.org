import axios from 'axios'
import { ElMessage } from 'element-plus'

// Create axios instance with default config
const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
server.interceptors.request.use(
  config => {
    // You can add auth tokens or other request modifications here
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
server.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Handle different error scenarios
    const { response } = error
    
    if (response) {
      // Server responded with an error status
      const { status, data } = response
      
      switch (status) {
        case 400:
          ElMessage.error('Bad request: ' + (data.message || 'Invalid data'))
          break
        case 401:
          ElMessage.error('Unauthorized: Please log in again')
          break
        case 403:
          ElMessage.error('Forbidden: You do not have permission')
          break
        case 404:
          ElMessage.error('Not found: The requested resource does not exist')
          break
        case 500:
          ElMessage.error('Server error: Please try again later')
          break
        default:
          ElMessage.error('An error occurred: ' + (data.message || 'Unknown error'))
      }
    } else if (error.request) {
      // Request was made but no response received
      ElMessage.error('Network error: Please check your connection')
    } else {
      // Error in setting up the request
      ElMessage.error('Error: ' + error.message)
    }
    
    return Promise.reject(error)
  }
)

export default server
