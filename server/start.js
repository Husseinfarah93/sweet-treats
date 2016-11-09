'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const User = require('../db/models/user');
const session = require('client-sessions');

// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const pkg = require('APP')

const app = express()

if (!pkg.isProduction) {
  // Logging middleware (dev & testing only)
  app.use(require('volleyball'))
}

module.exports = app
  // We'll store the whole session in a cookie
  // .use(require('cookie-session') ({
  //   name: 'session',
  //   keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
  // }))
  .use(session({
    cookieName: 'session',
    secret: 'lakjdfoiasnalsjlafglakvlasmcoim93849384750734985km8cheerios',
  }))

  //above does it for us but what about duration???? assuming keys are secret

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  .use(passport.session())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve our api
  .use('/api', require('./api'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

if (module === require.main) {
  // Start listening only if we're the main module.
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
