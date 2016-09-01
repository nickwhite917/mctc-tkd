var config = {};

// mongo uri
config.mongoURI = {
  development: "mongodb://localhost/mctc-tkd-dev",
  test: "mongodb://localhost/mctc-tkd-test",
  production: process.env.MONGODB_URI
};

module.exports = config;