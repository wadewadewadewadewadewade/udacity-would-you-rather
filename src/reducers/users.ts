import { UsersAction, UserActionTypes } from '../actions/users'

export default function users (state = {}, action: UsersAction) {
  switch (action.type) {
    case UserActionTypes.RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    default :
      return state
  }
}