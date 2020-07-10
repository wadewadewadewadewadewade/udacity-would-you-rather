import { Questions, Question, _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export enum QuestionActionTypes {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION
}

export interface QuestionAction {
  __typename: string
  type: QuestionActionTypes
  questions: Questions
}

function saveQuestionAnswer(question: Question): QuestionAction {
  return {
    __typename: 'SAVE_QUESTION',
    type: QuestionActionTypes.SAVE_QUESTION, // a vote is saved
    questions: { [question.id]: question }
  }
}

export function handleVoteQuestion(qid: string, answer: string) {
  return (dispatch: Function, getState: Function) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then((question: Question) => {
        dispatch(saveQuestionAnswer(question))
      })
      .then(() => dispatch(hideLoading()))
  }
}

function saveQuestion(question: Question): QuestionAction {
  return {
    __typename: 'SAVE_QUESTION',
    type: QuestionActionTypes.SAVE_QUESTION,
    questions: { [question.id]: question }
  }
}

export function handleSaveQuestion(optionOneText: string, optionTwoText: string) {
  return (dispatch: Function, getState: Function) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(saveQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function recieveQuestions(questions: Questions): QuestionAction {
  return {
    __typename: 'RECEIVE_QUESTIONS',
    type: QuestionActionTypes.RECEIVE_QUESTIONS,
    questions
  }
}