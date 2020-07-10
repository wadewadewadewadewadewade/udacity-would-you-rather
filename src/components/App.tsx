import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard, { QuestionTypes } from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionCompnent from './QuestionComponent'
import Nav from './Nav'
import { State } from '../actions/shared'
import UsersComponent from './UsersComponent'
import Leaderboard from './Leaderboard'

interface AppProperties {
  dispatch: Function,
  loading: boolean,
  noUser: boolean
}

class App extends Component<AppProperties> {
  state = {
    dashboardType: QuestionTypes.UNANSWERED
  }
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.value) {
      case 'UNANSWERED':
        this.setState(({dashboardType: QuestionTypes.UNANSWERED}))
        break
      case 'ANSWERED':
        this.setState(({dashboardType: QuestionTypes.ANSWERED}))
        break
      case 'ALL':
        this.setState(({dashboardType: QuestionTypes.ALL}))
        break
    }
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>  
            <Nav/>
            {this.props.loading === true
              ? null
              : this.props.noUser
                ? <UsersComponent />
                : <div>
                    <Switch>
                      <Route path='/' exact>
                        <Dashboard
                          handleTypeChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleTypeChange(e)}
                          type={this.state.dashboardType} />
                      </Route>
                      <Route path='/question/:id' component={QuestionCompnent} />
                      <Route path='/new' component={NewQuestion} />
                      <Route path='/users' component={UsersComponent} />
                      <Route path='/leaderboard' component={Leaderboard} />
                      <Redirect to='/' />
                    </Switch>
                  </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps({ authedUser, questions }: State) {
  return {
    loading: !questions || Object.keys(questions).length === 0,
    noUser: authedUser === null
  }
}

export default connect(mapStateToProps)(App)