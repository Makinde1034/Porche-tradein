module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          node: 'current',
          browsers: [
            'edge >= 17',
            'firefox >= 60',
            'chrome >= 67',
            'safari >= 11.1',
            'ie >= 11',
          ],
        },
        useBuiltIns: 'entry',
        corejs: {
          version: '3',
          proposals: true,
        },
      },
    ],
  ];
  const plugins = [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
  ];
  return {
    presets,
    plugins,
  };
};
