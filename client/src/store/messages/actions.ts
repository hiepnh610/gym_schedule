import { ActionTree } from 'vuex'
import { MessageState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<MessageState, RootState> = {
  setMessagesList (context: any, data: MessageState[]): any {
    context.commit('messagesList', data)
  },

  setToAddMessage (context: any, data: MessageState[]): any {
    context.commit('addMessage', data)
  }
}
