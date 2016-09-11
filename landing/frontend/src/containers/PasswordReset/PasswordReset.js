import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PasswordResetForm } from '../../components'
import { actionCreators, RESET_COMPLETE_PATH } from '../../redux/modules/passwords'

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
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(values) {
    this.props.reset(values.email)
  }

  onChange(event) {
    this.setState({ message: '' })
  }

  validateState(pathname, complete) {
    if (pathname == RESET_COMPLETE_PATH && !complete) {
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
        onChange={this.onChange}
        message={this.state.message} />

    return (
      <div className="PasswordReset">
        <div className="clearfix"></div>
        <div className="form-wrapper">
          <h1>Recuperar contraseña</h1>

          <div className="form-inner-wrapper">
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
    message: state.passwords.resetMessage,
    complete: state.passwords.resetComplete,
    loading: state.passwords.reseting
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordReset)
