import { MutationTree } from 'vuex'
import { UserFollowing, UserFollowingState } from './types'

export const mutations: MutationTree<UserFollowingState> = {
  userFollowing (state: any, data: UserFollowing): void {
    state.listUsers = data
  },

  unfollow (state: any, data: string): void {
    for (const i in state.listUsers) {
      if (state.listUsers[i].username === data) {
        state.listUsers.splice(i, 1)
      }
    }
  }
}
