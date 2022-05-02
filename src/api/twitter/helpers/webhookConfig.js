const request = require('request-promise');
const { config }  = require('../../../../dist/config/config');

const twitterOauth = config.twitter.twitterOauth;
const webhookUrl = config.twitter.webhookUrl

/**
 * twitterEnv - twitter app developer environment add/view/update in https://developer.twitter.com/en/account/environments
 */
const twitterEnv = 'development';

/**
 * createWebhook - Creates the webhook for the main app.
 * Required if app access has been revoked or password has changed.
 *
 * 1. Update twitterCredentials in config if needed.
 * 2. Run in CMD: node -e "require('./src/api/twitter/helpers/webhookConfig.js').createWebhook()"
 */
const createWebhook = () => {
  console.log('here')
  const request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/all/' + twitterEnv + '/webhooks.json',
    oauth: twitterOauth,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      url: `${webhookUrl}`
    }
  }
  console.log('request_options', request_options)
  request.post(request_options).then(function (body) {
    console.log(body)
  }).catch(function (body) {
    console.log(body)
  })
}

/**
 * getWebhook - retreive webhook config
 * Run in CMD: node -e "require('./src/api/twitter/helpers/webhookConfig.js').getWebhook()"
 */
const getWebhook = () => {
  const request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/all/' + twitterEnv + '/webhooks.json',
    oauth: twitterOauth
  }
  request.get(request_options, function (error, response, body) {
  console.log({body})
  console.log({error})
  })
}

/**
 * deleteWebhook - deletes the webhook for the main app (escalate app).
 *
 * 1. Update twitterCredentials in config if needed.
 * 2. Run in CMD: node -e "require('./src/api/twitter/helpers/webhookConfig.js').deleteWebhook()"
 */
const deleteWebhook = () => {
  let request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/all/' + twitterEnv + '/webhooks.json',
    oauth: twitterOauth
  }
  request.get(request_options).then( function (body) {
    console.log({body})
    const webhook_id = JSON.parse(body)[0].id
    request_options = {
      url: 'https://api.twitter.com/1.1/account_activity/all/' + twitterEnv + '/webhooks/' + webhook_id + '.json',
      oauth: twitterOauth,
      // resolveWithFullResponse: true
    }
    return request.delete(request_options)
  }).then(function (response) {
    console.log('HTTP response code:', response.statusCode)
    if (response.statusCode == 204) {
      console.log('Webhook config deleted.')
    }
  }).catch(function (error, response, body) {
    console.log('Error deleting webhook config or no webhook exists.')
    console.log('HTTP response:', error)
  })
}

module.exports = {
  createWebhook,
  getWebhook,
  deleteWebhook
}
