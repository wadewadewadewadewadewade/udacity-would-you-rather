import { Users } from '../utils/_DATA'

export enum UserActionTypes {
  RECEIVE_USERS
}

export interface UsersAction {
  __typename: string
  type: UserActionTypes
  users: Users
}

export function recieveUsers(users: Users): UsersAction {
  return {
    __typename: 'RECEIVE_USERS',
    type: UserActionTypes.RECEIVE_USERS,
    users
  }
}