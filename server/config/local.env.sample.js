'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'marshfireBudgetMonitorSessionSecret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  GOOGLE_ID:        '89123597720-28thei0e9vj2mim85kqb514bnbiph6ee.apps.googleusercontent.com',
  GOOGLE_SECRET:    'sOOSInm-Hozk3hAxlw5RB6W5',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
