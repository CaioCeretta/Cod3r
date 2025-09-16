## Comments for the core and auth packages

● Authorization and Authentiication

  ○ Create a user folder and, within it, a `model` folder and a `service` folder
    ■ The model is going to contain the User model
    ■ The service will contain our use cases   
    ■ First, we will create the code in a simpler way, without a database, and later on we'll refactor it.
    ■ In a larget project, the instructor prefers to store the password in a different model, because if we store it inside
    the `User` model along with other information, and perform the "famous" select * from table, the password will also
    be retrieved and travel through the app unnecessarily.
      □ We only need the password in specific moments, and it is much more sensitive data than other user information.
      □ Fetching it unnecessarily increasses the risk of exposure, so it's more interesting to keep the password in a
      separate folder than than inside the `User` table.
      □ To do this, for example, we will create another `Auth`  package inside our packages folder
    ■ When we use the core/auth/backend as a dependency of front end, for example, we will then see in our node_modules
    that it now has a folder with all the folders and codes we written in that separate project, we can also see a small
    arrow on the side of the dependencies from the monorepo, because it is pointing inside the project

  ○ Auth Package

    ■ Initialize the package.json, name it @urna/auth, and this package will only be used to deal with our project
    authentication and propritize the separation of concerns idea
    ■ Other useful idea is to create "physical delimitations", because by placing everything inside one project, it is
    easier for us to start creating multiple dependencies that should not exist
        □ When we physically separate it, by creating a separate project, this does not happen
        □ Nwow, the same way we depend on core package, inside frontend, we'll depend on the authentication

● Project Configuration

  ○ Our frontend can easily access what was defined as a dependency of the packages (auth and core). But the backend, won't
  be able to access them, it won't find the same classes.

  ○ In the core package, on our application rules, because we are able to implement multiple solutions, without the need
  of having a database, or framework. We can focus part of our programming effort into codes that are independent of
  libraries/frameworks or databases.

  ○ In the auth/usuario/service package folder, we implemented a `loginUsuario` feature that is using constant's user
  that comes from the fixed array of the auth application

  ○ This means that our use case depend on a certain way of the persistence mechanism, we may think that there is no persistence
  mechanism, just a list of users, but there is a direct dependency from the login to the place where the data is stored.
  And we can change and invert this logic 

● RepositorioUsuarios

  ○ Still inside the auth package, within the users folder, and thinking on the ports/adapters pattern, the repository
  will resemble a port, like it is an opportunity of personalizing something inside the business flow.
    This folder can be, in a more explicit manner, our interfaces, or the folder name is also commonly named as `provider`
  that is what we need to provide

  ○ Inside this folder, we are going to create a RepositorioUsuario.ts file and export by default an interface called
  `RepositorioUsuario` and saying the shape of the methods we want.

  ○ This way, we have a "general repository" that inside our login flow, we will no longer depend on the usuarios array
  that is stored in memory but expect to receive any implementation of that interface through our function properties.

  ○ When the function starts to have multiple parameters, the instructor prefers to work with named parameters, even though
  this is not a js functionality, across other languages it can be called positional parameters or named parameters. Where
  we must pass the arguments in order of the defined parameters, where the params order make a difference, and named is
  when we have key/value pairs.

  ○ loginUsuarioparameters

    1. In React components, it is common to pass a props object and destructure it directly in the function parameters: 

    function MyComponent({ title, description} : { title: string; description: string }) {
      return <h1>{title}</h1>
    }

    2. In regular functions, parameters are usually defined explicitly
   
      function loginUsuario(repo: UserRepository, email: string, password: string): User | nul{
        ...
      }

    3. However, it is also possible to apply the same approach as in components: define a single props object and destructure
    4. it inside the function body

    loginUsuario(props: {
      repo: RepositorioUsuario
      email: string
      senha: string
    }): Usuario | never {
      const {repo, email, senha}
      // ...
    }

    ■ Traditionally, in regular functions, each parameter is defined explicitly. However, it is also possible to pass a
    single props object and destructure its fields inside the function body. This pattern is more common in React Components,
    but it works the same way in regular functions.

  ○ Change from user array constant to the Repository

    ■ This was a simple change, but it makes all the difference and points to this idea of having an architecture that is
    independent of the database, and we are going to implement this interface pointing to the database, we won't have
    trouble replacing a version that access in-memory data to a version that access data through the db. Only with this
    simple change of receiving a repository through the user.

● `Candidato` Register and Votacao module

  ○ A Candidate is part of the core

    ■ When we want to register the candidate to the db, even though we are separating the code in parts, a candidate is
    part of our core, and maybe using the name core to it is bad, since core is a generic name and it could be better
    if we created a voting module to it. It would be more interesting, because it has the candidate, the voting, the election
    and so on. So because of it, we are changing the core package folder to `votacao`, and change its package.json as
    @urna/votacao

    ■ Everywhere we have the @urna/core dependency we are going to change to @urna/votacao, as well as on the root dev:core
    that enters the core folder
    
    ■ Inside src, create a new `Candidato` which will be similar to auth's user, it will have the model/Candidato.ts file
    and the RepositorioCandidato within the candidato/interface folder

  ○ Within hexagonal architecture, an intrerface is a "port" and a "port" is an entry point that allows us to us to plug
   something into the core of our application

  ○ Candidate

    ■ One thing good of prisma, is that it is very "external", our models don't have to know which is the persistence
    mechanism and have to use all the annotations inside of it, which is cleaner

    ■ It is not role of the use case, to implement validations inside an use case. We can call the validations inside them,
    we invoke a validation that was created outside, be it through from a validator, an utilitary class, or even through
    the object, but use case should not worry about implementing these validations.
      . The use case is an "orchestrator", it manages the flow interacting with these interfaces being passed through
      our project

    ■ After creating the repo, model and service, on our backend we need to generate the module candidato. Comments will
    continue on the backend
    



    



   


