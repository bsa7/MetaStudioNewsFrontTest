const path = require('path');
const resolvePath = (pathname) => path.resolve(__dirname, pathname)
const webpack = require('webpack');

module.exports = {
  alias: {
    "@actions": resolvePath("../../src/actions"),
    "@components": resolvePath("../../src/components"),
    "@config": resolvePath("../../config"),
    "@constants": resolvePath("../../src/constants"),
    "@lib": resolvePath("../../src/lib"),
    "@reducers": resolvePath("../../src/reducers"),
    "@src": resolvePath("../../src"),
  },
  resolvePath,
  webpack,
}
