import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PasswordResetForm } from '../../components'
import { actionCreators, UPDATE_COMPLETE_PATH } from '../../redux/modules/passwords'

require('./PasswordReset.css')

class PasswordReset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      complete: this.props.complete,
      message: this.props.message,
      loading: this.props.loading,
      pathname: this.props.pathname
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.update(values.password, this.props.token)
  }

  validateState(pathname, complete) {
    if (pathname == UPDATE_COMPLETE_PATH && !complete) {
      this.props.goHome()
      return false
    }

    return true
  }

  componentWillMount() {
    this.validateState(this.props.pathname, this.props.complete)
  }

  componentWillReceiveProps(nextProps) {
    const s = { ...this.state }

    if (nextProps.pathname != undefined) {
      s.pathname = nextProps.pathname
    }

    if (nextProps.complete != undefined) {
      s.complete = nextProps.complete
    }

    if (nextProps.message != undefined) {
      s.message = nextProps.message
    }

    if (nextProps.loading != undefined) {
      s.loading = nextProps.loading
    }

    if (this.validateState(s.pathname, s.complete)) {
      this.setState({ ...s })
    }
  }

  render() {
    const content = this.state.complete ?
      <div className="message">{this.state.message}</div>
      :
      <PasswordResetForm
        loading={this.state.loading}
        onSubmit={this.onSubmit}
        onPasswordChange={this.onPasswordChange} />

    return (
      <div className="PasswordReset">
        <div className="clearfix"></div>
        <div id="password-reset-form-wrapper" className="password-reset-form-wrapper">
          <div className="password-reset-form">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: ownProps.params.token,
    pathname: ownProps.location.pathname,
    message: state.passwords.updateMessage,
    complete: state.passwords.updateComplete,
    loading: state.passwords.updating
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordReset)
