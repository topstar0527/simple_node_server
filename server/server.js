const express = require('express')
const OAuthServer = require('express-oauth-server')
const model = require('./model')
const bodyParser = require('body-parser')

const app = express()
app.oauth = new OAuthServer({
  model,
  grants: ['password'],
  debug: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(app.oauth.authenticate())

app.use(function(req, res) {
  res.send('Secret area');
});

module.exports = app
