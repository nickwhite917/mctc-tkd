var config = {};

// mongo uri
config.mongoURI = {
  development: "mongodb://localhost/mctc-tkd-dev",
  test: "mongodb://localhost/mctc-tkd-test",
  stage: process.env.MONGOLAB_URI
};

module.exports = config;