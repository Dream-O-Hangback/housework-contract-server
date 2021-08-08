module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '@auth/(.*)': '<rootDir>/src/auth/$1',
        '@common/(.*)': '<rootDir>/src/common/$1',
        '@mails/(.*)': '<rootDir>/src/mails/$1',
        '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
        '@models/(.*)': '<rootDir>/src/models/$1',
        '@providers/(.*)': '<rootDir>/src/providers/$1',
        '@repositories/(.*)': '<rootDir>/src/repositories/$1'
    },
}