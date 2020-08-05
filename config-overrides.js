const {
  override,
  fixBabelImports,
  addLessLoader
} = require('customize-cra');
const them = require("./them.json")
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: them
  })
);