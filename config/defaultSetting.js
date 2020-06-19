const path = require('path');

// 依赖 cdn
const JS_Externals = [
  // {
  //   packagename: 'react',
  //   exportName: 'React',
  //   link:
  //     'https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/cjs/react.production.min.js',
  // },
  // {
  //   packagename: 'react-dom',
  //   exportName: 'ReactDOM',
  //   link:
  //     'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/cjs/react-dom-server.browser.production.min.js',
  // },
  // {
  //   packagename: 'lodash',
  //   exportName: 'lodash',
  //   link:
  //     'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.min.js',
  // },
  // {
  //   packagename: 'moment',
  //   exportName: 'moment',
  //   link:
  //     'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.25.3/moment.min.js',
  // },
];

// 样式 cdn
const CSS_Externals = [];

module.exports = {
  PORT: 3001,
  favicon: path.resolve(__dirname, '../public/favicon.png'),
  title: "Elon's",
  JS_Externals,
  CSS_Externals,
};
