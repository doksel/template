const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    ident: "postcss",
    localIdentName: "[local]--[hash:base64:5]"
  })
);

// const rewireLess = require("react-app-rewire-less-modules");

// module.exports = function override(config, env) {
//   config = rewireLess(config, env);

//   return config;
// };
