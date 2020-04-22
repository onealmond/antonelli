process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
}
