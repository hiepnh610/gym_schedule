import { ActionTree } from 'vuex'
import { UserFollowing, UserFollowingState } from './types'
import { RootState } from '@/types'

export const actions: ActionTree<UserFollowingState, RootState> = {
  setUserFollowing (context: any, data: UserFollowing): any {
    return context.commit('userFollowing', data)
  },

  setToUnfollow (context: any, data: string): any {
    return context.commit('unfollow', data)
  }
}
