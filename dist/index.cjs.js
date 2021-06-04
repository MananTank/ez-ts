if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./index.cjs.dev.js');
} else {
  module.exports = require('./index.cjs.prod.js');
}
