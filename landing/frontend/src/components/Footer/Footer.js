import React from 'react'

require('./Footer.css')

const Footer = () => (
  <footer className="Footer">
    <div className="social-networks">
      <div className="icon">
        <a className="flaticon-facebook" href="https://www.facebook.com/Retiqueta-1659188051026218/" target="_blank">Facebook</a>
      </div>

      <div className="icon">
        <a className="flaticon-instagram" href="https://www.instagram.com/retiqueta/" target="_blank">Instagram</a>
      </div>

      <div className="icon">
        <a className="flaticon-blog" href="http://blog.retiqueta.com/" target="_blank">Blog</a>
      </div>
    </div>

    <div className="tos">
    <a href='http://www.retiqueta.com/tos.html'>Términos y Condiciones</a>
    </div>
    
    <div className="mix-panel">
    <a href='https://mixpanel.com/f/partner'><img src='https://cdn.mxpnl.com/site_media/images/partner/badge_blue.png' alt='Mobile Analytics' /></a>
    </div>

  </footer>
)

export default Footer
