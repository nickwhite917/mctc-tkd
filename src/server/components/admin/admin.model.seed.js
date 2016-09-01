var passport = require('passport');
var User = require('../user/user.model');


var seedAdmin = function() {
  User.find({}, function(err, documents) {
    if (documents.length === 0){
      var password = 'admin12';
      var user = new User({
        email: 'nick@nickwhite.us',
        admin: true,
        password: password
      });
      user.generateHash(password, function(err, hash) {
        user.password = hash;
        user.save();
        console.log('Dummy admin added!');
      });
    }
  });
};

module.exports = seedAdmin;