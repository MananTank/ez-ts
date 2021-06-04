if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./lib.cjs.dev.js');
} else {
  module.exports = require('./lib.cjs.prod.js');
};