# Minimalist TypeScript + Node Template

We detail the setup of a minimal TypeScript project template that we can build upon for other project templates (e.g., Express, GraphQL, MongoDB). Despite being minimal, it sports hot reloading, linting, and code formatting. This has been cobbled together from a variety of resources (see below).

## Initializing the Project

Create a directory for the template and initialize a Git repo and a new Node project:

```bash
mkdir typescript-node-template
git init
npm init -y
```

Create a `.gitignore` with the following:

```text
dist/
node_modules/
```

Install some development dependencies:

```bash
npm i -D typescript tsc-watch
```

- [typescript](https://github.com/Microsoft/TypeScript) compiler
- [tsc-watch](https://github.com/gilamran/tsc-watch) watches for TypeScript file changes and efficiently recompiles them

Install the [ambient types](https://medium.com/@mikenorth/guide-to-typescript-ambient-declarations-717ef6da6514) for Node:

```bash
npm i -D @types/node
```

### Configuration

Create a default [TypeScript config](https://www.typescriptlang.org/tsconfig) file:

```bash
npx tsc --init
```

Change the following `compilerOptions` values from their defaults:

- [target](https://www.typescriptlang.org/tsconfig#target): `"es2020"` - latest version
- [module](https://www.typescriptlang.org/tsconfig#module): `"es2020"` - latest version
- [sourceMap](https://www.typescriptlang.org/tsconfig#sourceRoot): `false` - no separate source map, since we're using inline maps (default)
- [baseUrl](https://www.typescriptlang.org/tsconfig#baseUrl): `"."` - default value, but required to be explicitly set when `paths` is set
- [paths](https://www.typescriptlang.org/tsconfig#paths): `{ "*": ["./src/*"] }` - search for imports within the `src` directory
- [outDir](https://www.typescriptlang.org/tsconfig#outDir): `"dist"` - put all the built files here
- [typeRoots](https://www.typescriptlang.org/tsconfig#typeRoots): `["node_modules/@types"]` - where to explicitly look for type definitions

Add the following entries _after_ the `compilerOptions`:

```json
  "include": ["node_modules/@types", "src/**/*"],
  "exclude": ["node_modules", "dist"]
```

- `include` - tells the compiler what to include
- `exclude` - tells the compiler what to exclude

### Code Linting and Formatting

Install the development dependencies for linting:

```bash
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- [ESLint](https://www.npmjs.com/package/eslint) - the linter itself
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - ESLint parser for TypeScript
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) - ESLint rules for TypeScript

Create an `.eslintrc.js` file in the project root and add the following:

```javascript
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

Install the development dependencies for formatting:

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

- [prettier](https://www.npmjs.com/package/prettier) - the code formatter
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) - prevents conflicts between ESLint and Prettier
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) - runs Prettier as an ESLing rule

Create a `.prettierrc.js` and add the following:

```javascript
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

Along with a `.prettierignore`:

```text
node_modules
dist
package-lock.json
*.lock
.gitignore
.prettierignore
```

## Sample Code

Create a `src` directory and an `index.ts` file in it with the following code:

```typescript
class Dog {
  name: string;
  constructor(data: string) {
    this.name = data;
  }
}

const dog = new Dog('Rover');
if (dog instanceof Dog) {
  console.log(`${dog.name} is a dog`);
}
```

To test, run following command from the terminal:

```bash
npm run dev
```

## Hot Reloading

We are using `tsc-watch` to provide file watching and incremental recompilation to JavaScript (in `dist/`), which we can run the standard `node` executable on.

Add the following NPM command to the `scripts` section of `package.json`:

```json
  "dev": "tsc-watch --noClear --onSuccess 'node dist/index.js'"
```

- `--noClear` - prevents the console from clearing between recompilations
- `--onSuccess` - if the compilation was successful, then run the resulting JavaScript with Node.js

To test, run following command from the terminal:

```bash
npm run dev
```

and you should see the output: `Rover is a dog`.

Try changing the console output and saving. You should see the output in the terminal indicate that it detected a file change and, if there are no errors, your updated ouput.

## Building

Add another NPM command to the `scripts` of `package.json`:

```json
  "build": "tsc -b",
```

To build the project, simply:

```bash
npm run build
```

To test:

```bash
node dist/index.js
```

## Final Steps

Create a `README.md`, add a `LICENSE`, and commit/push! Now we have foundational template we can build on, tweaking and extending it as-needed.

## Resources

- [How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
- [Using ESLint and Prettier in a TypeScript Project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
