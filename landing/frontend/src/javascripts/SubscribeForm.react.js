var React = require('react');
var client = require('axios').create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

var SubscribeForm = React.createClass({
  getInitialState: function() {
    return {
      waitingForResponse: false,
      email: '',
      errorMessage: null,
      successMessage: null
    };
  },

  _submit: function() {
    var email = this.state.email.replace(/^\s+|\s+$/gm,'').toLowerCase();

    if(email === '') {
      this.setState({ errorMessage: 'Debes suministrar tu dirección de correo.' });
      return;
    }

    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(email)) {
      this.setState({ errorMessage: 'La dirección de correo no es válida.' });
      return;
    }

    this.setState({ waitingForResponse: true, successMessage: null, errorMessage: null });

    client.post(process.env.API_URL, { email_address: email })
      .then(function(response) {
        this.setState({ email: '', successMessage: 'Gracias!' });
      }.bind(this))

      .catch(function(response) {
        if (response instanceof Error) {
          this.setState({ errorMessage: 'Hubo un error procesando la solicitud.' });
        } else {
          this.setState({ errorMessage: 'La dirección de correo no es válida.' });
        }
      }.bind(this))

      .then(function(response) {
        this.setState({ waitingForResponse: false });
      }.bind(this));
  },

  _onButtonClick: function() {
    this._submit();
  },

  _onEmailChance: function(event) {
    this.setState({
      email: event.target.value,
      errorMessage: null,
      successMessage: null
    });
  },

  _onEmailKeyDown: function(event) {
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      this._submit();
    }
  },

  _renderButton: function(loading) {
    if (this.state.waitingForResponse) {
      return (
        <button className="disabled">
          <img src="http://samherbert.net/svg-loaders/svg-loaders/three-dots.svg" />
        </button>
      );
    }

    return <button onClick={this._onButtonClick}>Subscribir</button>
  },

  _renderMessage: function() {
    if(this.state.errorMessage) {
      return <div className="message error">{this.state.errorMessage}</div>
    }

    if(this.state.successMessage) {
      return <div className="message success">{this.state.successMessage}</div>
    }

    return null
  },

  render: function() {
    return (
      <div>
        <div className="subscribe-form">
          <div className="highlight-text">
            <span>Pronto</span>
          </div>

          <div className="input-control">
            <label>Danos tu correo y sé de los primeros:</label>
            <input
              type="text"
              placeholder="email..."
              value={this.state.email}
              onKeyDown={this._onEmailKeyDown}
              onChange={this._onEmailChance} />
          </div>

          {this._renderButton()}

          <img style={{display: 'none'}} src="http://samherbert.net/svg-loaders/svg-loaders/three-dots.svg" />
        </div>

        {this._renderMessage()}
      </div>
    );
  },
});

module.exports = SubscribeForm;
