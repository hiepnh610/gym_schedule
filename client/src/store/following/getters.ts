import { GetterTree } from 'vuex'
import { UserFollowing, UserFollowingState } from './types'
import { RootState } from '@/types'

export const getters: GetterTree<UserFollowingState, RootState> = {
  userFollowing (state: any): UserFollowing {
    return state
  }
}
