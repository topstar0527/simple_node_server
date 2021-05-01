const env = require('dotenv').config
const minimist = require('minimist')

const envOpts = env({silent: true}) || {}
const cliOpts = minimist(process.argv.slice(2))

const options = Object.assign(envOpts, cliOpts)

module.exports = options
