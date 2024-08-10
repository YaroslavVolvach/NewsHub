module.exports = {
  preset: 'ts-jest', // если используете TypeScript
  testEnvironment: 'jsdom', // это окружение должно быть совместимо с Jest 27
  testMatch: ['**/src/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
};
