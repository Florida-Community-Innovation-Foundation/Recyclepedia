module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Add the module-resolver plugin
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "~": "./",
          },
        },
      ],
    ],
  };
};
