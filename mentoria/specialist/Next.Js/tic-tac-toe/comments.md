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

## Modeling

Every time we choose to apply a pattern, we initially have a recurrent problem and a proposed solution, but that solution
wants a pattern for this problem and we will have to adapt it for the application necessity.

So for instance, if the person catalogued a problem saying that greek columns only work with light colors, which means that
if in the app, anything that refers to ancient greece, it will need to have a light color to resemblance the architecture.

But, when he started cataloguing these patterns, he noticed that by the time he was trying to apply them, someone may have
understood the pattern, and let's say that the other person used white, but used some black grooves because he though it
would be prettier for that scenario.

Modeling doesn't aim on adding complexity, but there are some different types of complexity we may face:

1: `Accidental Complexity`: These types of complexities are typically a "team choice", that sometimes complicate something
that should be simple.

2 `Intrinsic complexity`: It means that there may be complex problems, such as granting a social security benefit., the
calculus to see how much will be granted and if he is going to receive it, already has its complexities, meaning it already
has an inherent complexity.

In the tic-tac-toe we have a simple problem to solve, but we'll create a series of elements to define a modeling because
of study reasons.

## Implementation comments

The core package have within the src folder, the following:

A `Board class`, `Game Class`, a `Cell Class`, and a `Player Class`

A game consist of a board that consist of cells which the players utilize.

It also has a `Result Class`, that consist of multiple classes, which are:

. CellsChecker
. DiagonalChecker
. GameResult
. HorizontalChecker
. ResultChecker
. TieChecker
. Vertical Checker

Where the `GameResult Class` is the class that represents the final result of the game, which holds the winner, what was
the winning play.
