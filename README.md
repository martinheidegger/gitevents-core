[![Docker Repository on Quay](https://quay.io/repository/gitevents/gitevents/status "Docker Repository on Quay")](https://quay.io/repository/gitevents/gitevents)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/GitEvents/core)
[![Stories in Ready](https://badge.waffle.io/GitEvents/core.svg?label=ready&title=Ready)](http://waffle.io/GitEvents/core)

# GitHub Issues + Your Event = GitEvents

You're organising a Developer user-group. You use GitHub Issues in your day job to manage your workflow.  You're having trouble managing your event.  Why not solve your problem with the tools you know.  

GitEvents uses a **GitHub Issues** to create, track and manage your **Events** as _Milestones_ and book **Talks** as _Issues_, which a progressed through a simple **Workflow** as _Labels_.

It uses GitEvents web-hooks to talk to a node.js service which listens to your GitHub Issues.  This propogates events out to Social Networks (Facebook, Twitter, Google+) and Event Management sites (Tito, Meetup, Facebook, Google+) and keeps people informed (Tweets, Status Updates, Email).

## How do I use it?
### What do I need?

1. A github _Account_. <https://github.com/join>
1. A _Repository_ per organisation. <https://github.com/new>
1. A _Personal Access Token_ able to edit your repository
1. A public web-server to host the software
1. A GitHub Repository for your event or usergroup (example: [BarcelonaJS](https://github.com/BarcelonaJS/BarcelonaJS))
1. `Issues` enabled on that repository (you can activate `Issues` in the repository settings)
1. From the settings in `Webhooks & Services` create a webhook to your service ip (example: http://barcelonajs.org/github/delivery). `/github/delivery` is the required path.
1. A personal access token for the organisation or your profile, including repo write access (https://github.com/settings/tokens)


### Almost-just-one-click-ready-to-launch version:

1. Create a secret [gist](https://gist.github.com) with your production config. Name it `gitevents.js` (needs to contain at least github api token and repository info)
  1. Go to https://github.com/settings/tokens and create a token for your GitEvents application
  1. Create the gist with the contents:
  ```
    'use strict';

    module.exports = {
      debug: true,
      mail: {},
      url: '<your usergrup website url',
      github: {
        user: 'organisation_github_user',
        repo: 'github_repo_name',
        token: 'access_token'
      },
      labels: {
        job: 'jobs',
        talk: 'talk',
        proposal: 'proposal'
      }
    };
  ```
  1. If you want meetup.com support, add this under `github`:
  ```
  meetup: {
    token: 'access_token',
    group: 'group name',
    group_id: group id,
    duration: 7200000,
    default_venue: default_venue_id
  }
  ```
1. Log in to [Digital Ocean](https://www.digitalocean.com) and [create a Droplet](https://cloud.digitalocean.com/droplets/new)
1. Name your droplet `gitevents`
1. Choose $5/month size
1. Choose Frankfurt 1 as datacenter (or whatever you want)
1. Choose `CoreOS` as image (`stable` or `beta`)
1. Select 'User Data' and copy `cloud-config.yml` into the field
1. Change `<token>` with an etcd token from [https://discovery.etcd.io/new?size=1](https://discovery.etcd.io/new?size=1)
1. Change `<production.js>` with the RAW link of your secret(!!!) gist
1. Add your SSH keys (normally you wound't neet to log in, but just in case)
1. Click `Create`


1. For meetup, create `common/meetup.credentials.js` with the contents:
```
module.exports = {
  token: '[your api token]',
  group: '[your group]',
  group_id: [your group id],
  duration: 7200000, // default duration: 2h
  default_venue: 12260922 // default venue: Mobile World Centre, Barcelona
};
```
1. Run the service on your trusted node.js platform


### How to run gitevents locally / as a developer

1. Start the development server: `npm run dev`
2. Start localtunnel (`npm i -g localtunnel`): `lt -p 3000`
3. Go to your test-repo webhook settings: `https://github.com/<you>/<repo>/settings/hooks`
4. Add or modify the webhook with the localtunnel url
5. Create, label, and play with issues and milestones

Or:

Run the tests:

    npm run test

### Implemented so far:
- GitEvents Core
- Meetup.com plugin to create and update meetups.

### Coming soon
- Twitter updates
- Mailchimp Newsletters



## Contribute

    git clone https://github.com/GitEvents/core.git
    npm install
    npm run test

## Backlog / Milestone
- Stabilise core functionality and github issue handling
- Test and fix meetup.com event creation and updates
- Tests for various use-cases: updating events, talks, proposals etc.


## Contact

You can always get in touch in our community chat on [Gitter](https://gitter.im/GitEvents/core).

### Want to help?

Talk to [PatrickHeneise](https://twitter.com/PatrickHeneise) from BarcelonaJS or [IanCrowther](htts://twitter.com/iancrowther) from LNUG if you need any help. We can set up pair programming sessions for node.js beginners or for specific solutions (f.e. tests).
