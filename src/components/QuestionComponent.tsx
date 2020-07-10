import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, Question } from '../utils/_DATA'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { Link, withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import { handleVoteQuestion } from '../actions/questions'
import { User } from '../utils/_DATA'
import { State } from '../actions/shared'

export enum QuestionViewModes {
  LIST,
  DETAIL
}

type TParams = { id: string }

interface QuestionProps extends RouteComponentProps<TParams> {
  questionId: string | null
  dispatch?: Function
  user?: User
  question?: Question
  authedUser?: string | null
  mode: QuestionViewModes
}

class QuestionComponent extends Component<QuestionProps> {
  state = {
    toHome: false
  }
  handleVote = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
    e.preventDefault()
    const { dispatch, question } = this.props
    if (typeof question !== 'undefined' && dispatch && option) {
      dispatch(handleVoteQuestion(
        question.id,
        option
      ))
    }
  }
  handleBack = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    this.setState(() => ({
      toHome: true
    }))
  }
  render() {
    const { toHome } = this.state
    if (toHome === true) {
      return (
        <Redirect to='/' />
      )
    }
    const { question, user, authedUser, mode } = this.props
    if (typeof question === 'undefined' || typeof user === 'undefined') {
      return <p>This Question doesn't exist</p>
    }
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const { author, timestamp, optionOne, optionTwo } = question
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    return (
      <div>
        {mode !== QuestionViewModes.LIST && <h3 className='center'>Would You Rather</h3>}
        {mode !== QuestionViewModes.LIST && <TiArrowBackOutline className='question-icon' onClick={this.handleBack}/>}
        <Link to={`/question/${question.id}`} className='question'>
          <img src={user.avatarURL.href} alt={`Avatar of ${user.name}`} className='avatar' />
          <div className='question-info'>
            <div>
              <span>{author}</span>
              <div>{formatDate(timestamp)}</div>
              <div>{totalVotes} votes</div>
            </div>
            <ol>
              <li>
                <span>{optionOne.text}</span>
                {mode === QuestionViewModes.LIST || !authedUser
                  ? (
                    <span>{optionOne.votes.length} votes / {totalVotes > 0 ? (optionOne.votes.length / totalVotes * 100) + '% of votes' : null}</span>
                  ) : (
                    <button className='heart-button' onClick={(e) => this.handleVote(e,'optionOne')}>
                      {optionOne.votes.includes(authedUser) === true
                      ? <TiHeartFullOutline color='#E0245E' className='question-icon'/>
                      : <TiHeartOutline className='question-icon'/>}
                    </button>
                  )}
              </li>
              <li>
                <span>{optionTwo.text}</span>
                {mode === QuestionViewModes.LIST || !authedUser
                  ? (
                    <span>{optionTwo.votes.length} votes / {totalVotes > 0 ? (optionTwo.votes.length / totalVotes * 100) + '% of votes' : null}</span>
                  ) : (
                    <button className='heart-button' onClick={(e) => this.handleVote(e,'optionTwo')}>
                      {optionTwo.votes.includes(authedUser) === true
                      ? <TiHeartFullOutline color='#E0245E' className='question-icon'/>
                      : <TiHeartOutline className='question-icon'/>}
                    </button>
                )}
              </li>
            </ol>
          </div>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }: State, props: QuestionProps) {
  const { match, questionId } = props
  let question = undefined
  let user = undefined
  if (questions) {
    question = questions[questionId || match.params.id]
    if (question && users) {
      user = users[question.author]
    }
  }
  return {
    question,
    user,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(QuestionComponent))