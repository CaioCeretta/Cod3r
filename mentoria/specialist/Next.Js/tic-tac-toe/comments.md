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

The project core represent the rules of our application.

It is usually on the packages folder, within in, there won't be any framework tied to it, we'll initialize its project.json
and in our dependencies,
