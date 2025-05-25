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

Choosing a rich modeling approach, with responsibilities separated into different components, is always a good option when
planning to scale a project with more complex features. It is much more maintainable than having everything centralized
in a single component, if the goal is the same.

It's a good practice to design this way even in smaller applications, so that when scaling becomes necessary, we already
know how to handle it.

## Rich Behaviors

In POO, we say that a class have rich behaviors when the class isn't only used for storing data, but it also knows and
execute the business rules or the actions make sense for that object.

It other words, it's not just a "bag of data" (row, col, type: in the Cell example), it knows how to behave in the context
of the tic-tac-toe game.

Methods like isEmpty() and isNotEmpty() encapsulate the concept of whether a cell is empty or filled. Meaning that we don't
have to write something like

if(cell.type === null)

Instead, we write something more expressive, like if (cell.isEmpty())

this improves clarity, readability , and maintainability of the code.

Comparing this to an "anemic object":

An anemic object would be a class that only holds data:

```ts
class Cell {
	row: number
	cell: number
	type: PlayerType | null
}

// Then the rules would be scattered outside the class, like:

function mark(cell: Cell, type: PlayerType) {
	if (cell.type === null) {
		cell.type = type
	}
}
```

In conclusion: This is not real OOP. It's just data structure (closer to procedural programming). It is called rich behaviors
because the class carries both the data and the rules for how that data should behave. This is a core practice of true OOP,
which isn't just about grouping data; it's about modelling behaviors.

## End comments

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

## Implementation Comments

### Tests

After finishing the player class, we were already able to think on the tests we could apply to the player. This means, that
we aren't already thinking on the graphical interface, colors, etc, but on the game logic.

This means that we aren't cascade developing, where we first do only the requisites of the app, then the docs, then another
thing, and so on. However, sometimes we model a little, then we do an experiment on the clarity so we have a higher clarity
of this modeling, then we model again, and so on.

### Core and front-end link

Within the core/src/index.ts, we import the classes (e.g. Player), and simply export it, and using this, we can simply
import these classes/types in the core index, instead of going through all the directories.

### Player Class

We start by creating the player type which simply consists of an Player enum including the values 'X' and 'O', and will be used
to type the player class type
Afterwards, we create a Player class that on its creation needs to receive the name, the type of player type — 'X' or 'O',
and the player score, and the game of this player

within the class, an addScore method, for adding the score of the player, and because we have an immutable object, e.g. an
object that once created won't change, and after the game ends, the only state we have is the player score.

Since every attribute is readonly, each one of them is immutable, and every time we have a behavior where we need to change
the object's state, this behavior returns a new instance. For example, when we call the addScore method, it returns a new
`Player` instance, with the same values, except for the score that will be the last score + the score being passed.

Other rich behavior from the `Player` is when we want to clear it, and for it, when calling the clear method, we return
a new instance of Player, with the same name and type, and the score being 0.

### Cell Class

`Cell` is The element that is the base of the whole game, an element which can either be 'X', 'O', or empty or occupied.

The `Cell` will not only be used in the game, but also in the results

Each `Cell` object includes a line, a column and the player type that marked it — either 'X' or 'O', and can also be empty
or null.

_Comments about methods in the Class _

Once an element is created, such as the class, we can now create the tests for it.
