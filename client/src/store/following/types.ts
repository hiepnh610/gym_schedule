export interface UserFollowing {
  avatar?: string
  full_name?: string
  username?: string
}

export interface UserFollowingState {
  listUsers: UserFollowingState[]
}
