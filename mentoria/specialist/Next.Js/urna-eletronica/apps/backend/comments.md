## Nest and Backend comments

  ● Why Nest not express? 

    ○ Nest has an advantage over express. It uses express under the hood, however it automates many processeses and even
    though it has concepts for us to learn, it ends up being easier than to make everything "by hand".

    NestJS is a Node.js framework built with ts and provides a structured way to build scalable and maintainable server-side
    applications. It follows a modular architecture heavily inspered by Angular, making use of MVC concepts, where control-
    lers handle incoming requests and responses, services (or providers) contain the business logic, and entities or models
    represent the data layer, often managed through an ORM like Prisma.

  ● Database ORM

    ○ For the project, we will use prisma since its developing experience is good, even though its a newer ORM than other
    market options, it can attend what we need

      ■ npx prisma migrate dev reminder: When running this command, initially, it will create a .env file with a DATABASE_URL
      key simply saying a db file will be created as a file, and where our this dbfile is going to be stored.
        □ Along with this, it will run the migration created on the db and prompt the name for us to insert the update we
        just did, for example, in a user creation we name the migration as 'criar tabela usuarios', for example, to store
        this change.
        
      

  ● Centralize a single access point in the front-end

    ○ In the front-end, the instructor likes to create, in the front-end folder, a .env, insert a variable NEST_PUBLIC_API_URL
    and assign the API address to it, and create a custom hook of useAPi, where in this file, we are going to center all
    API calls in our app, like:
      
      ```ts
        export default function useAPI() {
          async function httpGet(url: string): Promise<any> {
            const req = await fetch(`${BASE_URL}/${url}`)
            const dados = await req.json()
            return dados
          }

          return {
            httpGet
          }
        }
      ```

    And create all requests to go through this file

      □ Now on our context we can call
        `httpGet()

  ● Backend Init

    ○ In the backend, we are also going to import the authentication and the core package of our app, just like the in
    front end
    ○ Run npm install on the root folder of the node packages
    ○ Add dev/backend script to package.json
    ○ Create a backend/http/users.http to place the users rest test calls

  ● HTTP Calls

    ○ One thing we will notice is, if we try to insert an user through a simple route, such as the getHello, and return
    the user to the client, it will work because http routes can access interfaces, but not functions, so if we try
    to call a function from an http route, such as loginUsuario, passing a repository and the required parameters, it
    won't work as expected 

    ○ Nest.JS have some problems when dealing with ECMAScript's import  and export, so to fix this, we need to make some
    changes to our packages to build them through a tool called tsup

    ○ Changes to fix NestJS problems with imports and exports

      ■ To do so, where we have the main attribute, inside the package.json, we change it to "dist/index.js", add the
      tsup devDependency
      ■ Create a types attribute with "dist/index.d.ts"
      ■ Together with the dev script of "dist/
      ■ Add these 3 scripts to the package.json
        □"build": "tsup src/index.ts --dist --minify",
        □"build:packages": "tsup src/index.ts --dts --minify",
        □"dev": "tsup src/index.ts --dts --watch"
      ■ Replicate these changes to the auth package
      ■ Inside the root package.json, create scripts to run dev scripts from auth and core, which will run the tsc command
      to the index.ts and update the dist/index.js

  ● Integrate API with loginUser just created

    ○ Beginning steps

      1. Inside app controller, we return back to return a hello world message
      2. Use nest cli in the terminal to create a new module for authentication
        ■ nest g mo auth
          □ nest generate module auth shorthand
        ■ this creates a new module inside src and attach it to root app module
      3. Also, create an auth controller
        ■ move to the auth folder and run nest g co auth --flat --no-spec
          □ With the --flat flag it won't create a subfolder but create it on the same folder as the module
          □ --no-spec prevents the test files from being created
        ■ Inside the controller, create an async login method, where it is going to be marked with the @Post('login')
        annotation, as well as a register method
    
    ○ Create a solution to access prisma so we can access our model/database and the CRUD functions that prisma expose to
    us through the database
      ■ Generate a db module inside our app
      ■ Modify the UsuariosRepositorio created in the root file, to a usuario-mem.repository.ts and create a sample user
      object for testing
    
    ○ We are now going to have to create a valid implementation, with e-mail and password inside the repository
      ■ Inside the login post method, we are going to receive the e-mail and password
      ■ Call the loginUsuario function passing down these two parameters as argument
      ■ When we have named arguments or an object passed as parameter, the advantage is that it becomes clear what each
      argument represent
      
  ● Nest.JS requests

    ○ Post request parameters

      ■ async login(@Body() dados: { email: string; senha: string })
        □ @Body() is the decorator that extracts the request body.
        □ The parameter 'dados' will be exactly the object sent by the client in the body
        □ By declaring `dados: { email: string, senha: string }, we are typing this object in TS to ensure it has exactly
        these two string properties

        □ So if the client makes a POST request with: 

          ```ts
          {
            "email": "example@test.com",
            "senha": "123456"
          }
          ```

          ▢ `dados.email` will be 'example@test.com' and `dados.senha` will be '123456'

           ■ Additional notes on the named params

        ■ When writing loginUsuario(props: { repo: RepositorioUsuario; email: string; senha: string;}) it means that the
        function isa receiving a single argument named props, and that this argument must be an object that contains exactly
        those three parameters.

        ■ Therefore, to calal the function we need to pass an object exactly with those keys.

        ■ In summary we are saying
          □ With props {...} -> we are telling that the argument is an object with these properties.


        ■ Important notes

          □ Nest.JS does not automatically validate types — for that, we need DTOs with class-validator and class-transformer
          □ The type we declare in the parameter is only for TS and does not prevent the client from sending other types
          or extra properties.

        ■ For us to send the req body through the http file, it is going to look like

          ```ts
            POST http://url/folder/request
              Content-Type: application/json

              {
                // body params
              }
          ```
    ○ Get Request Parameters

      ■ With dynamic variables, such as @GET(':email'), when defining the function we must (@Param() email: string) {
  
      }
      for example, and the email is going to come through the url such as localhost:4000/auth/email@email.com
    

    ○ Token generation

      ■ Install npm jsonwebtoken package to our app
      ■ Within auth controller, import * as jwt from 'jsonwebtoken'
      ■ create the token simply by token: 
  ```ts
          token: jwt.sign(usuario, 'chave', {
				  expiresIn: '15d',
			    })
  ```
      ■ Parameters breakdown

        □ 1st Parameter: payload
          . Payload is the content we are placing inside the token
          . It can be an object, string or buffer
          . In this case, the user object
          . This means that, when someone tries to decodify this JWT, he will be able to see the user data (not encrypted,
          just coded in base64)
          . Payload example: 
            {
              "id": 1,
              "nome": "Caio",
              "email": "caio@email.com",
              "iat": 1693075256,
              "exp": 1694371256
            }
        □ 2nd Parameter: secretOrPrivateKey -> 'chave'
          . Secret key used to sign the token
          . This key ensures that the token isn't falsified
          . Only one that knows this key in the server can verify if the token is valid
          . Normally, this key doesn't stay hardcoded, but in an environment variable, such as
            process.env.JWT_SECRET

        □ 3rd Parameter: options
          . Here we are passing extra options, such as expiresIn
          . In the token payload, this shows as exp in UNIX timestampaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

● Registration 

  ○ The dependencies we installed, such as the bcrypt, are backend dependencies and it is part of the application layer,
  the outer layer, while the auth module has to do with the application rules, if we look into the dependencies we have
  on this package, it has only one, which is a dev dependency because of the build

  ○ Therefore, we don't have the jsonwebtoken dependency, nor the bcrypt, nor any dependency, because in the auth we
  are not worried about these libraries details that we eventually use in our app

  ○ However, inside our registrarUsuario use case, we will need to ensure that we are encrypting the password, becuase
  because in our business, we don't want to have to wait for someone to pass an encrypted password. We want to ensure
  that when we registerUser, the password will be encrypted.

  ○ Since we have this necessity, we are going to have to create some interface, and require that we receive an implemen
  tation of that interface to be able to encrypt this password

  ○ For this, we are going to crete a new interface `ProvedorSenhaCriptografada.ts` with two methods
    ■ 1. criptografar(senha: string)
      □ This methods receive a arwa password, encrypts it, and then return
    ■ 2. comparar(senha: string, senhaCriptografada: string)
      □ This method receives a raw password along with the encrypted one. It then decrypts and compare to the "clean"
      one (they must be encrypted from the same origin)
        □ The reson for this need to be the same origin is that it isn't always the same even if we use the same set of
        characters, because bcrypt inserts an extra "salt" to the encryption, which is essential to security.
        □ Through the "clean" password and the hash generated, even if its not strictly equala, bcrypt knows, because
        of the hash, that it was generated by him

  ○ After the repo creation, we are going to receive this implementation on the register function and in addition to
  receiving the Repository, we re also going to receive this provider

    ■ Now, we encrypt the password using the function we've just created and return it to the repo to save it on the db,
      □ However, since we are in the auth package, this repo will save in memory
    ■ At the end of the function, call `await repo.salvar({...usuario, senha: senhaCriptografa})`

● DDD Aggregate

  ○ 1. Aggregate Concept? 

    ■ An aggregate is a cluster of related domain objects that are treated as a single unit of consistency. It usually
    includes: 
      □ Aggregate Root:  The main entity inside thge aggregate. Only the root of the aggregate is accessible directly
      from the outside. Every external operations must pass through it.
      □ Entities and Internal Value Objects: Objects that belong to the aggregate, but can't be directly accessed outside
      of it.

  ○ 2. Why does an aggregate metter for repositories?

      ■ In Domain Driven Design (`DDD`)
        □ Repositories are used to persist and retrieve entire aggregates
        □ We never persist or retrieve an aggregate internal entity; we always work with the root of the the aggregate

        □ Example: Aggregate based on an order

          Order (Aggregate Root)
            ├── OrderItens (Internal Entities)
            └── EnderecoEntrega (Internal Value Object)

          . We don't access and save the entire Order through the OrderRepository
          . We don't direcrtly access OrderItens through an external repository

  ○ 3. Practical Summary

    ■ An aggregate is a unity of data consistency and business rules
    ■ The aggregate root is the entry point for every external operations
    ■ Repositories always deal with entire aggregates, never with isolate internal entities

● So when to use a Repository?

  ○ What does it mean? 

    ■ The name 'Repository' is generic name that is used for anything. One thing is having a Repository as a generic
    name, and the other is to have the Repository defined in the DDD book
    ■ The repository pattern explained in the book, has to do with this `aggregate` concept, that is a cluster of data
    that is persisted at the same time

  ○ When should it be used? 

    ■ The repository isn't used for everything in terms of persistence, they're not so great when we think about the
    fetching part, on very specific queries, which demand other patterns to help us, without overloading repositories.
    
    ■ And when we think about aggregates, we think, back to the Order and the OrderItens example, that they are persisted
    at the same time, and for each aggregate we have a repository to persist the root of the aggregate, which is the Order.
    
    ■ An order can have items, clients, addresses, and may have multiple other entities, but we want that it to be persisted
    in an unique and transactional manner inside the db

    ■ However, the repositories used in this course is not actually linked to this pattern, it is simply using its name
    since it's a generic name. We are doing like this because, for example, an array is a repository of data, a file, a
    db, and any collection of data can be used as one, and not necessarily entering the pattern details, and other
    concepts of DDD that are not the focus.

    ■ Sometimes we try to "harm" the code so we respect a certain pattern, but sometimes what is missing is understanding
    for which purpose that pattern was created, and sometimes we end up inserting multiple things that don't have anything
    to do with the pattern.

    ■ When we have multiple queries, with multiple different entities, tables, aggregates, junctions and so on, we won't
    use it in a repository, there are patterns for it, such as CQRS — that segregates by separating the commands (updates,
    deletions, and creations ) inside the database of queries, and this could be used

    ■ Repository works very well when these queries are more basic, not advanced queries that work with multiple different
    things. 

● Link backend with register

  ○ Inside the register route, inside auth controller, call registrarUsuario
  ○ Instead of using the same approach as loginUsuario, where we create a new repo of the desired implementation, when
  calling, we now create a new repo class attribute, to share the same repo among the methods in this class
  ○ Implement the 'ProvedorCriptografia', which it needs to encrypt the password
    ■ To work with the dependency injection, we could say that the RepositorioUsuarioArray class is an injectable one
    ■ Declare this class as a auth.module provider
      □ Since it is a provider, it can be injected
      □ If it can be injected inside our controller, we don't need to deal with the object lifecycle, meaning that we dont
      need to instantiate, by ourselves, the object, as we are doing now. 
      □ We simply tell Nest, inside the constructor, that we need a repository of that type and "ask" it to inject an
      instance of it for us, and 
    ■ Create a bcrypt provider which, different from the other repository, implements ProvedorSenhaCriptografada
    
    ■ After implementing the register, we have to ensure that the login has to consider the password to be encrypted, so
    we can't no longer do the simple password verification, if password of the user == password sent. Meaning that our
    login function also needs to receive an implementation of `ProvedorSenhaCriptografa` in its parameters.
      □ And now, on the comparison, we check if the password that come from the db, already encrypted, ist equal to the
      one we are passing in, if not, throw an error




    ■ Injection Problem i had

      □ In AuthController, we did `constructor(private repo: RepositorioUsuarioArray) {} which means that i was expecting
      Nest to automatically inject an instance of RepositorioUsuarioArray. However, for this to work, Nest needs to know
      that:
        1. This class is a valid provider (which we did by informing on the AuthModule it as a provider)
        2. The controller also needs to be in the same module as the provider
          . But in our AppMOdule, i have also included the AuthController manually. 
          
          This breaks the injection, since now the AuthController inside AppModule, doesn't detect the provider
          `RepositorioUsuarioArray` inside AuthMOdule

      □ To fix this, we had two options

        . Option 1 (cleaner one) — Leave AuthController only inside AuthModule

          ```ts
            // app.module.ts
              hi@Module({
                imports: [AuthModule, DbModule],
                controllers: [AppController], // ❌ removed o AuthController
              })
              export class AppModule {}
          ```
        
        . Option 2 — Export the provider (if we wish to use it inside another module)

        If we really need to use this repository outside AuthModule, we need to export it

        ```ts
          @Module({
            providers: [RepositorioUsuarioArray],
            controllers: [AuthController],
            exports: [RepositorioUsuarioArray], // ✅ exporta
          })
          export class AuthModule {}
        ```  

        Now, AppModule, imports AuthModule via provider

      □ And we also need to make sure that we import the repository entirely, if we only import ts types for typing, and not
      the actual runtime value of the class or module, will cause errors

        . NestJS relies on runtime values to perform dependency injection, so when we import only the type of a Repository
        and use it on the injection, TS knows the type, but at runtime, NestJS does not see the class itself, so it cannot
        instantiate it and inject it into the controller, causing the "Cannot resolve dependencies of Controller" 

      □ However, when we don't need the class in real runtime, and we are not using it in the dependency injection, is
      safe to import it as type — e.g. in class implementation

● Link the database module with prisma

  ○ Inside the db module, create a PrismaProvider — providers are classes that will provide something to us, this could
  also be named as services and create `prisma.provider` in that same folder with the 
  `nest g pr prisma.provider --flat --no-spec` command. This will generate the provider, as well as updating our db module.
    
    ■ Extend the PrismaClient, which is generated by default by prisma with our schema configuration, Implement onModuleInit,
    onModuleDestroy to this provider class, where the init will start a connection to the database and the other one,
    terminates it.

    ■ Since the provider extends the PrismaClient, we are also inheriting a method called $connect and $destroy, which we
     are going to call it on the init and in the destroy — this.$connect() is a function provided by the PrismaClient as
     well as this.$destroy()

    ■ Annotating this provider with @Injectable() we turn this into a class that can be passed as a dependency to anywhere,
    to a controller, to a service, and so on.

    ■ Nest is separated in modules, up until now we have the app module, which bootstraps the app, the auth module, and
    the db module. This means that, because the app is modularized, it makes this with the purpose of establishing relationship
    barriers between these folders, for us to avoid creating something that will block relationship processes between
    one module and another.

    ■ Nest wants to formalize the dependency relationship between modules. Since it's way more practical to come up with,
    inside the auth controller (which is the location used to interact with the db), and we already have a UserRepo that
    saves in an array. We already have the logic of passing a repository to our use cases, which persist it (it doesn't
    matter if it is in memory or on a database).
      □ If we, for instance, try and simply import something from another repository, such as something from auth being
      simply imported on another module, is that nest wants us to be conscient of which are the dependencies that exist
      in our app, and this creates a questioning: 
        . Why are we separating the core of the authentication, and the reason is that, we could simply place everything
        inside one project and the code to be perfect, with low coupling, modules working independently, with the exact
        dependencies that are necessary for the project.
        . However, when we physically separe, it becomes way harder to couple different modules and makes us think if one
        module really has to depend on other one?
        . Do i really have this necessity? Do i need they to depend on one another? If we can, it will be best, but if we
        can't, we go and create the dependency
    
    ■ What can't happen, and this is a serious architectural problem, is to have cyclical dependencies, where the A module
    depend on the B module, and vice versa. This is possible to happen, it creates an enormous issue
      □ This is a lack of understanding what are the app flow boundaries. Understanding how each context must be separated
      and how the dependency relationship among them should work.
      □ This may be one of the most important diagrams of the architecture, that is called a context map, where we create
      bounded contexts, that are our projects, and these projects mirror how the business work and it must be on top of
      this functioning that we define the app modules.
      □ With each business sub-domain being mapped as a bounded context (a separate project), we can then define which
      is the mapping between each one of these contexts.
      □ Let's take an hospital as example: We have the hospitalization part, which probably have a specific module for
      the flow of receiving a patient that must be hospitalized which have the medicines flow, the dischage flow and so on.
        . As well as other module for emergency, other for supplies — ensuring that there are the equipments, supplies,
        resources, for each one of these modules.
        . This means that each element will be separated, and there is going to exist one flow, flow communications, to
        communicate among all these modules.

  ○ Now that we have our PrismaProvider, we need to make it very clear, inside the module, that we want to export it to
  the outside. So any one that wants to use the DbModule will have the possibility of using the PrismaProvider, for example,
  the AuthModule will want to access the db module.

    ■ For this, inside auth.module imports attribute, we need to specify the DbModule
    ■ And since the DbModule, exports the provider, the auth module will be able to access the Prisma Provider
    ■ Go inside the auth folder and creating a prisma.user as a UserRepository, since we are accessing Prisma
    ■ The reason for us to name the file in association to the technology, is because the file is completely related and
    tied to that technology. Because in the application, one time or another we are going to need codes that are specific
    to each one. If we are going to use another technology, such as a fire store, we create a separate file to it, and so
    on
  
  ○ usuario.prisma controller
    ■ Inside auth folder, via nest cli, generate a provider named `usuario.prisma`, and this will create inside of the
    auth module, a controller named usuario.prisma

    ■ One time it has created the provider and exported the DbModule, in the auth module's user.prisma, we can define a
    constructor and inject this UsuarioPrisma as parameter, e.g. `constructor(private readonly prisma: PrismaProvider) {}`

    ■ Usuario prisma must implement the `RepositorioUsuario` we have defined when creating our in-memory tests and override
    those required methods

    ■ Prisma upsert works like this
      ```ts
        prisma.usuario.upsert({
          where: {id: ...}, // Needs to be a unique value
          update: {...}, // if finds, update
          create: {...} // if doesn't find, create it
        })
      ```

      □ About id: usuario.id 

        - The where field, must be a valid unique value (in this case, id)
        - If we want to pass undefined or null inside where, Prisma will throw an error, because he is not able to build
        the query

      □ Why usuario.id ?? -1 was used?

        - This ?? -1 is a "trick" for when the user.id is undefined (when the user is new)
        - If id doesn't exist -> it forces -1. Since there is no user with that id, Prisma falls in `create`
        - If id exist -> he tries to update it, if i doesn't find, create

      □ So, is it necessary? 

      . Depends: 

          - If we guarantee user.id will always be present (e.g., for new users we handle it earlier, and for existing user
          it's always provided) -> we can use id: usuario.id directly.
          - If id might be missing -> we need some fallback, either ?? -1 or an explicit if

      . Many developers prefer not to use ?? -1 since it's a bit "magical" anmd can be confusing. Instead, they write it
      explictly

        ```ts
          if(usuario.id) {
            await this.prisma.usuario.upsert({
              where: { id: usuario.id },
              update: usuario,
              create: usuario,
            });
          } else {
            await this.prisma.usuario.create({data: usuario})
          }
        ```
      
        - Which makes the intentior clearer
         
  ○ Now, with the prisma.user provider created, we are going to be able to see a big advantage of clean architecture

    ■ The biggest advantage of having a clean architectures, is because in our tests, when we are going to test the use
    cases or entities test, and so on. We simply don't depend on any database and we can pass a repository which saves
    in an array (in-memory). 

    ■ And since now we have the usuario.prisma repository which extends from the db module, the auth controller repo will
    be of that new repository type

    ■ With these changes being made, from in memory to the database repo, next time the API is executed, it will save on
    the DB with no necessity of updating our use cases, flows or modeling.

  ○ Candidato Module

    ■ We generate candidato with the `nest g mo candidato` command, and with this, it will generate a new candidato folder
    inside our src, with the candidato module

    ■ We now move to the candidato folder and generate the controller with `nest g co candidato --flat --no-spec`
      □ even though we are not specifying in its name that it is a controller, a candidato.controller.ts file will be
      generated, and the class name will be CandidatoController

    ■ also generate a provider, which will be our `nest g pr candidato.prisma --flat --no-spec`

      □ Inside CandidatoPrisma, within the constructor, inject the private PrismaProvider

    ■ Now, our candidatoModule will also import the DbModule since it exports the PrismaProvider

    

● Overall Jest comments


  ○ Custom Error

    ■ Here we will create a error filter. For this, in our terminal, we will go to the root of the project and create a
    new `filter` with `nest g f error --flat --no-spec`

    ■ A nest.js generated filter consist of catch method, that receives the expection as a T generic typing and a hostt
    parameter of type ArgumentHost

    ■ Now, we need to declare this filter in a way that it can be part of our application, like a middleware, where it
    will intermediate every request before our controllers.
      □ For this, on main.ts, before bootstraping (launching) the application, invoke an app.useGlobalFilters()
      with a `new ErrorFilter()` as argument

    ■ Inside our error filter, within @Catch() annotation, we are going to choose a class for it to intercept, an Error
    class is a very generic option, but it will make every Error to be intercepted and pass through this class.

    ■ Now, after the changes, getting the current context of the host, getting the response an typing it as a generic
    `Express Response`, if our http call errors, the answer we sent via response will be logged on the response.

    ■ Meaning that now the answer is being controlled by us and is not simply an internal error, and now we can patternize
    what kind of answer we want in our api error treatment, because this response will be fundamental for us to know
    how these answers are going to be treated in the front-end

    ■ First, we are going to get the expection status, we will follow these steps
      1. Change expection parameter type to any
      2. After our exception, try to grab the status by assigning exception.status to a status const, if we don't have any,
      return 500
      3. If the status is different, we will now know if is an error caused by the server or 400 that was caused by the
      client
      4. Now, we can increment the error object returned to the user with the status, response, date and the error
      message

    ■ Create a new shared package, and inside of it, create a `ErroValidacao` class, this new package will be a dependency
    of all the apps inside our mono repo, the ErroValidacao wll simply receive, in its constructor, a message: string and
    a readonly status defaulted as 400, in the constructor body, call the Error constructor super() with the message.

    ■ Now, in our use case, such as the service/RegistrarUsuario, instead of throwing a new Error, we can throw a new
    ErroValidacao, since it extends from Error and return the way we want.

    ■ After creating the shared package and the `ValidacaoErro` class, instead of just throwing a random error, we can now
    throw a new `ValidacaoErro` and it will return to us the client error in the way we expect

    ■ We can also think that on our business, we are mixing http codes with our modeling. The answer is yes, in this case
    we are bringing technology to our app, however, this doesn't generate any impact, but this is not an external dependency,
    or something irreplaceable, and it is not being "spread" all over the app, is simply something chose to easy the erroring.
      


  ○ Difference between || (Logic OR) and ?? (nullish coalescing)

    ■ Both of them look alike, however, the criteria used to choose the value is different

      □ ||
        . It returns the first "truthy" value and in js, the values considered falsy are
          - false
          - "" (empty string)\
          - null
          - undefined
          - NaN

      □ ??

        . It only ignores the value if it is null or undefined, and do not consider 0 nor "" as falsy

        . Example
          
          const a = 0 ?? 42 <- a will be equal to 0, since 0 is not null nor undefined
          const b = "" ?? "hello" <- b will be equal to "" since its not null nor undefined
          const c = null ?? "ok" <- c will be equal to "ok", since null is nullish
          const d = undefined ?? "ok" <- "ok" 


  ○ Lack of export/import problem

    ■ One thing to notice is, when we created the new prisma provider, changed the auth controller, and so on, it could raise
    some issues to be aware of: 

      □  If the code stop running, something may have been missing: 
        - If we don't export the prisma provider from the db module, since it is needed to the app to work
        - If we don't import the dbmodule inside the auth module
  
  ○ Nest @Injectable() annotation

    ■ 1. Exporting the class

      ```ts
        export class PrismaProvider extends PrismaClient {}
      ```

      □ We can export it normally and import inside other files. This works with any class in TS

    ■ 2. Using with Nest DI (Dependency Injection)

      If we want Nest to automatically create an instance and inject it within other providers, we need `@Injectable()`

      ```ts
        @Injectable()
        export class PrismaProvider extends PrismaClient {}
      ```

        . With no Injectable() nest will not recognize this class as a provider and won't be able to inject it inside
        `CandidatoPrisma`
        . With Injectable(), Nest knows it can instantiate and manage the lifecycle of the object

  ○ Named API calls and constants

    ■ With named calls, we are able to retrieve this api call and assign its return in a variable, and since our login
    method returns an object with the token attribute, we can access it through callname.response.body.token

    ■ We will notice that, before executing the login, this constant variable `@token = {{login.response.body.token}}`
    will have a squiggly line before the login executes, this happens because @token still does not exist, since the login
    call has'nt  been made yet. As soon as the call is made, this warning disappears

  ○ One thing we need to be sure of, when executing prisma calls, we need to make sure that our type model is the same as
  the prisma model schema, otherwise, it will "red" the whole file since the types are different

  
  



          


  




  




    
     


  




    




  