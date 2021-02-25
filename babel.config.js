module.exports = function(api){
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin',
      ["module:react-native-dotenv",{
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": true,
        "allowUndefined": false // for safe mode, it's highly recommended to set allowUndefined to false.
      }],
    ],
  };
};
