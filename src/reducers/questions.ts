import { QuestionAction, QuestionActionTypes } from '../actions/questions'
import { Question } from '../utils/_DATA'

export default function questions (state = {}, action: QuestionAction): any {
  switch (action.type) {
    case QuestionActionTypes.RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
      case QuestionActionTypes.SAVE_QUESTION :
        const { questions } = action
        const question: Question = questions[Object.keys(questions)[0]]
        console.log(question)
        return {
          ...state,
          [question.id]: question // insert new question into state
        }
    default :
      return state
  }
}