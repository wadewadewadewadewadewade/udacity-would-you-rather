import { UserActionTypes } from "../actions/users"

const logger = (state: any) => (next: Function) => (action: any) => {
  console.group(action.__typename || action.type)
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log('The new state: ', state.getState())
  console.groupEnd()
  return returnValue
}

export default logger