const express = require('express');

const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const eventRoute = require('./event.route');
const contactRoute = require('./contact.route');
const allCodeRoute = require('./allCode.route');
const visitRoute = require('./visit.route');
const itemRoute = require('./item.route');
const relationshipRoute = require('./relationship.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/events',
    route: eventRoute,
  },
  {
    path: '/contacts',
    route: contactRoute,
  },
  {
    path: '/allCodes',
    route: allCodeRoute,
  },
  {
    path: '/visits',
    route: visitRoute,
  },
  {
    path: '/items',
    route: itemRoute,
  },
  {
    path: '/relationships',
    route: relationshipRoute,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// /* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
