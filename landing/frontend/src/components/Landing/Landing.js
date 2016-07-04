import React from 'react'
import { SubscribeForm } from '../../containers'

require('./Landing.css')

const Landing = () => (
  <div className="Landing">
    <div className="slogan">
      <div className="text-1">Vende tu estilo,</div>
      <div className="text-2">compra en Retiqueta</div>
      <div className="text-3">Sé de las primeras en descargar la App.</div>
    </div>

    <SubscribeForm />
  </div>
)

export default Landing
