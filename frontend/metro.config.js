// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [path.resolve(__dirname, './')],
  resolver: {
    // Дополнительные настройки для резолвинга модулей (если нужно)
    // Например, если у вас есть симлинки или монорепозиторий
    // extraNodeModules: new Proxy({}, { get: (_, name) => path.join(__dirname, `node_modules/${name}`) }),
  },
};

module.exports = mergeConfig(defaultConfig, config);
