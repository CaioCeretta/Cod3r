##### The primary objective of these lessons is not entering in configuration/coding details, but rather on the principles
####  and motivations behind utilizing this pattern 

## Lesson 1 - Basic Example #01

### Configuration

  This lesson will start by creating a raw project, I am basically following these steps

  1. Creating a folder specific to the application
  2. Initializing a package.json and installing typescript (which will be language we are going to use), jest,  ts-jest,
  @types/jest, @types/node and ts-node-dev as DevDependencies. (@types/ is crucial for TypeScript to understand js libraries
  providing types definitions, by enabling type verification and autocomplete, ts-jest allows jest to test ts code by
  compiling it, and finally, ts-node-dev compiles and execute our ts code inside a node.js terminal automatically via
  hot-reload during the development).
  3. Run the command to initialize jest's configuration: `npx ts-jest config:init`. This command configures the **jest.config.ts**
  pointing the tests to run via typescript, and configure the jest-config
  4. Configure tsconfig. There are two notes about this file, first being outDir attribute, inside the compilerOptions
  object that defines where the files will be compiled to, and outside of compilerOptions, we are going to define a "include"
  attribute for the files any file inside src folder, meaning it will use this folder as information source
    - We could notice that, when the src folder was empty, the first { was with a red squiggly line, why is this?
      - The reason is because TypeScript and vscode, **only initialize a project** when he finds:
        1. A valid tsconfig.json, e
        2. At least one .ts or .tsx defined in the "include" attribute
      - When there is no included file, ts won´t create a project context and the editor may signal tsconfig.json as
      invalid or simply don't activate the language service for it.
  5. Within package.json, create a "test" script ta simply invokes jest and create a dev script as
    `"dev": ""`
    - ts-node-dev: Main executable, it is like node, but with direct technical support to TypeScript. It uses `ts-node`
    internally (which compiles TypeScript "on the fly") along with a watcher like `nodemon`
    - --respawn: Indicates that when the process restarts, it must be completely re-created instead of trying to reuse
    the old process.
    - --transpile-only: Means to convert the typescript to javascript without checking types 

#### Commonjs to nodenext migration

Inside the instructor code, the command line initial tsconfig, was creating the tsconfig with the type as commonjs, and 
mine created with `nodenext`, so how do i change it to utilize the new settings?
I followed some steps:

  1. Instead `jest.config.js` i created a `jest.config.ts`
  2. We specified that the config constant must adhere to the JestConfigWithTsJest interface. Which will ensure that it
  correspond exactly to the structure that ts-jest expects for this function, and it will also help us with autocompletes
  and real time error checking.
  3. Defined the preset as one required by esm
  4. Defined the file extensions, which is essential for ESM
  4. Configured the transform to inject custom tsconfig for tests
  5. Enabled isolatedModules to comply with our tsconfig's attribute and enforce that each file is treated as a separate,
  isolated module


### Codings

  After configuring the code, create a calc.ts and exported a soma function that receives two parameters and returns the
  sum, inside test, created a calc.test.ts just to test if jest is working

  
  
  

  


## Overall Concepts

### Difference between modules in tsconfig

This question was motivated by a case where my ts init, wasn't giving the same result as the lesson one. While my tests
was throwing an error of "can't use 

While in the instructor code, the generated tsconfig, consisted of a type commonjs, and with a es2016 target, the latest
typescript's version, generates one with module as nodenext and the target as esnext

But what are their differences? 

  • commonjs: When the module is defined as `commonjs` typescript does two things:

  1. transpile the import and export from our ts code to the cjs syntax (require/module.exports).
  2. Node.js/Jest, which prefer cjs, are able to load and execute the cjs compiled code with no problems.

  as a result, the error doesn't happen because by the running time. there is no instructions of import on the generated
  code

  • nodenext

    When the module is defined as nodenext (new standard for ESM), typescript does the following

    1. Keeps the import and export syntax on the generated JS (or doesn't generate code, only check the typing)
    2. Tells Node.js: "Treat this file as an ES Module"

    If the testing code is being loaded by Jest before ts-jest is able to correctly transform it to jest's esm environment,
    we will see the error

  #### Is there a solution for using the nodenext?

  To keep nodenext/esnext configuration and solving the error, we must ensure that jest is enabled to run ESM end-to-end

  This is an hybrid approach

  1. Correcting package.json (ESM Guarantee)
    Add "type": "module"

___________________________________________________________________________________________________________________________

#### /// <reference types="jest /> 

This code seems to be a comment, but it has a very specific role

##### Why is the command similar to a comment but is not? 

1. Syntax: The /// syntax is called a reference directive or triple-slash directive. It begins with three slashes, that is
a special syntax which typescript compiler and IDEs recognize.
2. Function: The compiler reads this line as a JS code, it will be ignored, but the compiler will use it to resolve the
types

##### Why is this directive necessary for the jest case? 

If we are having problems on making TS to recognize jest global functions (`test`, `expect`), and we could notice we were
getting errors with cannot find name, so there were two possible solutions

1. Global (tsconfig): Add "jest" in the types section of the tsconfig.test.json
2. Local (Triple Dash-Reference): Use the directive in the file

Even though the solution of the tsconfig.test be the "correct" and global way of configuring, sometimes, in complex setups
with Jest/TS/ESM, the compiler or the IDE may take a long time to recognize or simply faille in injecting these types on
our IDEs

Adding this directive on top of our file is a fail-safe guarantee that enforces the compiler to include the types and make
that error to vanish






## Errors

  1. When i created a package.json with the `npm init -y` command, the type attribute came as commonjs, which have a different
  syntax from the type: module that i'm used to. The main differences are

    1. Importing syntax: While commonjs uses `const module = require('name-of-package'), esm modules uses
      import module from 'name-of-package'
    2. Exporting Syntax: Commonjs uses module.exports = {...} or exports.function = {...}, while esm uses typed exports or
    default exports
    3. Commonjs loading is synchronous, it blocks the code execution until the module is fully loaded, which is typical in
    servers. Module is asynchronous, meaning that it allows the code to continue being executed while the module is loaded,
    which is essential to browsers and performance.
    4. Import usage: common is node; s historic default from node.js, while esm is the default pattern of modern JS
    5. Default extensions: While in commonjs, .js files are treated as CJS, in ESM .js are treated as ESM 

  Therefore, what type: module tells our project is saying to node.js: 
    1. Interpret all the .js and .ts files in this package as ES Modules. 
    2. Enables the modern syntax: Allows us to use import and export (as well as other features, like top-level await)
    3. Inside TS: Since we usually use the module as "nodenext" in tsconfig.json, TS adapts itself to this configuration,
    ensuring that our ts source code is verified and correctly compiled for a ES Modules environment

  



