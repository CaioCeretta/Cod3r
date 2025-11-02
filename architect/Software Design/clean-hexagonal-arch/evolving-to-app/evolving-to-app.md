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


 















  








    
    











