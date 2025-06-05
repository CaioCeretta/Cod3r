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

So when the instructor talks about riche behaviors, que is referencing the idea that the class should not be just a "grouping
oda data (attributes)", but should also encapsulate the business rules and relevant behaviors for that object.

In other words, a class stop being anemic (only data and no logic) and start being rich, which means that it also has behaviors
that make sense for itself.

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

`Cell` is the base element of the entire game, an element which can either be 'X', 'O', or empty or occupied.

The `Cell` will not only be used in the game, but also in the results

Each `Cell` object includes a line, a column and the player type that marked it — either 'X' or 'O', and can also be empty
or null.

_Comments about methods in the Class _

Once the class is created, such as the class, we can now create the tests for it.

### Board Class

An array of lines and columns are going to be the only attribute of this class: e.g. Cell[][]. And it will have methods
for creating an empty board, and others for the board and cells structure which will be commented inside the class.

How does flattening of an bi-dimensional array works?

Flattening is basically converting a 2D array (array of arrays) into a 1D array (single list of elements)

Example:

const array2D = [
[1, 2, 3],
[4, 5, 6],
[7,8,9]
]

After flattening:

const flattened = [1, 2, 3, 4, 5, 6, 7, 8, 9]

_Comments about methods in the Class_

No behaviors created in the class change the board state. There are methods to create, verify how many lines, columns,
one for flattening and retrieving the state — but it won't change the state — get one particular cell after get, verify
if one cell is empty and if the board is full, none of these alter the state

The only method that will indeed alter the board's state is the `set` method, where we pass the number of the line, of the
column and the player, and by the end of it, it will return us a new instance of Board with the altered state.

This method, also includes the rich behaviors of other components, such as markWith from the `Cell`.

Once the class is created, we can now create the tests for it.

### Game Result Class

In the Game Result class we have attributes to know which was the winning move and who made it, to get the player type
and a private tie attribute for cases where the winningMove is empty and it will be private for calculation purposes.

_Comments about methods in the Class_

Once the class is created, such as the class, we can now create the tests for it.

### ResultChecker Interface

Result checker is basically an interface that receives a board as input and returns us the game result

For example: If we are verifying a horizontal result, it can say that both the game is in progress, because no winning
game was found, and by checking the vertical one, it may say that the game is complete because one winning move was
found.

By the time we are uniting these results, we pass it through different logics and at the end, we get the result and check
if it was a win or a tie.

The merge method is for uniting the results, but the result itself, by calculating the results received, it should be able
to set result priorities in the array received, such as a winning game has a higher one than an inProgress game.

The instructor thought: "No, i don't want to put all these logics inside only one place and used another way where we can
create an interface with a common behavior and we would have all these logics being implemented in an independent manner
(e.g. diagonal, horizontal, vertical, ties).

But he started noticing that all the result verification involved getting a set of Cells and see if they were filled with
the same player. Then, he created a CellChecker class to help in this process

### Cell Checker Class

The `CellChecker` Class will implement `ResultChecker` and on its constructor it receives a set of numbers to verify

and in the end it checks the array with rows and cols, and will verify if all those elements are from the same type
and if yes, it will pass to the GameResult class these winning cells

As the final method called in the addMove, is the players one

### Game Class

Now that we have completed all the calculations and verifications, the final class in our domain modeling is the `Game class`.

. It has a `private constructor`, meaning that it must have a static method to create a new `Game`

. It receives: `Player`, `board`, `firstPlayer`, `currentPlayer`, and `gameResult` — an instance of theGameResult class,
which is initialized empty

. The static method to create the game — since we are not using the constructor directly — simply receive the players,
and return an empty board along with the provided players.

. When a game is created by clicking the button, it starts a new round with the `other player playing first`. To handle
this, we created a method with rich behavior called `nextRound`, which returns a new `Game` instance with the player
switched.

. The game results do not reset because they are tied to the player instances within the game. These instances will be
reused until the end, including the number of ties.

#### Other required methods:

. `clear()`: Similar to nextRound, but it also resets the players' scores.
. `calculateResult(board)`:  Runs the logic to determine whether there is a winner or a tie based on the current state
of the board
. `addMove(row: number, col: number)`: This method is simple:

    . it first checks whether the targeted cell is empty and whether the game is still in progress.

    . If both checks pass:

        . It retrieves the board.
        . Fills the cell with the current player's symbol
        . Recalculates the result with the updated board

    . Then, it calls a method named `players()`, which returns an array of players with the updated result, and uses a
    switchPlayer() method which simply reverse the starting order.
 
    . Lastly, it will return a new `Game`, with the new first player, and everything that is on the state.


### How the code communicates

### 4.

❓ How the application works in the end?

For this, let's break down a part of the application to make everything clear

1. `ResultChecker` (interface)

. This is an interface, meaning it defines a contract for classes.
. Any class that implements ResultChecker must have a method called check(board: Board): GameResult

. Purpose: it ensures that any kind of rule-checking logic for the game result follows the same function signature.

2. `GameResult` (Class)

. Represents the result of the game
. It holds:
    . winningMove the winning cells (if there is one)
    . _tied: whether the game tied
. It provides useful methods to check the status
    . xWins
    . oWins
    . tied
    . inProgress
    . finished
    . hasCell(row, col)

This class doesn't check whether someone won. It just represents the result once a checker (like `CellChecker`) determines
it .

3. `CellChecker` (Class that implements `ResultChecker`)

. Purpose: Check a specific set of 3 cells to see if they form a winning line (same player)

. How it works: 
    . It receives an array of coordinates like [[0, 0], [0, 1], [0,2]]
    . The check method
        . Retrieves the `Cell` objects from the `Board` for these coordinates
        . Checks whether all the cells have the same type and none are null
        . if yes, return new GameResult with the winning cells.
        . if not, returns an empty `GameResult` (meaning no win for this set of cells)

4. `HorizontalChecker` (Class that implements `ResultChecker`)
    . Purpose: Check if there is a horizontal win (any of the three rows).
    . How it works: It creates three CellsChecker instances — one for each row:
        .Top row: [[0,0], [0,1], [0,2]]
        .Middle row: [[1,0], [1,1], [1,2]]
        .Bottom row: [[2,0], [2,1], [2,2]]
    . Calls .check(board) on each one.
    . Looks for any result where .finished is true.
        . If found, returns that result (a win)
        . If not, returns a default new GameResult() (no win horizontally)

5. `VerticalChecker` and `DiagonalChecker` (Classes that implements `ResultChecker`)
    . Everything is the same as the horizontal, being the orientation the only difference

6. `TieChecker` (Class that implements `ResultChecker`)
    . Purpose: Check if the game ended in a tie
    . How it works: It won't even check if there was a winningMove, just check if the board is `isFull` but there is no
    winning move, which means it tied. 
    . For the game to be tied neither the xWins nor the oWins.
    . Therefore, because there is a priority, where the tie is the last one, it doesn't make sense for us to calculate
    the board cells, therefore, we only need to check if the board is full and return an empty array as the first parameter
    and the tie as the second one.


In the end, some question arose like: "How do i know in the code that x or o won, where am i setting the xWon property, etc"

The direct answer is:

1. CellsChecker verifies if all the cells being passed to it have the same type ('X' or 'O').
   If yes, it returns

   new GameResult(cells as Cell[])

   That is, it provides which cell formed the winning move.

2. Who discovers who won is the GameResult, by looking at the tye of the first cell of the winning sequence:

    ```ts

        get xWins(): boolean {
            return this.winningMove[0]?type === PlayerType.X
        }

    ```

    thereby, the logic is:

    . winningMove[0] has the .type equals to PlayerType.X -> X wins.
    . If PlayerType.O -> O wins.
    . If winningMove is empty -> there is no winner


Conceptually:

    The `Checker` does not need to know who is X or O.
    He only answers: "Are these cells equal to each other?
    If yes -> `GameResult` takes care of interpreting who won.





    


## OOP Comments

### 1.

❓ Why can i access state[row][col] and call the method markWith(type) on it, considering that state is two dimensional array
of Cell objects? (Cell[][])

✅: When we do state[row][col] = state[row][col].markWith(type)

we are saying

"Get the cell object that is in the line `row` and in the column `row` and call the method markWith(type), that returns
a new instance of Cell (filled, if it is empty). After, replace in the array this instance in place of the previous one."

Why does it work?

Because state is a matrix Cell[][], and accessing a cell is as easy as

state[row][col]

This gives us an object of the type Cell that exist in that position. Then we call:

state[row][col].markWith(type)

this methods will return us a new cell, that we then assign back to the same position.

state[row][col] = newCell

### 2.

❓ Why was i able to access board.items without calling it like a function ( board.items() )?

A: Because i declared the method with the `get` keyword, which makes it a getter property. This makes it behave like an
attribute (a property) rather than a regular function

❓ What exactly does the get keyword do here?

✅: The `get` keyword defines a getter for the class. A getter is a function that's automatically called when you access
the property, without needing parentheses. JS runs the getter code transparently as if you were accessing a variable.

❓ So is board.items an attribute or a method?

✅: Technically, it's a method, but it behaves like an attribute. The `get` hides the fact that it's a function. When you
do `board.items`, JavaScript executes the method without requiring parentheses.

❓ What if I didn’t use get?

✅ Without the get, you would have to call the method like this:

board.items()

You’d need parentheses, just like any regular method.

❓ Why would someone use a getter instead of a regular method?

Answer:

Make code cleaner and easier to read, as if you’re accessing a real property.

Hide internal logic and expose information as data, not an action.

Simplify testing, reading, and maintenance.

### 3.

❓ Why create a `shared` folder instead of a `Cell` folder?

✅: What the instructor is doing follows a very common pattern in projects that use domain separation (DDD — Domain-Driven
Design) or simply a more modular architecture.

The logic is:

    - If an element (like Cell) does not belong exclusively to a specific context, but instead is a shared concept across
    different parts of the domain, then it goes inside a `shared` (or sometimes called `common`) folder.

    - On the other hand, if `Cell` were a concept strictly tied to the `Board` context, then creating a folder like `cell`
    	or `board/cell` would make sense.

    Putting it inside `shared` means that `Cell` is not just part of the `Board` or `Player`, but it's a concept that can
    	be manipulated, read, or interpreted by any module that needs to understand the game state.

What usually goes inside a shared folder?

    - Global types (PlayerType, enums, status types, etc).
    - Value objects (like Cell, Position, Score, etc.)
    - Helpers and pure functions (e.g. shuffleArray, deepClone)
    - Global constants (BOARD_SIZE, WINNING_COMBINATIONS, etc)

Why not create a cell folder?

    If you create a `cell` folder it would suggest that `Cell` is a standalone module with its own behaviors and responsibilities —
    which makes sense if it has complex logic.

    	However, if `Cell` is just a simple Value Object, like a representation of a "position on the board" holding the current
    	state (`empty`, `X` or `O`) it doesn't require an entire folder for itself.

Practical rule to decide:

If the entity has complex behaviors (methods, internal rules) then create its own folder
If it's just a simple data structure or a shared concept then create it inside a shared folder.

💡 Summary applied to this example:

✔️ Board.ts → Board logic (validate moves, check for winners, etc.)
✔️ Player.ts → Player representation
✔️ shared/Cell.ts → Cell representation (current state), which is used both by Board, Player, or any other logic
✔️ shared/PlayerType.ts → Enum or type that defines 'X' | 'O'

### 4. What are value objects?

Value object is an object that represents a concept based on its value, not its identity. Unlike Entities, Value Objects
does not have a unique ID. They are defined entirely by their properties.

if two Value Objects have the same value in all their properties, they are considered equal

Characteristics:

1. No Identity: It doesn't have a unique ID. Two Value Objects with te same value are the same.
2. Immutable: Once created, it shouldn't change. If you need a new state, you create a new instance.
3. Self-Validating: It can enforce its own rules upon creation (e.g. "a cell must be X, O, or empty").
4. Equality by Value: Comparisons are based on property values, not memory references.

Examples in Real Life:

- Address: { street, city, zip} — If two addresses have the same street, city, and zip, they are the same.
- Money: { amount, currency } — 10 USD is equal to another 10 USD
- Position: { row, column } in a game like Tic-Tac-Toe

##### Example in a Tic Tac Toe Game:

A cell can be a Value Object, because:

- It has no identity.
- It's defined by its position (row, column) and value ('X', 'O', null).
- If two cells have the same row, column, and value, they are the same.

export type PlayerType = 'X' | 'O' | null;

export class Cell {
constructor(
public readonly row: number,
public readonly column: number,
public readonly value: PlayerType
) {}

    isEmpty() {
    return this.value === null;
    }

}

- Cell does not have an ID
- It's equal to another Cell if row, column, and value are the same.

##### Value Object vs Entity:

| Aspect   | Value Object            | Entity              |
| -------- | ----------------------- | ------------------- |
| Identity | No                      | Yes                 |
| Equality | By value                | By ID               |
| Mutable  | Usually immutable       | Usually mutable     |
| Example  | Cell, Position, Address | Player, Game, Board |

##### Why use Value Objects?

. Makes the code safer by avoiding bugs related to identity or accidental mutations.
. Encapsulates logic and validation related to a concept.
. Improves readability and maintainability.




