import React, { Component } from 'react'
import { connect } from 'react-redux'
import { State } from '../actions/shared'
import { Users, User } from '../utils/_DATA'

interface UserCompnentProps {
  user: User
}

class UserComponent extends Component<UserCompnentProps> {
  render() {
    const { user } = this.props
    return (
      <li key={user.id}>
        <img src={user.avatarURL.href} alt={`Avatar of ${user.name}`} className='avatar' />
        <span className='user-info'>
          <span>{user.name}</span>
          <span>{user.questions.length} questions asked</span>
          <span>{Object.keys(user.answers).length} questions answered</span>
        </span>
      </li>
    )
  }
}

interface LeaderboardProps {
  users: Array<Users>
}

class Leaderboard extends Component<any, LeaderboardProps> {
  render() {
    const { users } = this.props
    return (
      <div>
        <h3 className='center'>Leaderboard</h3>
        <ul className='users-list leaderboard'>
          {users && users.map((user: User) => <UserComponent key={user.id} user={user} />)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }: State) {
  const usersArray: Array<User> = []
  if (users) {
    Object.keys(users).forEach((userId: string) => usersArray.push(users[userId]))
  }
  return {
    users: usersArray.sort((a,b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length))
  }
}

export default connect(mapStateToProps)(Leaderboard)