## Turbo build

The idea behind it is to create a single repository, and inside of it, develop multiple projects: such as front-end,
mobile, pdv, totem, controlling all of them inside one repository —. This monorepo helps us controlling the application
build, the dependencies between the projects, besides we no longer need to control, and publish each one in npm, in order
to use them. Because they are in the same repository, we no longer have the necessity of publishing it before using it
as a dependency.

Its work is basically managing the build process and controlling the dependencies between the project.

In turbo-repo default initialization, it will create three projects within the app folder, as well as packages with eslint
config and typescript configs and the ui (project that exports components used in different projects).

By running npm run dev, we'll notice that the two projects, from the app folder, are going to run at once, the web and
the docs.

## Core Project

The project core represent the business rules of our application.

It is typically located in the `packages` folder, within this core module, no framework-specific code should be included.
The structure consists of a `src` and `test` directory, along with a `package.json` file that lists dependencies such as
jest and typescript.

When we need to reference an internal project — that is, other projects within the same monorepo — we can do so by using
the appropriate workspace alias. For example, a UI project created with the turbo command might include a dependency like
"@repo/eslint-config": "\*" in its package.json.

This setup ensures a clear separation of concerns: the core remains framework-agnostic and focused on application logic,
while the other layers, such as the UI, handle integration and presentation.

In our project, the frontend will depend on the core project — but not the other way around. One of the key advantages of
this separation is that core has no access to the frontend, ensuring a strict dependency flow.

The first benefit of this structure is that we can prevent any accidental coupling of frontend-related code (such as Next.js
components or logics) within the core.

The second benefit is that, although it's technically possible to build a well-structured and organized application within
a single folder or monorepo, splitting responsibility into clearly defined folders and packages is far more didactic and
scalable. It makes the architecture easier to understand, navigate and maintain, specially as the project grows.

This reflects the concept described in the book Clean architecture, where he emphasizes the importance of creating a
"screaming architecture" — an architecture that immediately communicates its intent. That means anyone looking at the
structure of our project should be able to understand its purpose and domain at a glance, just by looking at how the modules
and packages are organized.

With that in mind, isolating the application's core logic brings a number of benefits:

. Clear separation of concerns
. Improved testability
. Better reuse across environments (e.g., CLI, frontend, backend)
. Reduced risk of unintended dependencies
. Increases maintainability and onboarding clarity

By structuring our architecture this way, we not only follow best practices but also make the system more explicit, intentional,
and robust in the long term.

Within the core folder, a tsconfig.json and a jest.config.js are also going to be created and ts-config will import
and use the configuration implemented in typescript-config package.

At last, we'll add as devDependencies, the packages inside the monorepo (e.g. eslint-config, typescript-config), and run
a npm install and the core project will be finally created.

For a script to run, such as test, we need to add the test script in the core package, after it, inform turbo repo that
a test script exists, and for it, create a new object inside tasks of test: {}, and inside monorepo's core package.json,
utilize the turbo run test, and turbo run will make every project script build/test/lint to execute.
