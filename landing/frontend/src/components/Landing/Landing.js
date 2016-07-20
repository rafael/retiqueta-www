import React from 'react'
import { SubscribeForm } from '../../containers'

require('./Landing.css')
const appStoreBtnImgUrl = require('./btn-appstore.png')
const googlePlayBtnImgUrl = require('./btn-googleplay.png')

const Landing = () => (
  <div className="Landing">
    <div className="slogan">
      <div className="text-1">Vende tu estilo,</div>
      <div className="text-2">compra en Retiqueta</div>
      <div className="text-3">Sé de las primeras en descargar la App.</div>
    </div>

    <div className="app-links">
      <a href="https://itunes.apple.com/ve/app/retiqueta/id1063077431?mt=8" className="btn-appstore" target="_blank">
        <img alt="App Store" src={appStoreBtnImgUrl} />
      </a>

      <a href="https://play.google.com/store/apps/details?id=com.retiqueta" className="btn-googleplay" target="_blank">
        <img alt="Google Play" src={googlePlayBtnImgUrl} />
      </a>
    </div>
  </div>
)

export default Landing
