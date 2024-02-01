const baseUrl = import.meta.env.VITE_API_URL
export const postMethod = 'POST'
export const getMethod = 'GET'
export const createAccountUrl = `${baseUrl}/api/user/add`
export const createRoomUrl = `${baseUrl}/api/chat-room/create`
export const joinRoomUrl = `${baseUrl}/api/auth/join`
export const isAuthUrl = `${baseUrl}/api/auth/is-auth`
export const getMessagesUrl = `${baseUrl}/api/messages/get-messages`
