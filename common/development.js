'use strict';

var github = require('./github.credentials');
var meetup = require('./meetup.credentials');

module.exports = {
  debug: true,
  mail: {},
  github: github,
  meetup: meetup,
  labels: {
    job: 'jobs',
    talk: 'talk',
    proposal: 'talk proposal'
  },
  twitter: {
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  }
};
