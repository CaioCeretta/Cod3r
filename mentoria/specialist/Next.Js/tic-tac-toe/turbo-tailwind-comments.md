# Turbo repo and tailwind comments


## Up until now

If we run the project on its root folder, with npm run dev, we'll be able to see that it runs the front-end project defined
in the apps, but it still doesn't know about the core project, so we also need to establish this connection between the front
end app and the package we've created.

## How we do this link?

1. We need to make sure that core's package.json has the main file pointing to the right file. By default it is index.js
but on our case, ./src/index.ts
From our src/index.ts we import all the files needed and export these classes/interfaces/types that we defined in our project.

2. If we have a large amount of files to be exported, we can export them within every folder and export everything from
the main index.ts — we create a index.ts inside every folder, export one part of it, and inside the "general" index we
group all of them and export.

3. In the package.json, the `name` of the workspaces is primordial for these links within the monorepo because we use
them to declare the dependencies within its apps (e.g. inside the front end package.json we'll declare the dependency
to the core folder)

4. After adding the core project in the frontend dependencies, we need to run the `npm i` command in the terminal because
it'll now add as a node package. Because the only way we would be able to do this type of separation between different
projects would be by publishing it in npm. And it would be vary time-consuming change, because if we change something in
the core package, we would need to republish the new change, download it, etc. 

5. Turbo-repo idea is having several separate projects, having the possibility of organizing it in the way we want with
no need involving a repository, such as npm to publish our packages.

6. Once we create this core dependency inside the front-end package, we will now be able to import everything exported 
by the core project. Meaning we now have access to what has been defined in the core of the application.




