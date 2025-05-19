# Comments About Applications

## Architectural Encapsulation

The idea of organizing our application into multiple modules establishes what's called "architectural boundaries". For
example, a front-end application by itself doesn't represent the entire system—it's just one part of it. The front-end acts
as a shell—what we see on the screen. When we understand the difference between front-end and the application's logic
, and we're able to separate the logic from the interface, we begin to optimize these architectural boundaries and avoid
coupling our application with a specific framework.

Let's take a "tic tac toe" game as an example. What we see running is a simple game board with 9 empty squares, and the
goal is to align three Xs or Os in a row in order to win. In the project workspace, there may be only one project,but if
the system were more complex, we could have additional applications such an admin panel, a front-end app, a back-end service,
a bot, and so on. It's common to organize multiple independent applications within a a single repository. Even though the
game is one may be simple, its codebase can be modularized—for instance, into a `core` folder (containing the game rules: game,
player, result), a shared folder, and a separate front-end module.

This separation makes the `core` package completely independent from the front-end, which doesn't have direct access to it.
To use it, the front-end must import the core module as a Node.js package.

The distinction is important because it helps us understand that part of the system represent the logic, and the other
part represents the shell, or the user interface. Practicing this separation the concerns is essential to maturing as a
developer, rather than writing everything as a single, tangled codebase.

`Turborepo`, is a tool for creating monorepos, which are repositories that hold multiple related projects in one place.
When we run it's setup command, it generates a structure that includes Next.Js along with other preconfigured packages—all
in the same repository.

By default, it doesn't generate a `core` module, but it does create a ui package where we can place reusable components.
For example, in the `formacao.dev` platform, we have different projects such as 'Aluno', 'Admin, 'Professor', 'Landing Page',
where we're able to reuse components across them by sharing the same ui package.

## Our rules don't belong to the back-end

Because belonging to a back-end is basically we package the rules. The rules belong to the application, if we are to call
them in the back-end or in the front-end, is more a configuration/packaging, than of coding.

By turning our rules, independents of the front-end, and of the back-end, we're going to have the ability to use them
wherever we want to.

That's why, we should look forward to separate the rules, because we will gain awareness of what really is graphic interface
and what is business code. The biggest problem of our application is being able to evolve it in an organized way. Therefore,
if we are able to create clear separations, and understand that there are architectural boundaries which say that certain
codes should not be accessed by the front-end because this can generate unnecessary coupling and turn the maintenance
harder. Because of that, we start to simply stop thinking on frameworks and start thinking on solutions as a whole e differ
what is details—such as shell of our application, the graphic interface— and what are rules.

## Tic Tac Toe game

/\* The code if this game will be on a separate project within the folder Architect/Projects/TicTacToe

In this project, the core is part of the front-end, because there is no separation between front and back, the only separation
is from the code that represents the interfaces of the app i.e. the graphical part and the one that represent the
logic of the app. Everything is being executed in the front-end because within it we depend on the core package, and it
imports the package as it is a next/react/Node package.

The game logic is not being executed in the back-end of the app with the need of a remote call, etc. We are separating the
logic from the graphical interface.

## Other comments

1. We should not mix business rules with databases, or any library inherent to the back-end. Because there will come a time
   where the "price will come" to us and make the tests difficult, the library may even evolve and change itself, and because
   we have a business, completely entangled to the technology, in five years, when the framework has evolved to new versions,
   we'll end up having difficulty in modifying our rules, since it is stuck to the framework.

   When we divide, we think the rules don't belong to the front or back, but they can be called from one of these. And the
   point of understanding this, is to stop thinking about front or back, because they have more to do with the way we are
   going to deploy our app. Therefore, we can see them both as shells, the difference is that they are on complete opposite
   sites, two different ends of the process. The rules lies on the core, that is has all the business rules, and as much
   independent it is, and focused on the business, without caring about the technology, making the dependency inversions
   to prevent us from depending on the db/framework, easier it will get to develop our rules/business without entangling
   it to the persistence framework, meaning that it can be changed without the business even knowing that we updated the
   version, evolved, is know saving the entities in more than one table.
