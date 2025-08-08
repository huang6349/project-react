const extraBabelPlugins = [
  ['import', {
    libraryName: 'react-use',
    camel2DashComponentName: false,
    customName(/** @type {string} */ name) {
      const libraryDirectory = name.startsWith('Use')
        ? 'lib/component'
        : name.startsWith('create')
          ? 'lib/factory'
          : 'lib';
      return `react-use/${libraryDirectory}/${name}`;
    },
  }, 'react-use'],
];

export default extraBabelPlugins;
