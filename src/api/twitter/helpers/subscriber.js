const request = require('request-promise')
const queryString = require('query-string');
const prompt = require('prompt-promise');


const { config }  = require('../../../../dist/config/config');
const twitterOauth = config.twitter.twitterOauth


/**
 * twitterEnv - twitter app developer environment add/view/update in https://developer.twitter.com/en/account/environments
 */
var twitterEnv = 'development';

/**
 * subscribeOtherUser - subscribe a user manually the main app
 * 
 * 1. Update twitterCredentials in config if needed.
 * 2. Run in CMD: node -e "require('./src/api/twitter/helpers/subscriber.js').subscribeOtherUser()"
 * 
 */
const subscribeOtherUser = () => {
  // request options to start PIN-based Twitter sign-in process
var request_token_request_options = {
  url: 'https://api.twitter.com/oauth/request_token?oauth_callback=oob',
  oauth: twitterOauth
}

var request_token_response;

// generates URL for login and prompts for PIN
request.get(request_token_request_options).then(function (body) {
  request_token_response = queryString.parse(body)
  
  console.log('Open this URL in a browser and sign-in with the Twitter account you wish to subscribe to:')
  console.log('https://api.twitter.com/oauth/authorize?oauth_token=' + request_token_response['oauth_token'] + '&force_login=true')

  return prompt('Enter the generated PIN:')
})

// validates PIN and generates access tokens
.then(function (prompt_reponse) {
  prompt.end()
  console.log("prompt_reponse", prompt_reponse)
  var access_token_request_options = {
    url: 'https://api.twitter.com/oauth/access_token?oauth_verifier=' + prompt_reponse,
    oauth: {
        consumer_key: twitterOauth.consumer_key,
        consumer_secret: twitterOauth.consumer_secret,
        token: request_token_response['oauth_token'],
        token_secret: request_token_response['oauth_token_secret']
      }
  }
  return request.get(access_token_request_options)
})
// adds subscription for user 
.then(function (body) {
  var access_tokens = queryString.parse(body)
  console.log("Access Tokens / Required Fields for frontend",{access_tokens} );
  
  var subscription_request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/all/' + twitterEnv + '/subscriptions.json',
    oauth: {
        consumer_key: twitterOauth.consumer_key,
        consumer_secret: twitterOauth.consumer_secret,
        token: access_tokens['oauth_token'],
        token_secret: access_tokens['oauth_token_secret']
      },
    resolveWithFullResponse: true
  }

  return request.post(subscription_request_options)
})

// add subscription success
.then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription added.')
  }
})

// add subscrition error
.catch(function (response) {
  console.log('Subscription was not able to be added.')
  console.log('- Verify environment name.')
  console.log('- Verify correct PIN was used.')
  console.log('- Verify "Read, Write and Access direct messages" is enabled on apps.twitter.com.')
  console.log('Full error message below:')
  console.log(response)
})
}


/**
 * subscribeAppOwner - subscribe app owner manually the main app (escalate app) - use case: testing
 * 
 * 1. Update twitterCredentials in config if needed.
 * 2. Run in CMD: node -e "require('./src/api/twitter/helpers/subscriber.js').subscribeAppOwner()"
 * 
 * modules\channels\twitter\scripts\subscriber.js
 */
const subscribeAppOwner = () => {

    var request_options = {
        url: 'https://api.twitter.com/1.1/account_activity/all/' + twitterEnv + '/subscriptions.json',
        oauth: twitterOauth,
        resolveWithFullResponse: true
      }
      
      request.post(request_options).then(function (response) {
        console.log('HTTP response code:', response.statusCode)
      
        if (response.statusCode == 204) {
          console.log('Subscription added.')
          console.log('access tokens for frontend', twitterOauth)
        }
      }).catch(function (response) {
        console.log('Subscription was not able to be added.')
        console.log('- Verify environment name.')
        console.log('- Verify "Read, Write and Access direct messages" is enabled on apps.twitter.com.')
        console.log('Full error message below:')
        console.log(response.error)
      })


}

module.exports = {
  subscribeOtherUser, 
  subscribeAppOwner
}