'use strict';

const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {assetExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },

    resolver: {
      assetExts: [
        ...assetExts,
        'obj',
        'mtl',
        'JPG',
        'vrx',
        'hdr',
        'gltf',
        'glb',
        'GLB',
        'bin',
        'arobject',
        'gif',
        'fbx',
      ],
    },
  };
})();
