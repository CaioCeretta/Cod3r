

### Overall Comments


• Project initial configuration

1- We will start by configuring a turbo-repo project
2 - Create a new nest app inside apps folder
3 - Create a shared folder inside packages, which will hold common components that will be used for all the modules.
4 - Create an auth folder inside packages, and inside of it, adapter/code/web folders
5 - Install the tsup dependency inside shared/core folder and create a build script using tsup
6 - add `"packages/*/*"` inside the root package.json for it to encounter packages that are inside other folders
7 - after the build, point the "main" to "index.js" and "types" to "index.d.ts"
8 - Make sure that the backend depends on the shared package
9 - modify nest-js dev script to access directly node and try to trick it in case nest.js still has troubles with turbo repo 
10 - Create a next project inside apps folder
11 - in the root folder, execute npm i
12 - Create a db folder inside the apps and start a docker postgre container
13 - inside the auth folder inside packages, create a package.json inside core, name it and add it as dependency for backend
and frontend


• Sometimes, it is good to create nested folders. Assume we have a financial system, which will be divided in some modules.
A part dedicated to the authentication, other dedicated to finances, other to investments, and so on. And when we start
to look into this kind of applications, and we start to think in the app in a modularized manner, instead of simply create
a code that holds everything, we will want to modularize it. Therefore, inside the authentication module we can have
multiple applications inside (e.g. a core business, a web module with our gui, a specific backend, and more.). And this
behavior will help us understanding what are the boundaries from one module to the other. 

• Our first objective is to use a shared code inside frontend and backend, and that is the reason to create the shared/core
folder inside packages. Because this way we won't think that a code must be in the frontend or the backend. This means that,
for example, by creating a method inside the shared/core, we expect it to be available on both environments. We can test it
by going into the backend´s package.json and adding the "@ddd/shared" dependency

• Prisma CLI modified the format of the default generated DATABASE_URL. In case url generated is different from what
we are used to, and we are not making use of PrismaAccelerate or external services that require Connection Proxy, 
change the database url back to the previous format:
`DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"`

• What is "CQRS"? 
  CQRS is a pattern that essentially aims to segregate the part of commands, that are things that generate impact/alteration
  in the DB and the part of queries. 

• We can organize inside the module, through the aggregates. Therefore, we will create folders, and these folders we will
organize them by aggregate. Suppose that inside the authentication module we have the concept of a group of users, and a
group of users have their own life cycle. And in the user aggregate we will put the models, use cases and everything needed
to make this aggregate to work
  - Many times it is more important to separate the app by aggregate rather than by technology.

• Create a usecase file inside auth, in this file create an interface to define the signature of a use case, e.g.: 
UseCase<IN, OUT>, export it from the index of the package and share this same annotation across the whole app

● Monorepo Export Pattern (Public API)

The most effective pattern for managing communication and dependency in monorepos is establishing a single, well-defined
entry point for each package, this way creating a clear public api

The goal of this pattern is for consuming packages (apps or other libs within monorepos) to import functionalities without
needing to know or depend on the internal folder structure of the source package, simplifying refactoring and ensuring
stability.

### Implementation

For every package (e.g. /packages/auth), we must create an index file, like index.ts, at its root. This file will serve
as the only official exit point. The role of it is going to explicitly re-export only the functionalities intended to be
externally accessible.


```ts
  export { ComponentA } from 'src/ui/componentA'
  export * from '/src/utils/FunctionB'
  export type {interfaceC} from 'interface/utils/interfaceC'
```

### Consumption: Clean Imports / Barrel Export

A good and common practice inside monorepos is using `Scoped Names`, therefore, using a specific name inside package.json
name attribute, something like "@namespace/folder" like `"name": "@ddd/shared", avoid conflicts, it will have a clear
origin of the library, and will improve organization.

#### Barrel Export 

The **Barrel Export** pattern, is a pattern where the top-level index file acts as a "barrel" collecting and re-exporting
contents of its sub-directories.

Assume we have a structure like

/packages/auth/
├── src/
│   ├── usuario/
│   │   ├── usuario.interface.ts
│   │   ├── usuario.service.ts
│   │   └── index.ts  <-- Index for 'usuario'
│   ├── permissao/
│   │   ├── permissao.interface.ts
│   │   └── index.ts  <-- Index for 'permissao'
│   ├── grupo/
│   │   └── index.ts  <-- Index for 'grupo'
│   └── index.ts      <-- Root Index (The "Main Barrel")

then, the content of an internal barrel would be (e.g., src/usuario/index.ts)
```ts
// Collects all public exports from the 'usuario' module
export * from './usuario.interface';
export * from './usuario.service';
```

Once each sub folder has its own barrel (index.ts), the top-level index file `src/index.ts` simply re-exports everything
from those sub folders

**Content of `src/index.ts`**

```ts
// Re-export everything from sub-modules
export * from './usuario';
export * from './permissao';
export * from './grupo';
```

• Build failed related to the Module Resolution

This error happens because the esbuild/rollup are not being able to find the correct path for the module we are trying to
import

This error essentially occurs when we are trying to import something from a specific folder, but the module system (be it
node or esbuild during the compiling) isn't able to find that file.

TS will give us a hint of the problem, with

DTS Build Start and questioning if we forgot to set the moduleResolution as 'nodenext'

This means that the compiler is suggesting that we need to add this property in order to solve the way it resolves modules.
Which is by adding it to the tsconfig.json

In this case, we are using turbo-repo and in its default packages, we have a typescript-config project, which we will modify
its name in package.json and use this dependency for every tsconfig we have.

• Use cases can be called through the front-end

Use cases can be accessed both via the frontend and the backend. As long as there are appropriate adapters for each context. 
However, there are some cases where we should opt for prioritizing each.

. Backend: The primary rule, is that it should be used in use cases that:
  - Use cases that require access to the database
  - Involve integration with external services (third-party apis) — such as a payment via stripe or pagseguro.
  - Contains complex or crucial business logics 
  - Involve sensible data and security

. Front-end
  Although less common, there are scenarios where they can and should reside in the FrontEnd to improve the user experience,
  performance and responsiveness, which are:

  - Use cases that handle only the local UI state (presentation data)
  - Orchestrate complex presentation logic
  - Execute immediate validations

• Immutable Models

Immutable models are models we can't alter their value after its creation. The immutability in classes, is similar to
the states.

• States: Essentially we assign new constants with the new values, for example:

. Products Array: In an array there are a few possibilities: 

1. If we intend to add a new value to this array, we don't modify it by using push, instead, we define a new constant
and assign it the spreading of the current objects, and adding the new item.

2. If we intend to remove something, we can use maps or filters to generate a new array from the existing one, and assigning
that new array to a new constant, and then, set the previous state value, as this new one

. Product item

Or we define a new constant with every new attribute, or we spread over the existing attributes of that product item constant
and modify only the attribute we want, e.g. `const newProduct = setProduct({...product, {name: "anyName"}})`

• Classes

In classes we work with readonly attributes and clones to preserve the immutability

Cloning is the idea of instead of modifying object properties, we clone a existing object, using new attributes, which can
be something like:
```ts
  clone (props: Partial<UsuarioProps>): Usuario {
    return new Usuario({...this.props, ...props});
  }
```



• Named attributes

One good practice, instead of creating a object like

```ts

  export default class Usuario {
    constructor(    
      private readonly _id: string,
      private readonly _nome: string,
      private readonly _email: string,
      private readonly _senha: string,
      private readonly _createdAt: Date
    ){}
  }

  const usuario = new Usuario(
    "1",
    "Caio",
    "caio@zmail.com",
    "123456",
    new Date(),
  );

  console.log(usuario)

```

When we choose to create a class this way, we can possibly encounter constructors where we may have multiple boolean attributes,
or booleans and we may lose track of the properties order, or worse, don't even know what the property should be.

#### Best Approach 

Instead of only creating the class, create an interface with all its properties and centralize all the  object properties
inside a single place, and use the properties as a parameter for the constructor, destructuring or not. In case we choose
not to destructure, every property will be inside a props (or whatever name we choose).attribute, with

e.g. `export default class Usuario { constructor(readonly props: UsuarioProps) {} } `

and for the object creation, we need now to name the exports based on the props, and this will improve the readability,
since it also will help us with the auto complete

```ts
  export interface UsuarioProps {
	id?: string;
	nome?: string;
	email?: string;
	senha?: string;
	createdAt?: Date;
}
	constructor(readonly props: UsuarioProps) {}

const usuario = new Usuario({
	id: "1",
	nome: "Caio",
	senha: "123",
	email: "caio@zmail.com",
	createdAt: new Date(),
});
```
 




