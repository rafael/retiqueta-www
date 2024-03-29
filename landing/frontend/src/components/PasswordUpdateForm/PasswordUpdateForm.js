import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validators } from '../../redux/modules/passwords'

const loaderImgUrl = require('../App/loader.svg')

const renderField = ({ input, label, autoFocus, disabled, meta: { touched, error } }) => (
  <div className="input-control">
    <label>{label}</label>
    <input {...input} type="password" autoFocus={autoFocus} disabled={disabled} />
    {touched && error && <span className="tip">{error}</span>}
  </div>
)

const PasswordUpdateForm = (props) => {
  const {
    handleSubmit,
    loading,
    invalid,
    onSubmit } = props

  const submitButton = loading ?
    <button disabled className="disabled"><img src={loaderImgUrl} /></button>
    : <button type="submit" disabled={invalid}>Actualizar</button>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <img style={{display: 'none'}} src={loaderImgUrl} />

      <Field label="Nueva contraseña" name="password" component={renderField} disabled={loading} autoFocus />

      <Field label="Repetir contraseña" name="passwordConfirmation" component={renderField} disabled={loading} />

      { submitButton }
    </form>
  )
}

export default reduxForm({
  form: 'password-update',
  validate: validators.updateForm
})(PasswordUpdateForm)
