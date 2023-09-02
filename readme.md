# Backend Node (Week 7)

TS - Eslint - Jest
Node - Express - Mongoose

## Setup

### Setup inicial: TS - Eslint - Jest

- npm init
- git init
- .editorconfig
- .gitignore
- TS

  ```shell
  npm i -D typescript @types/node
  ```

tsconfig

  ```shell
  npx tsc --init
  ```

ESModule Config: package.json

```json
  "type": "module"
```

- ESLint

```shell
npx eslint --init
npm i -D eslint-config-prettier
```

Eslint config

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": ["xo", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

Prettier config: package.json

```json
  "prettier": {
    "singleQuote": true
  }
```

- Jest

```shell
npm i -D jest ts-jest @types/jest jest-ts-webcompat-resolver
```

jest config

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['index.ts'],
};
```

### Setup Node: Express - Mongoose

```shell
npm i -D nodemon
npm i cross-env dotenv debug
npm i -D @types/debug
npm i express cors morgan
npm i -D @types/express @types/cors @types/morgan
npm i mongoose
npm i -D @types/mongoose
npm i bcrypt jsonwebtoken
npm i - D @types/bcrypt @types/jsonwebtoken
```

## Basic server

## Node server

- debug -> NameSpace W7E:Index
- dotenv config

- PORT from process.env or default value
- create server with express app

- server listen
- server on events:
  - listening -> address() + console
  - error -> console + exit(-1)

## Express App

- debug -> NameSpace W7E:App
- app -> express()

- middleware
  - morgan
  - cors
  - express.json
  - express.static

- public content
  - favicon.ico / svg
  - index.html
  - style.css

route for all others -> next(HttpError)

## Error Management

class HttpError extends Error

Error Middleware -> res.json()
