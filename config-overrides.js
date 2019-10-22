const {override, fixBabelImports, addLessLoader,addDecoratorsLegacy} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
  // 装饰器配置 包装复杂的高阶函数组件
  addDecoratorsLegacy(),
);