import type { User } from './user'
export interface message {
  _id: string
  content: string
  date: Date
  sender: User
  receiver: string
}
