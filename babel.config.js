module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:[[
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@components': './src/components',
          '@utils': './src/utils'        },
      }
    ]]
  };
};
