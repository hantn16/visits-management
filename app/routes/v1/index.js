const express = require('express');

const config = require('../../config/config');
const tutorialRoute = require('./tutorial.route');
const userRoute = require('./user.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/tutorials',
    route: tutorialRoute,
  },
  {
    path: '/users',
    route: userRoute,
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
