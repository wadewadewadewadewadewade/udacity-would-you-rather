export enum UserActionTypes {
  SET_AUTHED_USER
}

export function setAuthedUser(id: string | null) {
  return {
    __typename: 'SET_AUTHED_USER',
    type: UserActionTypes.SET_AUTHED_USER,
    id
  }
}