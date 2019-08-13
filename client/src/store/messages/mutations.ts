import { MutationTree } from 'vuex'
import { MessageState } from './types'

export const mutations: MutationTree<MessageState> = {
  messagesList (state: any, data: MessageState[]): void {
    state.messagesList = data
  },

  addMessage (state: any, data: MessageState): void {
    state.messagesList.push(data)
  }
}
