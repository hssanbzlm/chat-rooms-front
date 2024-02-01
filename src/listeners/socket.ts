import { io } from 'socket.io-client'
const socketUrl = import.meta.env.VITE_API_URL
const socket = io(socketUrl, { withCredentials: true })

export default socket
