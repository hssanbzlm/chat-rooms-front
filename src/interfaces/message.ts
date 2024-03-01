import type { IUser } from './User'
export interface IMessage {
  _id: string
  content: string
  date: Date
  sender: IUser
  receiver: string
}
