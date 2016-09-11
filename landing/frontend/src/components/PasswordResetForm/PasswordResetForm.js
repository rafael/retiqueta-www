import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validators } from '../../redux/modules/passwords'

const loaderImgUrl = require('../App/loader.svg')

const renderField = ({ input, label, autoFocus, message, disabled, onChange, meta: { touched, error } }) => {
  const tip = error || message

  return (
    <div className="input-control">
      <label>{label}</label>
      <input {...input} type="email" autoFocus={autoFocus} disabled={disabled} onChange={onChange} autoComplete="off" />
      {touched && tip && <span className="tip">{tip}</span>}
    </div>
  )
}

const PasswordResetForm = (props) => {
  const {
    handleSubmit,
    onChange,
    loading,
    invalid,
    message,
    onSubmit } = props

  const handleChange = event => {
    props.autofill('email', event.target.value)
    onChange(event)
  }


  const submitButton = loading ?
    <button disabled className="disabled"><img src={loaderImgUrl} /></button>
    : <button type="submit" disabled={invalid}>Enviar correo</button>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <img style={{display: 'none'}} src={loaderImgUrl} />

      <Field label="Correo electrónico" name="email" value="fack" component={renderField} disabled={loading} message={message} autoFocus onChange={handleChange} />

      { submitButton }
    </form>
  )
}

export default reduxForm({
  form: 'password-reset',
  validate: validators.resetForm
})(PasswordResetForm)
