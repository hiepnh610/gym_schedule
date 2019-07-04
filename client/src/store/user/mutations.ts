import { MutationTree } from 'vuex'
import { UserState } from './types'

export const mutations: MutationTree<UserState> = {
  user (state: any, data: UserState): void {
    state.address = data.address
    state.bio = data.bio
    state.dob = data.dob
    state.email = data.email
    state.following = data.following
    state.full_name = data.full_name
    state.gender = data.gender
    state.height = data.height
    state.username = data.username
    state.weight = data.weight
  }
}
