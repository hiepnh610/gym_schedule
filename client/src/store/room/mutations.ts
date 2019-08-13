import { MutationTree } from 'vuex'
import { RoomState } from './types'

export const mutations: MutationTree<RoomState> = {
  roomId (state: any, data: string): void {
    state.room_id = data
  }
}
