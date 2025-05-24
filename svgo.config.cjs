module.exports = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: false,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: 'prefixIds',
      params: {
        prefixIds: true,
        prefixClassNames: false,
      },
    },
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
};
