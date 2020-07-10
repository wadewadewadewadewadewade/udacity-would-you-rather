import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { State } from '../actions/shared'
import { User } from '../utils/_DATA'
import { setAuthedUser } from '../actions/authedUser'

interface UsersComponentProps extends RouteComponentProps {
  dispatch: Function
  users: Array<User>
}

class UsersComponent extends Component<UsersComponentProps> {
  state = {
    toHome: false
  }
  handleSelectUser(e: React.MouseEvent<HTMLLIElement>, user: User) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(user.id))
    this.setState(({
      toHome: true
    }))
  }
  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3 className='center'>Choose a User to Impersonate</h3>
        <ul className='users-list'>
          {this.props.users.map((user: User) => (
            <li key={user.id} onClick={(e) => this.handleSelectUser(e, user)}>
              <img src={user.avatarURL.href} alt={`Avatar of ${user.name}`} className='avatar' />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }: State) {
  const usersArray: Array<User> = []
  if (users) {
    Object.keys(users).forEach((id: string) => usersArray.push(users[id]))
  }
  return {
    users: usersArray
  }
}

export default withRouter(connect(mapStateToProps)(UsersComponent))