import { ActionTree } from 'vuex'
import { RoomState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<RoomState, RootState> = {
  setRoomId (context: any, data: string): any {
    context.commit('roomId', data)
  }
}
