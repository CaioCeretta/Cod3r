# Turbo repo and tailwind comments


## Up until now

If we run the project from its root folder using `npm run dev`, we can see that it runs the front-end app defined
inside the apps folder. However, it still doesn't recognize the core project yet, so we need to establish the connection
between the front end app and the package we created in the core workspace.

## How do we create this link?

1. First, we need to make sure that package.json in the core package has its main field pointing to the correct entry file.
By default this is usually in index.js, but in our case, it should be `./src/index.ts`
From our src/index.ts, we import all the necessary files and export the classes/interfaces/types defined in the project.

2. If we have many files to export, it's a good practice to create an index.ts inside each folder, export the relevant parts
there, and then aggregate all exports inside the main `index.ts`. This way, we keep the exports organized and maintainable.

3. The `name` field in the `package.json` of each workspace is crucial for linking between packages in the monorepo. We
use this name to declare dependencies inside other packages, for example, inside the front-end's `package.json`, we declare
a dependency on the `core` package by its workspace name.

4. After adding the core package as a dependency in the front-end's package.json, we need to run the `npm i` again in the.
It ensures the front-end treats core as a local node package.
Without using a monorepo tool, the only way to separate projects like this would be to publish the `core` to npm, which
would be very time-consuming because every change would require republishing and reinstalling the package.

5. The main advantage of using turbo-repo (or similar monorepo tools) is to organize multiple separate projects in one
repository without the need to publish them individually to npm. This significantly speeds up development and integration.

6. Once we declare the core package as a dependency in the front-end, we can import everything that the core package exports,
7.  giving us access to all shared classes, types, and utilities defined at the core of our application.




