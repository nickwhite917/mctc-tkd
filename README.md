[![Build Status](https://travis-ci.org/nickwhite917/mctc-tkd.svg?branch=product-load)](https://travis-ci.org/nickwhite917/mctc-tkd)

The back-end API includes:
1. User auth
1. Stripe integration
1. Testing via Mocha and Chai as well as Istanbul for code coverage

## Quick Start

1. Clone and install dependencies
1. Update the config:
  - Rename the *.env_sample* file to *.env* and update
  - Update the Mongo URI in */src/_config.js* (if necessary)
1. Update the key on line 1 of *src/client/js/main.js*
1. Run `mongod` in a seperate terminal window
1. Run the app - `npm start` or `gulp`
2. 
## Development Workflow

1. Create feature branch
1. Develop/test locally (hack! hack! hack!)
1. Create PR, which triggers Travis CI
1. After tests pass, merge the PR
1. Tests run again on Travis CI
1. Once tests pass, code is deployed automatically to staging server on Heroku (WIP)

## Tests

Without code coverage:

```sh
$ npm test
```

With code coverage:

```sh
$ npm run cov
```
