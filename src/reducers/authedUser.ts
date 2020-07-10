import { UserActionTypes } from '../actions/authedUser'
interface UsersActions {
  id: string
  type: UserActionTypes
}

export default function authedUser (state: string | null = null, action: UsersActions): string | null {
  switch (action.type) {
    case UserActionTypes.SET_AUTHED_USER :
      return action.id === undefined ? null : action.id
    default :
      return state === undefined ? null : state
  }
}