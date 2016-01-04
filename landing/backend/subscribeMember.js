require('dotenv').load();
require('es6-promise').polyfill();

var mailChimpClient = (function(apiKey, apiBaseUrl) {
  var axios = require('axios');
  var config = {
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'apikey ' + apiKey
    }
  };

  return axios.create(config);

})(process.env.MAILCHIMP_API_KEY, process.env.MAILCHIMP_API_BASE_URL);


function saveEmailAddress(emailAddress, listId) {
  var endpoint = '/lists/' + listId + '/members/';

  var params = {
    email_address: emailAddress,
    status: 'subscribed'
  };

  return mailChimpClient.post(endpoint, params);
}

exports.handler = function(event, context) {
  var emailAddress = event['email_address'];
  var listId = process.env.MAILCHIMP_LIST_ID;

  if(!emailAddress || emailAddress === '') {
    return context.fail('Bad Request: No email address provided');
  }

  saveEmailAddress(emailAddress, listId)
    .then(function(response) {
      context.succeed('');
    })

    .catch(function(response) {
      if (response instanceof Error) {
        console.log('Internal Error: ' + response.message);
        context.fail('Internal Error: There was a problem with the request. Try again later');
      } else {
        console.log(response.data);
        if (response.data.title === 'Member Exists') {
          context.succeed('');
        } else {
          context.fail('Bad Request: Invalid email address');
        }
      }
    });
};
