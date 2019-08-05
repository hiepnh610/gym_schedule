import { GetterTree } from 'vuex'
import { RoomState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<RoomState, RootState> = {
  roomId (state: any): string {
    return state.room_id
  }
}
