import React, { Component, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect, RouteComponentProps } from 'react-router-dom'

interface NewQuestionProps extends RouteComponentProps {
  dispatch: Function
}

class NewQuestion extends Component<NewQuestionProps> {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, option: string) => {
    const text = e.target.value
    if (option === 'optionOne') {
      this.setState((prev) => ({
        ...prev,
        optionOne: text
      }))
    } else {
      this.setState((prev) => ({
        ...prev,
        optionTwo: text
      }))
    }
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props
    dispatch(handleSaveQuestion(optionOne, optionTwo))
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state
    if (toHome === true) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option one?"
            value={optionOne}
            onChange={(e) => this.handleChange(e,'optionOne')}
            className='textarea'
          />
          <textarea
            placeholder="Option two?"
            value={optionTwo}
            onChange={(e) => this.handleChange(e,'optionTwo')}
            className='textarea'
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}
          >Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)