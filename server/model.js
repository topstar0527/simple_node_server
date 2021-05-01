const Promise = require('bluebird')
const db = require('./database')
const config = require('./config')

const url = config.forum || ''

module.exports = exports = {}

// TODO: Write functions according to spec

exports.getAccessToken = (accessToken, done) => {
  console.log('getAccessToken', accessToken)
  db('nodebb.tokens').find({ accessToken }, res => {
    console.log(res.documents)

    done(res.documents.length ? res.documents[0] : false)
  })
}

exports.getClient = (clientId) => {
  console.log('getClient', clientId)
  clientId = parseInt(clientId)
  return new Promise((resolve, reject) => {
    db('nodebb.clients').find({ clientId }, res => {
      if (res.documents.length) resolve(res.documents[0])
      else reject(false)
    })
  })
}

exports.getRefreshToken = (refreshToken) => {
  console.log('getRefreshToken', refreshToken)
  return new Promise((resolve, reject) => {
    db('nodebb.tokens').find({ refreshToken }, res => {
      if (res.documents.length) resolve(res.documents[0])
      else reject(false)
    }).catch(err => console.log(err))
  })
}

exports.getUser = (username, password) => {
  console.log('getUser', username, password)
  return new Promise((resolve, reject) => {
    request.post({ url, form: { username, password } }, (err, res, body) => {
      body = JSON.parse(body)

      body.id = body.uid

      if (res.statusCode === 403) return reject(body)
      if (res.statusCode === 200) return resolve(body)
      if (res.statusCode === 400 && !password) return reject('Invalid Password')
      if (res.statusCode === 400 && !username) return reject('Invalid Username')
      resolve(body)
    })
  })
}

exports.getAuthorizationCode = (authorizationCode) => {
  console.log(authorizationCode)
}

exports.saveToken = (token, client, user) => {
  console.log('saveToken', token, client, user)
  return db('nodebb.tokens').save({
    accessToken: token.accessToken,
    accessTokenExpiresOn: token.accessTokenExpiresOn,
    refreshToken: token.refreshToken,
    refreshTokenExpiresOn: token.refreshTokenExpiresOn,
    clientId: client.id,
    userId: user.uid
  })
}

exports.saveAuthorizationCode = (authorizationCode) => {
  console.log('saveAuthorizationCode', authorizationCode)
}
