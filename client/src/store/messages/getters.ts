import { GetterTree } from 'vuex'
import { MessageState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<MessageState, RootState> = {
  messagesList (state: any): MessageState[] {
    return state.messagesList
  }
}
