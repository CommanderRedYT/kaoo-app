module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
        production: {
            plugins: ['react-native-paper/babel'],
        },
    },
    plugins: [
      [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@src': './src',
                    "@root": "./",
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
