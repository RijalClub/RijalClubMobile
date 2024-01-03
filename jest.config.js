module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
    moduleDirectories: ['node_modules', './src'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|@gluestack-ui/*|@gluestack-style/*|@legendapp/*|react-native-svg)"
    ],
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [151001]
            }
        }
    }
};