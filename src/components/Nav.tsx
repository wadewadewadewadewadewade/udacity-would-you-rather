import React from 'react'
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' exact activeClassName='active'>Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to='/new' exact activeClassName='active'>New Question</NavLink>
        </li>
        <li>
          <NavLink to='/users' exact activeClassName='active'>Change User</NavLink>
        </li>
      </ul>
    </nav>
  )
}