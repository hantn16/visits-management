const express = require('express');

const config = require('../../config/config');
const tutorialRoute = require('./tutorial.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/tutorials',
    route: tutorialRoute,
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
