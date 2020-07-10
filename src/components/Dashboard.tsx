import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionComponent, { QuestionViewModes } from './QuestionComponent'
import { State } from '../actions/shared'
import { Question } from '../utils/_DATA'

export enum QuestionTypes {
  ALL,
  UNANSWERED,
  ANSWERED
}

interface DashboardProps {
  questions: Array<Question>
  authedUser: string | null
  type: QuestionTypes
  handleTypeChange: Function
}

class Dashboard extends Component<DashboardProps> {
  render() {
    const { questions, authedUser } = this.props
    let questionsArray = questions
    if (authedUser !== null) {
      switch (this.props.type) {
        case QuestionTypes.ANSWERED:
          questionsArray = questions.filter((question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
          break
        case QuestionTypes.UNANSWERED:
          questionsArray = questions.filter((question) => question.optionOne.votes.includes(authedUser) === false && question.optionTwo.votes.includes(authedUser) === false)
          break
      }
    }
    return (
      <div>
        <h3 className='center'>Would You Rather</h3>
        <ul className='question-type'>
          <li>
            <input id='unanswered-questions' type='radio' value='UNANSWERED' checked={this.props.type === QuestionTypes.UNANSWERED} onChange={(e) => this.props.handleTypeChange(e)} />
            <label htmlFor='unanswered-questions'>Unanswered</label>
          </li>
          <li>
            <input id='answered-questions' type='radio' value='ANSWERED' checked={this.props.type === QuestionTypes.ANSWERED} onChange={(e) => this.props.handleTypeChange(e)}/>
            <label htmlFor='answered-questions'>Answered</label>
          </li>
          <li>
            <input id='all-questions' type='radio' value='ALL' checked={this.props.type === QuestionTypes.ALL} onChange={(e) => this.props.handleTypeChange(e)}/>
            <label htmlFor='all-questions'>All</label>
          </li>
          <li>
            Showing {questionsArray.length} of {Object.keys(questions).length} questions
          </li>
        </ul>
        <ul className='dashboard-list'>
          {questionsArray.map((question: Question) => (
            <li key={question.id}>
              <QuestionComponent questionId={question.id} mode={QuestionViewModes.LIST} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser }: State) {
  let questionsArray: Array<Question> = []
  if (questions) {
    Object.keys(questions).forEach((id: string) => questionsArray.push(questions[id]))
  }
  return {
    questions: questionsArray.sort((a,b) => b.timestamp - a.timestamp),
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)