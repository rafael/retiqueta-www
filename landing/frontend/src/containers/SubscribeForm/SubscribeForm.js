import React from 'react'
import { connect } from 'react-redux'
import { subscribe } from '../../actions'

require('./SubscribeForm.css')

const loaderImgUrl = require('./loader.svg')

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      errorMessage: props.errorMessage,
      successMessage: props.successMessage,
      loading: props.loading
    }

    this.subscribe = props.subscribe
    this.onButtonClick = this.onButtonClick.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onEmailKeyDown = this.onEmailKeyDown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const email = nextProps.successMessage != null ? '' : this.state.email

    this.setState(Object.assign({ email }, nextProps))
  }

  submit() {
    this.subscribe(this.state.email)
  }

  onButtonClick() {
    this.submit()
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value,
      errorMessage: null,
      successMessage: null
    })
  }

  onEmailKeyDown(event) {
    const ENTER = 13
    if (event.keyCode === ENTER) {
      this.submit()
    }
  }

  renderMessage() {
    if(this.state.errorMessage) {
      return <div className="message error">{this.state.errorMessage}</div>
    }

    if(this.state.successMessage) {
      return <div className="message success">{this.state.successMessage}</div>
    }

    return null
  }

  renderButton(loading) {
    if (this.state.loading) {
      return (
        <button className="disabled">
          <img src={loaderImgUrl} />
        </button>
      )
    }

    return <button onClick={this.onButtonClick}>Subscribir</button>
  }

  render() {
    return (
      <div id="subscribe-form-wrapper" className="subscribe-form-wrapper">
        <div className="subscribe-form">
          <div className="highlight-text">
            <span>Pronto</span>
            <div className="shadow-bg" />
          </div>

          <div className="input-control">
            <input
              type="text"
              placeholder="E-mail"
              autoFocus
              value={this.state.email}
              onKeyDown={this.onEmailKeyDown}
              onChange={this.onEmailChange} />
          </div>

          {this.renderButton()}

          <img style={{display: 'none'}} src={loaderImgUrl} />
        </div>

        {this.renderMessage()}
      </div>
    )
  }
}

const mapStateToProps = (state, routerProps) => {
  return {
    successMessage: state.subscribeForm.successMessage,
    errorMessage: state.subscribeForm.errorMessage,
    loading: state.subscribeForm.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (email) => dispatch(subscribe(email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeForm)
