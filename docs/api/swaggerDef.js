module.exports = {
  info: {
    title: 'WorkspaceX - Room Booking',
    version: '0.0.1',
    description: 'WorkspaceX API documentation'
  },
  host: 'localhost:3002',
  // host: 'localhost:7778',
  basePath: '/',
  apis: [ './src/component/**/*.route.js' ],
  schemes: [ 'http' ],
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
};
