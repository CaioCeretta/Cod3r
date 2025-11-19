## Lesson 1-2 - Overview

The heart of the ca book and the ddd book, is decoupling our business rule from infra and framework. The decoupling is
important because we don't want our rules to be interfered by anything a framework my "feel". We want it to walk independently
of all the rest. 

## Lesson 3~5 - Configuring


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




### Overall Comments

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

• Why `Usuario` folder with a model, use case and repository folder is considered an aggregate?
  
  

• We can organize inside the module, through the aggregates. Therefore, we will create folders, and these folders we will
organize them by aggregate. Suppose that inside the authentication module we have the concept of a group of users, and a
group of users have their own life cycle. And in the user aggregate we will put the models, use cases and everything needed
to make this aggregate to work
  - Many times it is more important to separate the app by aggregate rather than by technology. We can think of a