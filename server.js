const app = require('./app/app');

const config = require('./app/config/env');
const logger = require('./app/config/logger');
const db = require('./app/models');

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// // simple route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to bezkoder application.' });
// });

// require('./app/routes/v1/tutorial.route')(app);

let server;
// set port, listen for requests
server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}.`);
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
