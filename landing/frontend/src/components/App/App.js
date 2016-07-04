import React from 'react'
import { Footer } from '../'

require('./App.css')

const logoUrl = require('./logo.png');

const App = ({ children }) => (
  <div className="App">
    <div className="Content">
      <img src={logoUrl} className="logo" />

      {children}

      <div className="pushup"></div>
    </div>

    <Footer />
  </div>
)

export default App
