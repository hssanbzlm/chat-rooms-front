export interface message {
  _id: string
  content: string
  date: Date
  sender: { fullName: string; userName: string }
  receiver: string
  isMyMessage: boolean
}
