/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Budget = require('../api/budget/budget.model');

console.log('seeding');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

var user1, user2;

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
      User.find({}, '', function(error, users) {
        user1 = users[0];
        user2 = users[1];
      });

      Budget.find({}).remove(function() {

        Budget.create(
          {
            name: 'FakeBudget',
            info: 'A fake budget for testing',
            _owner: user1._id,
            access: [{
              _userid: user1._id
            }],
            interval: 'weekly',
            intervaldata: [{
              startdate: new Date("2014-01-01"),
              budget: 123.45
            }, {
              startdate: new Date("2014-01-07"),
              budget: 543.21
            }],
          },
          {
            name: 'Another FakeBudget',
            info: 'Another fake budget for testing',
            _owner: user2._id,
            access: [{
              _userid: user2._id
            }, {
              _userid: user1._id
            }],
            interval: 'monthly',
            intervaldata: [{
              startdate: new Date("2014-01-01"),
              budget: 100
            }, {
              startdate: new Date("2014-02-01"),
              budget: 200
            }],
          }
        );

      });

    }
  );
});

