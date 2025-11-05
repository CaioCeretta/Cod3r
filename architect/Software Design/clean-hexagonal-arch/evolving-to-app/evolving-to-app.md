### This chapter will be used to evolve the basic code apps to a more real project, with security, REST Api,
as well as improving the overall code

## Lesson 1 - Understanding what we've done so far

This refactoring will not consist of domain modelling, entities, value objects, services, because the focus is not on
the domain driven design (DDD), but the objective here is to specifically focus on clean architectures, and ports and adapters

We may even ask: "Is it correct to apply CA and Ports and Adapter also inside a front end?"
  . The instructor's answer is yes. He states that the course could even be focused on the frontend, and he would be able\
  to show exactly everything he is currently demonstrating. However, the issue is that frontend development often involves
  a heavier framework load and other concerns that draw focus away from the pattern itself, unlike the current application.
  The current application, which initially began with only business logic classes (which could be libraries used on the
  frontend), is now gaining a "stronger backend face" with the addition of express in this chapter.

But for know we will make a drawing of how our application is organized and link it with the concepts we have seen so far.
**the drawing will be on **progress.excalidraw**.


  ### Drawing Comments

  1. The philosophy behind the geometrical shape

    • The hexagon symbol (Cockburn's intent)

      . the creator chose the hexagon not because of the need of having six sides, but to break away from the tradition of
      rectangular layered diagrams, which would encourage mixing business logic with infrastructure.

      . The hexagon shape is a symmetrical shape that provide sufficient visual space to represent the multiple "faces" or
      interfaces (Ports) required for the application's core to communicate with the external world without having to redraw
      the basic structure for every new i/o element

      . The multi-sided polygon the diverse ways of interaction (multiple drivers and driven actors) that the application
      have.

  2. Ports and the necessity for multiple implementations
  
    • When we have a port, we are mostly going to have a least 2 implementations to it.

    • A practical example is the **ColecaoUsuario** interface, although the initial need might only be for a single production
    database connection, e.g. PostgreSQL, the requirement for automated tests emerges right away.
    
    • The testing implementation is usually a **MockAdapter** and it is crucial for testing the app's core (use cases)
    **without depending on the actual database**.

    • We end up concluding that the necessity for both a Production and a Testing implementation explicitly drives the
    need for a Port (ColecaoUsuario) and, consequentially, its two corresponding adapters.

  3. Classification of components: Drivers (Primary) vs Driven (Secondary)

    • **Driven ports & Adapters (Secondary)**:

      • Components whose functionality is guided/called by the application`s core
      • Examples: ColecaoUsuario and ProvedorCripto ports are DRIVEN because the core (application) invokes them to persist
      data or perform encryption

    • **Driver Ports & Adapters (Primary):

      • These are the external components that trigger use cases within the application's core. They act as application
      guides
      • Example (Tests): Tests are responsible for firing the use case flows and are, therefore, categorized as **drivers**

    • API as a Driver:

      • The API (Controller/HTTP Adapter) is a type of **Driver** that resides outside the application's core (which only
      contain business logic)
      • Its function is to receive external requests and initiate internal flow (use cases)

  4. The optional abstraction of input frameworks (API)

    • **The Question**: Does it make sense to create a Port to abstract the API framework (e.g., a `Server` Port with
    `ExpressAdapter` and `FastifyAdapter` adapters)?
      . The port would define a method to register a route and the adapter would implement this using the specific technology
    
    • The Rule of Thumb: Creating this port is only justifiable **if it makes business sense** and if the application has
    a genuine need to swap out or support multiple API frameworks.

    • Common Practice: This is typically not done, the **Controller** (The driver adapter) is already **outside the core**.
    It can directly access the framework's features (e.g., Express) to define routes and then simply invoke the use case

    • App scenario: Abstracting the API framework would only be necessary in cases where we explicitly want the **Controller**
    (which is the adapter) to have absolutely no direct dependency on the web framework classes.


## Lesson 2 - Express configuring

  We will start this lesson by installing the dependencies: `jsonwebtoken`, `express`, and `axios` and the dev dependencies
  `@types/express`, `@types/jsonwebtoken`, and `@types/axios`

  The reason for axios is because that in our **E2E** tests, we will call our api through it.

  ### Express Setup

  • Initialize express and assign it to an app constant with `const app = express()`
  • Define app.use(express.json()) this will enable express's middleware to automatically parse JSON request bodies, making
  it available in req.body
  • Also `app.use(express.urlencoded({extended: true}))`. This enables express to parse URL-encoded data, such as form
  submissions, and makes the values available in `req.body`
  • Finally, call app.listen for the server to run on the desired port, which can be set inside the .env variables.
    . Since our code is not using frameworks, or anything, we must always remember that to access the .env variables we
    need to use the dotenv library we installed (this library, even though our core isn't supposed to have external libraries
    and so, it has little possibility of causing coupling and the use we have for it is pretty simple, easy to replace
    if needed)
  

## Lesson 3 - Registering Route

We'll start by defining a `controllers` folder inside src and as we remember, in CA a controller is part of the "interface
adapter". However, if we follow the hexagonal architecture pattern, we will see that the adapters are outside the application.

Even though, the folders structure do not define the architecture, but the entities relationship. But inside a "screaming
architecture" that explicits and make clear for whoever sees it, what we are doing, the clearer are these folders name,
the best. Therefore, if we are adhering to a given architecture, we should follow it as much as possible relating to it.

However, not every architecture modelling like the "Ports and Adapters", it is not opinionated in multiple things, it does
not say what is inside the application, so defining how we would like to organize and name is our criteria.

We will have one controller for each use case, so we will create a `RegistrarUsuarioController`, its folder separation may
eventually happen in the future in case we start having multiple use cases for a certain element type, then we can separate
it into sub-folders

Q: Do i want to link my controller to express? 
 A: The decision to link our controller to the Express application directly is a design choice, not an architectural one, 
 since it essentially will affect the code organization and coupling. The core question is whether the controller should
 have access to the Express API. If we pass the Express instance as a parameter, the controller handles its own setup,
 which would simplify the initialization but increasing coupling. Alternatively, by keeping the controller separate and
 handling routing externally in the application's main file (such as index.ts), we achieve better separation of concerns
 and testability, which is generally preferred for scalable projects.

The controller will receive in its constructor the use case `RegistrarUsuario` and an `Express` server

Since we have access to the server, inside the controller we will register this use case to be called after a given url 

This post method will call our use case executar method with the required parameters based on the body

For this controller start to work, we must define it in the index

### Defining the RegistrarUsuarioController in index.ts

• For the first example, i will instruct step by step what i did

• Inside index.ts, we must create the RegistrarUsuario use case, and as we remember, we need to instantiate a `Colecao`, and
a `ProvedorCripto` to pass them through as parameter for the use case.

• After assigning to a constant this new object, we are going to pass the use case to the controller, e. g.

  ```ts
  const registrarUsuarioController = new RegistrarUsuarioController(
    app,
    registrarUsuario,
  );
  ```

• Now that the controller is defined, we can register this controller in the web by instantiating it

## Lesson 4 - Testing the API

One trick we can do here, is to create a .env.ts and define a base url so we don't have to configure on every test.
To make that this file is called before every test, we need to add this attribute to the jest config 
`setupFiles: ['<rootDir>/test/.env.ts']` 

We then separate the tests in folder for tests related to the API and for the core

for these test we will do the following:

. import axios
. Create a baseUrl const and assign to it what we just configured in the env
. Create the test and create the route with axios
. Treat the exception in the controller (try catch)

## Lesson 5 ~ 6 - Login Use Case

###  Create a Login use case on my own (my thoughts and coding).

• The `LoginUsuario` use case enforces login behavior, and the port responsibilities are "Find user by email", because
core needs user data to check password, Insert user -> because core needs to insert data
• Login the user is not a DB operation, it is a workflow/use case that uses the port

• We have to think
  Use case: what does the system need to do? (business rule)
  Port: What external capability do i need to enforce the rule?
  Adapter: How do i technically provide that capability?

• Therefore, ports are not use cases, it enables use cases

• Instead of ColecaoUsuarioDB.login, it leaks business logic into persistence

  - We want LoginUsuario use case to control the login rules
  - ColecaoUsuario.buscarPorEmail is the technical requirement
  - ProvedorCriptografia.comparar helps enforce the rule

Therefore, these a re the steps i will follow

• I won't create login method inside port, since not all business logic (it is a workflow/use case that uses the port, with
other required methods that will enable us to do it)  such as "user should be able to login", should be inside of it 

• I will simply create the LoginUsuario use case, following the same pattern as RegistrarUsuario, to receive the `colecao`
implementation and the provedorCriptografia inside the constructor

• the `executar` function will receive the email and password, and then create a constant `usuario` to the buscarPorEmail
call

• Check if a user was returned based on its email, if no user was found, throw an error

• Use ProvedorCriptografia to check if the password compare to the one received as parameter

• return the user in case of success


### Even though this worked, there are some caveats and important observations to evolve

The logic is correct

  • The use cases orchestrates
  • Uses the port method to fetch a user by email
  • Compares password inside ProvedorCriptografia
  • Decides if the login is valid

  • Which we use methods define by the business logic implementation and the core is the the one deciding and not the db

However, there were some 

  1. I'm throwing an exception for invalid login

    This is acceptable by now, but in the real world, we usually

      . Throw only unexpected errors
      . Return null or some kind of controlled error for invalid login
    
    Why?

    A wrong password is not an domain exception, but is a normal flow, a cleaner approach would simply be

    ```ts
        const usuario = await this.colecao.buscarPorEmail(email);
        if (!usuario) return null;

        const senhaConfere = this.provedorCripto.comparar(senha, usuario.senha);
        if (!senhaConfere) return null;
    ```

  2. Error messages in the domain
    We could also create specific errors, such as `class UsuarioNaoEncontradoError extends Error{}` or
    `class CredenciasInvalidasError extends Error{}

    ## Lesson 7 - Standardizing the Use Cases

    This pattern is adopted to **standardize application logic** and ensure **low coupling** with domain objects. Here
    we will follow the best practices of **Application Services** from the **Domain-Driven Design**

   1. Interface `CasoDeUso`

    All use case must implement the interface `CasoDeUso<IN, OUT>`, located in the shared folder (or service)

    ```ts
    export default interface CasoDeUso<IN, OUT> {
      executar(entradas: IN): Promise<OUT>;
    }
    ```

  . **Purpose**: Defines a single contract for executing any application feature
  . **IN (Input)**: Represents the Input DTO (Data Transfer Object) with the required data for execution
  . **OUT (Output)**: Represents the **Output DTO** with the data to be returned

  2. Decoupling and DTOs

    ● Core Principle: Use cases MUST NOT directly depend on domain object** for their inputs (`IN`) or outputs (`OUT`)
    when attribute specific to the use case (like `token`) are required.

    • The Coupling Problem: If a use case (e.g., login), needs an attribute that is not part of the **core business rule**
    of a Domain Object (e.g., a business specialist wouldn't say a `Usuario` has a `token`), and adding this attribute to
    the `Usuario` object causes **Domain Leakage** — This is, when specific details of the app or infra are introduced and
    contaminate the core domain modeling

    • The DTO Solution:
      . Create separate Input DTOs (for `IN`) and Output DTOs (for `OUT`)
      . Example: The `LoginUsuario` will use an **OutputDTO** that contains the `Usuario` domain object AND the application
      specific `token` attribute.

  3. Implementing and Refactoring (Example: `RegistrarUsuario` and `LoginUsuario`)

    1. Inputs (IN): Defines an explicit input DTO (e.g. RegistrarUsuarioInput) for `nome`, `email`, `senha`, this replaces
    multiple arguments with a single object, improving method signature and coupling
    2. Outputs (OUT): Defines an input DTO that returns the necessary data (e.g. for Login, include the Usuario and the
    token), this isolate application-specific data (like token) from the Usuario domain object
    3. Controller: Adjust the controller to pass the Input DTO as the single argument to the executar method. This ensures
    consistency with the CasoDeUso interface contract
    4. Tests: Update tests to reflect the new signature, passing the Input DTO and expecting the Output DTO (including
    nested properties, such as usuario.nome). This ensures coverage of the new structur






  ### DTOs (Data Transfer Objects)

      #### DTOs (Data Transfer Objects)
    The input type (IN) and the output type (OUT) we use in our Use Cases are formally known as DTOs (Data Transfer Objects).

    #### What are they?
    DTOs are purely data objects, designed to be the transportation medium for information between the different layers of your application (e.g., between the Controller and the Use Case, or between the Use Case and the Domain/Infrastructure layer).

    **Simplicity**: A DTO should be as simple as possible, consisting only of public properties and their values
    **Absence of Behavior**: They must not contain business logic, validation methods, or any other rules. They are simply
    "containers" for data

  ##### Usage in Use Cases

    • `IN` (Input DTO): Transports the raw data from the interface (e.g., an HTTP request) into the Use Case.
    • `OUT` (Output DTO): Transports the processed result from the Use Case back to the presentation/response layer
    
  In Summary: The **DTO** is a data contract that ensures the right information, in the correct format, is passed between
  components, keeping business rules isolated where they belong.


    ## Lesson 8 - Generating Token

  For the token, we are going to create it a new `ProvedorToken` port in the usuario folder, and define a method to generate
  a token. This port will have two contracts, one for generating a token and one for validating it

  • To define a new token we will need the payload that will receive as argument, a secret, we will receive in the class
  instantiation, and the options

  • To validate we will receive a string or object that is the payload of that token, if it is able to resolve, it returns
  the same payload used in the generation, otherwise it will simply throw an exception.
  Therefore, to "unravel the secret" it needs to have access to the same secret used its generation.

  • One thing we can do is: 
    . When we pass down the token through axios, it will send a `Bearer Token` — a bearer is a http's pattern. In the
    jwt validate method, we will replace the token with an empty string where it finds the word 'Bearer'. This is used
    to simply return the raw token we want to validate.
    . This important when the validation is made through 'axios'


  Even though we create the JWToken adapter needs with the Port definition, it does not mean that we are adapting the app
  to the technology. Independent of the token generation, this will basically be the same — we pass a token and receive
  an object that generated it, or pass a string (payload) and we will generate a token.
  
  Therefore, if we notice that sometimes it lack some kind of vision, of how the interfaces are going to be created, implement
  an adapter while thinking of an interface that is generic enough for, in the future, change to another adapter if necessary.

  ### Instantiate it

  • First we modify our use case to inject in this class, a new token provider
  • Now in the index, we are going to instantiate it, and as a argument, we use the JWT_SECRET we created in the .env.
  • Since login receives a token provider adapter, in the returned object, we utilize it to generate a token and as the
  `gerar` method secret argument, we will use an object with the user information, like:

    ```ts
      return {
				usuario: { ...usuario, senha: undefined } as Usuario,
				token: this.provedorToken.gerar({
          id: usuario.id,
          nome: usuario.nome,
					email: usuario.email,
        }),
			};
    ```

  ### TS Generics Recap

  ● What are generics?

    In TS (and in multiple other languages with strong typing, such as C# and Java), **generics** are powerful tools that
    allow us to write code that can be reused to facilitate working with different types, and keeping the type safety
    at the same time.

    We can think of them as "type variables"

    1. Type metaphor

      When declaring a function or interface with a generic, such as the `CasoDeUso<IN, OUT> {}` 

        • IN and OUT are the type variables
        • By that moment, IN and OUT do not represent a specific type (such as string or number), but still a **reserved space** 
        for a type that will be defined later.
      
    2. Problems solved by Generics

      Suppose we want to create a function that returns exactly what it receives. Without generics, we would have two
      options

      A: Use `any` (Loses security)
      B: Create specific functions (lose reuse)

    3. Solution with generics

      ```ts
        function identity<T>(arg: T): T { // T defines the type variable
          return arg;
        }

        // When used with strings
        const stringResult = identity<string>("Ciao") // T is string
        // The type of stringResult is 'string'. TS knows it

        // When used with number
        const numberResult = identity<number>(123) // T is number
        // The type of numberResult is 'number'.
      ```

  • Therefore, that ś what differentiates fixed types from generics.

  We HAVE to specify the concrete types (IN and OUT) at the moment we are using or implementing the generic interface,
  inside the CasoDeUso example

  **1. In the definition (We are in the model)**

    At this point, we don't know yet what will be the exact type, we are just creating the model or contract (the interface)

      ```ts
        // Here <IN, OUT> are PLACEHOLDERS (type variables)
        // We are telling TS: "This interface will use two types that will be defined later
        export default interface CasoDeUso<IN, OUT> {
          executar(ENTRADAS: IN): Promise<OUT>
        }
      ```

  2. Inside the implementation, (we are in the "Commitment" mode)

    Here we create a class that meet the CasoDeUso contract. It is at this moment that we need to **lock** the types, replacing
    the generics IN, OUT with real types

    It is the clause implements which requires the definition

    ```ts
    interface CreateUserInput { /* ... */ }
    interface CreateUserOutput { /* ... */ }

    // Here we need to define the types
    // The class `CriarUsuarioCasoDeUso`  agrees to use CriarUsuarioInput for IN and CriarUsuarioOut for OUT.
    class CriarUsuarioCasoDeUso implements CasoDeUso<CreateUserInput, CreateUserOutput> {
      // type script now knows exactly what to expect for
      async executar(entradas: CreateUserInput): Promise<CreateUserOutput> {
        // logic with type safety
      }
    }
    ```

    • Why are the types required? If we didn't specify the types, TS would not know which types to use for IN and OUT and
    would probably fall back to any, breaking all the security we want when using generics

  3. In the consume (We are in the "Use" mode)

  When we instantiate the class, we are already using the types defined in the implementation (step 2)

  ```ts
    const createUser = new CreateUserUseCase();

    // TS (through type inference) already knows that:
    // - The parameter of `executar` must be CreateUserInput
    // - The return value will be Promise<CreateUserOutput>

    const output = await createUser.executar({ name: 'Jorge', email: 'j@j.com'})

    console.log(output.id) // Safe, the compiler helps us
  ```

  **Conclusion:**

  The generics (<IN, OUT>) in our interface are like **blank spaces** in our model. They only gain a meaning (and type
  safety) when we fill them with concrete types at the implementation (using the syntax implements CasoDeUso<TipoA, TipoB>)

  This ensures that our interface will be an universal "mold", but that each implementation is a strict, yet, verifiable
  contract


### Instructor's approach

  • He started by creating the LoginUsuario use case.
  • Fetched the userByEmail
  • Compared its password via the ProvedorCripto and assigned it to a `mesmaSenha` constant
  • Inside the use case, return the user with a token, but for now, simply return the existingUser we retrieved by
  the buscarPorEmail.
  • Make sure the use case do not return the user with password (it is also important to have tests ensuring that the
  use case do not return the password ).
  
  His approach was pretty similar to mine


### Tests

For the test, we need to:

1. Register it a `LoginUsuarioController` and call the use case with the email and password
2. The test will consist of the API call for the /login route, 
3. Inside the controller, assign the constant to the use case return and return this usuario in the json message
4. As soon as the controller is created and return the login values, and treating the exception in case an error was
thrown.
5. After the controller implementation, we need to register it on the index, and finally test the route we created and
pass a real email and password

### Test importance

Even though, the test is one of the most essential part of this architecture, it is almost as a test is the most important
driver we have in our application, before the front, mobile, and others. 

Of course an application doesn't survive without the essential elements, it also is able to survive without the tests.
However, our architecture should be "developer-friendly" so we can test in a simple way.

### Try/Catch inside tests

  • In our example where the catch throws an exception in case the email already is being used, we could think of doing
  something as

  ```ts
      try {
        const res = await axios.post(`${baseUrl}/registrar`, usuario);
        expect(res.status).toBe(201);
      } catch (e) {
        expect(e.response.status).toBe(400);
        expect(e.response.data).toBe("E-mail já cadastrado");
      }
  ```
  
  • However, the problem in structuring tests with a try catch, is that the test could return successful in case it felled
  in the catch, so even if the user already exists, and the axios post throw an error, inside the catch, the assertions
  pass, and the catch block finishes without throwing the exception

  ● Solution (Separate the tests by scenario and use `rejects`)

  • The best practice in Jest, is having a test for each scenario and use the function rejects or toThrow to test exceptions
  or errors

  1. Success Test (Single Register)
    
    The test we already were creating where assigned the User credentials to a user, and test if it returned 201
  
  2. Failure test (E-mail already exists )

    For testing this error, we use the Jest's  `rejects` method or simply return a Promise and use .rejects.toThrow() if it
    is a simple exception. Since it is an axios http error, rejects is cleaner

    ```ts
      test("❌ Deve retornar 400 se o e-mail já estiver cadastrado (Falha)", async () => {
      const usuarioExistente: Partial<Usuario> = {
        nome: "Caio Ceretta",
        email: "ccer@zmail.com",
        senha: "123456",
      };

      // wrap the axios call inside the expect, expecting it to be rejected
      await expect(
        axios.post(`${baseUrl}/registrar`, usuarioExistente)
      ).rejects.toMatchObject({
        // match object allow us to verify the error structure
        response: {
          status: 400,
          data: "E-mail já cadastrado", // Assuming that the error is a pure string
        }
      })
    ```

     ## Lesson 10 - Usuario Middleware

This lesson will be focused on developing a middleware to retrieve a user after the token authorization sent with each
request.

After receiving that token, we are going to extract the user information, fetch it from the DB, and if it is indeed
present, attach to the request

● `next()` Function

In every Express route handler, besides the `request` and `response` parameters, there is a third parameter called `next`
This function is used to continue the request flow. When `next()` is called, Express moves on to the next middleware
or to the controller

● Protected Route Middleware

  • A **public route**, simply receives the request and goes straight to the handler function (for example, a user registration
  route)
  

  • Protected routes, on the other hand, have a "filter", the **middleware**. This middleware intercepts the request, and
  run some logic before reaching the controller.
  If everything is ok, `next()` is called and the controller runs.
  In essence, this middleware ensures that only authenticated users can access the given route.

  • The token will be extracted from the request headers. That token determines whether the user is able to access
  the specific controller logic. 
  
  In short: **the controller only runs if the middleware ensures there is a valid logged-in user**

  ● Middleware Structure

    For now, this middleware will be created inside the controllers folder

    Steps to build it:

    1. Import `Request`, `Response` and `NextFunction` from Express.
    2. Define a constructor function whose receives.
      1. UsuarioRepositorio: To verify if the user exists in the db
      2. ProvedorToken: To validate whether the token is valid or not
    
    With these two elements, the middleware can return a function that receives req, res, and next.
    
    We will move the "Bearer" extraction logic from `JwtAdapter.validar` into this middleware, since here we have more
    context to determine which type of token we are receiving and whether we actually want to strip the `Bearer` prefix.

    After isolating the token (removing the `Bearer`) we call the `validar` method from the token provider to verify it.
    If everything is valid, we attach the user to the request as `req.usuario`

    It is also important to set a try catch if an error occur during this process.

  ● Chain of Responsibility

    What we implemented here is called a **chain of responsibilities**.
    Before a request reaches the controller, one or multiple middleware functions may execute, calling `next()` until
    the final handler is reached.




     ## Lesson 11 - Save Transaction #01

In this lesson we are going to create a new use case to save the transactions inside the DB. In the class the full use
case won't be created, but a temporary version, and we can apply the authorization concern and only allow the user to
reach this temporary use case, only if we have an actual logged in user.

First step will be to create a use case itself, for it, create a `transacao` folder inside the core folder and define an
interface `Transacao.ts`

Define a use case SalvarTransacao and a Controller to it.

This controller will be used both for creating a new transaction as well as updating an existing one. One with the :id\
parameter for updates and another without it for creating a new resource.

### Using/testing by step recap:

1. Create the dto/interface that will be used in the CasoDeUso
2. Define the class that implements that interface, defining the type of executar the same as the first parameter
3. Create the use case and implement its processing
4. Create a controller instance, receive the server we are dealing with, up to know we still have only
the Express since we are not dealing with an interface port of multiple implementations, and the useCase we are going to
call.
5. Call the use case's executar method to run it, and finally, use the server to define with http route will target this
controller
6. In the index file, create an instance of the use case, and instantiate the controller using this instance and the current
server instance

### Separation of Concerns

Transacao: Defines the Data Structure
SalvarTransacao (Caso de Uso): Contains the business logic
SalvarTransacaoController (Adapter): Contains the interface logic (HTTP) and calls the business logic

This makes our code much easier to test.

  ## Lesson 11 - Adding the Auth

In the index file, we start by setting up our first protected route. To do that, we instantiate the `UsuarioMiddleware` we
created earlier, passing two dependencies: a `Colecao` instance (so we can retrieve the user by email) and a TokenProvider
(for decrypting and validating the token).  

Once the middleware is defined, we pass it to the `SalvarTransacaoController`. Since the controller requires a middleware
array as the third argument, anything we spread into that object will be included in the middleware chain.

Next, we add a new test. At first, this test will fail with an auth error because we would need to create a user every
single time we run a protected test. But instead of doing that manually, we’ll create a data folder inside the test
directory, add a usuarios file, and define a user that follows the Usuario interface. Then, in the tests, we simply import
this array and reuse it.

We also create a util folder in the test directory and add an auth.ts file, exporting a helper function that calls /login
and returns an object containing the Authorization header with the token from the response.

With this in place, we can log in using the complete user, get its token, and pass that token every time we test a protected
route. Back in our transaction test, at the top, we just call getAuthorizationHeader() and reuse that token for our protected
requests.

  ## Lesson 12 - Save Transaction #02

We start this lesson by creating a migration.
- The syntax is `npm run migrate:make criar_tabela_transacoes" and create our tables in that file

After we complete the implementation we run
- `npm run migrate:up`





### Builder Pattern, Fluent API

The instructor also gave mentioned another version without some properties, or even creating a "builder". This is similar
to a fluent API pattern, used to build objects step-by-step. For example, something like `UsuarioBuilder.comId()`, 
`UsuarioBuilder.semNome()`, etc.

#### Builder Pattern

The builder pattern basically means that instead of having one static object (such as 'completo') with every property, we
can build variations of the user for different test scenarios. A `UserBuilder` (or `UsuarioBuilder`) could look like this
conceptually

```ts
  const usuario = new UsuarioBuilder()
    .comNome("Caio")
    .semEmail()
    .build();
```

This pattern is common in tests to make data setup flexible, readable, and reusable.

A simple UsuarioBuilder idea (TS example for clarity)

```ts
  class UsuarioBuilder {
    private usuario: Usuario = {
      id: "default-id",
      nome: "Default Name",
      email: "default@mail.com",
      senha: "123456",
    };

    comId(id: string) {
      this.usuario.id = id;
      return this;
    }

    semNome() {
      this.usuario.nome = '';
      return this;
    }

    semEmail() {
      this.usuario.email = '';
      return this;
    }

    comEmail(email: string) {
      this.usuario.email = email
      return this
    }

    build() {
      return { ...this.usuario}
    }
  }

  // Usage

  const usuario = new UsuarioBuilder().semNome().comEmail("caioceretta@gmail.com").build();
```

This is useful for testing, because static fixtures, like `usuario.completo` even though it is simple and quick, it is hard
to customize for special cases, while builder pattern is flexible, readable, and has slightly more setup

##### Fluent API

1. What is a Fluent api?

Fluent API (or fluent interface) programming interface design style that has as objective to make the code more readable,
concise and expressive, allowing the method chaining.

It is a pattern by its own, such as the Builder, it is essentially an implementation technique. It is frequently used to
implement project patterns (like Builder, Decorator, or Command) or to create specific domain languages.
Its core principle is to make the code to be read naturally, almost like a sentence.

2. How does the "fluidity" works?

The "secret" behind the method chaining is very simple, and we have seen above in the 'UsuarioBuilder' example

• The Return: Each method in the cain, such as `comNome()`, `semEmail()` must return the object instance itself
(`return this`)

So by utilizing:

`comNome("Caio"), we modify the name of the internal user, and returns the `UsuarioBuilder` object itself, and the same is
happens when clearing an attribute.

Since the return is the object itself, we can immediately call its next method.

3. Typical example outside of builder

Fluent API is very common outside of builder and we can even see it on tests
```
expect(novoUsuario)
  .not // 1. commences with the negation
  .toBeNull // 2. Verifies if it is not null
  .toHaveProperty('id', 101) // 3. Verifies if it has the 'id' property with the value of 101
```

##### Relationship between Builder Pattern and Fluent API

The confusion or association between the two is natural because they walk side-by-side

1. Builder Pattern: Defines the structure to build an object step by step. It ensures that the object is only finished
(and returned) when the build() method is called

2. Fluent API (The style/interface): It is the style that the Builder adopts so that the construction is readable and
chainable.

**In Summary**: Builder pattern uses the fluent api technique to be more friendly and readable.


  
  








## Ports, Adapters, and the Core Boundary Recap

  1. **Where the Ports Reside**

    • **Ports (Interfaces) are inside** the Application Core (The hexagon)
      
      • They are the contracts defined by our business logic. They represent "what" the application can do (Driver Port)
      or "what" the application needs (Driven Port)
      • **They are NOT external to the application**. They are the application's boundary
     
    • **Adapters and Actors are outside** the application core

      • The **Actors** are external entities (Database, User, Test Suite, API)
      • The Adapters are technical implementations that translate the external Actor's technology to the internal Port's
      language.
  
  2. **The relationship between Ports and Driven Actors**

    For this example, we will use our current app.

    Component             Location            Role                                Dependency
    **Driven Port**           **Inside** the core     The contract the core needs         Core depends on the **Port** (abstraction)
    (`Colecao Usuario                         to save the data                  
    interface`)
    ____________________________________________________________________________________________________________________
    
    **Driven Adapter**        **Outside** the core    The implementation that talks       Adapter depends on the **Port** (implementation)  
    (`ColecaoUsuarioDB`)                        to the external actor (PostgreSQL)                                          
    ____________________________________________________________________________________________________________________

    **Driven Actor**          **Outside** the System   The actual external                 **Adapter** depends on the **Actor** (framework/)
    (PostgreSQL, DB)                           resource/technology                 driver


    • Ports do not configure as Driven Actors
    • The driven actor is the external system itself (e.g. PostgreSQL)
    • The **Driven Port** is the abstract interface (ColecaoUsuario) that allows the Core to interact with the Actor
    without the Actor knowing the Actor's details

  3. (**The critical Dependency Inversion Rule**)

    The key goal of hexagonal architecture is to enforce DIP so that the core remains independent

    • **Driver Side (Primary)**: The external adapter (e.g. a controller) **uses** the Driver Port to call the use case
      • **Dependency Direction**: Adapter -> Port -> Use Case (all inside the core)

    • **Driven Side (Secondary)**: The Core **uses** the Driven Port (e.g. ColecaoUsuario). The external adapter, e.g.,
    `ColecaoUsuarioDB` **implements** that Port
      • Dependency Direction: Adapter -> Port <- Core

  Using `ColecaoUsuario` as example
    1. **Core** uses the interface (ColecaoUsuario).
    2. **Adapter** (ColecaoUsuarioDB) implements the interface (`ColecaoUsuario`)

  This setup keeps the core clean: the external infrastructure (the adapter and the actor/db) must adhere to the contracts
  (Ports) defined **inside** the core

### **Why is the interface inside the core a "Driven Port**?

    In our case:

      ```ts
        interface ColecaoUsuario {
          inserir(usuario: Usuario): Promise<void>
        }
      ```
    
    • It is inside the **core**
    • The core **uses this interface** to save data
    • The core **does not know which db will be used**

    So:

    • **Core depends on the Port** (abstraction)
    • **Adapter implements the Port** (concretizes)
    • **External actor** (Postgres) is used by the adapter

  
  Therefore: 
    • Interface `ColecaoUsuario` is the **Driven Port**, because it is **the Core that needs it** to send data to outside
    • "Driven" here means "**The Core is depend on this dependency**" — Core is "depending" on it, even if it is inside
    • Core depends on a contract, adapter **implements** this contract and connects to an actor, and the core doesn't know the
    adapter nor the actor directly

  Quick summary is: 
    •**Driven is not where the code lives, but who is dependency of the Core**
    • Core uses the Port -> Port is **driven**
    • Adapter implements -> simply concretizes this dependency

### Ambiguity of the name "Port"

  • In my understanding. i am mixing two rules that are true, which are: "Ports define the contracts that adapters must
  implement¨ and  "Driver actors call the use case, such as APIs, Controllers, Tests and"

    1. General Rule (Driven): Port is the contract which the adapter implements (Valid for the driven side)
    2. Driver Rule: Who calls the use case is the driver actor (api/controller). (Valid for the driver side)

  But let's solve this confusion by showing that our *use case** (the implementation) is in the middle and behaves in two
  different ways

  ● Addressing the confusion

  1. **DRIVEN Port (The one which the adapter implements)**

  This is the rule we learned first and is correct, it is valid since `ColecaoUsuario` is the contract that the adapter

  • Port:  defines the contract (`ColecaoUsuario` interface)
  • Adapter: implements the contract class
  • Actor (core): uses the contract to ask for something `ColecaoUsuarioDB` implements.
  

  2. **DRIVER Port (The one that the adapter USES)**.

  Here the rule is **reversed**, the adapter does not implement it, it uses it.

  • Port:  defines the contract (`RegisterUser` interface with the method `executar`)
  • The adapter in this case is the (API/Test): It uses this contract to call the business logic\
  • Actor (Core): Implements the Contract (`RegistrarUsuario` class)

  ● Summarizing the confusion

  Our confusion was because we were forcing the rule 1 (**Adapter implements the Port**) with the same logic as the second
  side (Driver Port)

  **The truth is**: The driver adapter (does not implement there driver port), he **utilizes** the Driver Port. The use
  **use case implementation**  is the one who implements it.

  The adapter is required to implement the port **ONLY** on the **DRIVEN** side.

###  Final Explanation: Isolated core and tested)

  Let's use our code for this example

  1. Untouchable Core (The driver port implementation)

    `RegistrarUsuario` (use case) is our core, the implementation of a driver port. We can notice that the code is inside 
    the use case and it never changes, independent of what is injected. It only uses the contracts (`ColecaoUsuario`,
    `ProvedorCriptografia`) .

  2. Driven port and "plug-and-play" adaptation

    Our tests demonstrate the complete flexibility of the secondary ports through the DI

    • Port `ColecaoUsuario` (persistence)

      • For the unit tests `(test('deve registar...'))` we inject the UserInMemory (adapter driven mock). This ensures that
      the test is quick and do not depend on a database
      • In the last tests (`test('deve registrar um usuario no banco real)`), we injects `ColecaoUsuarioDB` (Infra Driven Adapter)
      proving that the core can use the same logic with the original db

  3. The test as the driver adapter (primary)

    Each `test()` block acts as a primary driver adapter

      1. It prepares the environment (create driven adapters instances)
      2. Initiates the control flow: (casoDeUso.executar(...))
      3. It validates the result returned by the Core (expect(...))

 ### tsconfig moduleInterop

 Even though i removed the type: module in my package.json and my code went back to work as commonjs, it still was able
 to understand the ESM syntax i'm using in my code... Why?

 In our tsconfig we have something called esModuleInterop as true

 This attribute "tells" TypeScript to generate "interoperability code" during CommonJS transpile

 So if we say in our code:
 `import express from 'express';` in the generated CJS it will turn to `const express = require('express')
       



















  








    
    











