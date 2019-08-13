export interface Message {
  created_at: string
  created_by: string
  message: string
}

export interface MessageState {
  messagesList: Message[]
}
