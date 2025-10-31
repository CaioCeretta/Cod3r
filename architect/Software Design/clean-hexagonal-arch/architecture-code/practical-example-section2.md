##### The primary objective of these lessons is not entering in configuration/coding details, but rather on the principles
####  and motivations behind utilizing this pattern 

## Lesson 1 - Basic Example #01: Project Definition

### Configuration

  This lesson will start by creating a raw project, I am basically following these steps

  1. Creating a folder specific to the application
  2. Initializing a package.json and installing typescript (which will be language we are going to use), jest,  ts-jest,
  @types/jest, @types/node and ts-node-dev as DevDependencies. (@types/ is crucial for TypeScript to understand js libraries
  providing types definitions, by enabling type verification and autocomplete, ts-jest allows jest to test ts code by
  compiling it, and finally, ts-node-dev compiles and execute our ts code inside a node.js terminal automatically via
  hot-reload during the development).
  3. Run the command to initialize jest's configuration: `npx ts-jest config:init`. This command configures the **jest.config.ts**
  pointing the tests to run via typescript, and configure the jest-config
  4. Configure tsconfig. There are two notes about this file, first being outDir attribute, inside the compilerOptions
  object that defines where the files will be compiled to, and outside of compilerOptions, we are going to define a "include"
  attribute for the files any file inside src folder, meaning it will use this folder as information source
    - We could notice that, when the src folder was empty, the first { was with a red squiggly line, why is this?
      - The reason is because TypeScript and vscode, **only initialize a project** when he finds:
        1. A valid tsconfig.json, e
        2. At least one .ts or .tsx defined in the "include" attribute
      - When there is no included file, ts won´t create a project context and the editor may signal tsconfig.json as
      invalid or simply don't activate the language service for it.
  5. Within package.json, create a "test" script ta simply invokes jest and create a dev script as
    `"dev": ""`
    - ts-node-dev: Main executable, it is like node, but with direct technical support to TypeScript. It uses `ts-node`
    internally (which compiles TypeScript "on the fly") along with a watcher like `nodemon`
    - --respawn: Indicates that when the process restarts, it must be completely re-created instead of trying to reuse
    the old process.
    - --transpile-only: Means to convert the typescript to javascript without checking types 

#### Commonjs to nodenext migration

Inside the instructor code, the command line initial tsconfig, was creating the tsconfig with the type as commonjs, and 
mine created with `nodenext`, so how do i change it to utilize the new settings?
I followed some steps:

  1. Instead `jest.config.js` i created a `jest.config.ts`
  2. We specified that the config constant must adhere to the JestConfigWithTsJest interface. Which will ensure that it
  correspond exactly to the structure that ts-jest expects for this function, and it will also help us with autocompletes
  and real time error checking.
  3. Defined the preset as one required by esm
  4. Defined the file extensions, which is essential for ESM
  4. Configured the transform to inject custom tsconfig for tests
  5. Enabled isolatedModules to comply with our tsconfig's attribute and enforce that each file is treated as a separate,
  isolate module
  6. The initial configuration, often used as "module¨: "nodenext", imposes strict ESM rule, such as relative imports must
  include file extensions (e.g., ../src/calc.js)
  So i changed the module to ESNext and the target to ES2022. By doing this, without explicitly enforcing the strict nodenext
  module, ts "relaxed" it's path-resolving rules, allowing us to use the cleaner import syntax without extensions
  7. And finally, downgraded jest from version 30 to 29.7 to fix compatibility issues with ts-jest


### Codings

  After configuring the code, create a calc.ts and exported a soma function that receives two parameters and returns the
  sum, inside test, created a calc.test.ts just to test if jest is working

## Lesson 2 - Basic Example #02: Use Case Creation

  We're going to create an hypothetic scenario to start thinking, and then refactor it to apply the concepts of "Ports
  And Adapters"

  First we are going to look into an example outside of a system to then enter a more realistic scenario.

  In the realistic scenario we will start in a very straight forward way, without using a more planned architecture and
  then refactor it along the time

  #### RegistrarUsuario Use Case

  This use case will be consist of a RegistrarUsuario class, that has an array of 'usuarios' that consist of an empty array
  and a single method `executar(nome: string, email: string, senha: string)`

  This method will create a simple encryption for the password, by reversing simply reversing it, create a user constant
  and push it to the array.

  But the question is: "If I want to turn this use case flexible for not simply register an user in memory but also to save
  it on a database, a file, any other place that isn´t necessarily this file. Is there a possibility of customizing the use
  case?"

  Other question is in case we want to encrypt the password in a different way, is that currently possible in the code?
  The answer is no, because the code is completely hard-coded, it simply receives the three parameters, implement what is
  inside the function body and there is nothing we can do to customize this use case\

  In case we change this in-memory array and change it to use a database, it will also be hard-coded and we will be tied
  to it. There would'nt be a possibility of saving it in any other place.
  Why? Because the use case simply executes a given algorithm.

  The question that arises is: "How can we apply the dependency inversion using the concept of Ports and Adapters so we can
  make our use case more flexible?   

## Lesson 3 - Basic Example #03: Class `Banco`

### First Refactoring

We'll start by creating a `Banco.ts` class, with a single array property `itens`, and a method to insert the parameter inside
this array, and then replacing the RegistrarUsuario, to instantiate this class and use this method.
  . One interesting thing we can do, is to maintain a singleton approach to Banco array, defining the array as static, and
  by doing this, it won't depend on the instances.

We separated the responsibilities, however, we still aren't able to customize the code, it keeps on being hard-coded to save
on the database, within separate instances or not. We Simply changed the internal implementation, but from the user's point
of view the persistence place remains the same.

This is clear case of where the use case is tightly coupled to the `BancoEmMemoria` implementation. Which violates the
dependency inversion principle. In next refactorings, we would like it to depend on an abstraction, and not a concrete
class.

And even if we "try" to change something, like specifying that this is not a simple 'Banco', but a 'BancoEmMemoria' to 
specify that this database is only in-memory? The `RegistrarUsuario` class is still tied to it.

### Ok, if none of these changes modified this, how can i make it more flexible?

The solution is to create a **Port** and having something that will adapt to this port.

In further refactorings, we will introduce the database's implementation (the adapter) as a parameter inside the constructor
(**dependency injection**). By doing this, the use case will only know about the interface (**Port**) and the code that
invokes the use case will define if it will save it in memory, in a mysql, or simply in a JSON file

We could also think of something similar to the method that will encrypt the password, and instead of coupling the logic
inside the class.

### Even though or tests are not still flexible, we are already separating the concerns

We created two separate files, one for encrypting the password and other for the database, which removed the logic from
the use case and now it only has to focus on doing what it is told to.

The test only needs to call the use case method and checks if the use case's return matches the test expectation 

. However, if the password was a rule, we grabbed a rule that is not part of the use case itself, and separate in a
different file, placed that rule inside our use case and eventually we can reuse it in other places.

### Password Encryption *notes*

A password encryption method is not a business rule, but defining if a password must be encrypted

Basically we will want to encrypt some data, maybe use a third party algorithm to do this and externalize it. Since implementing
this algorithm is not a business focus.


### Abstraction (Port) and Adapters Notes

#### Abstraction 

In a language such as TypeScript (Java or C#), abstraction is the contract, the definition of what has to be done, without
specifying "the how"

● Abstractions can be implemented with

1. Interface (Recommended for Ports): It is a clear contract that defines only methods and properties, but without implementing
the logic. e.g.
  ```ts
    interface IDataRepository { save(data: any): void}
  ```

2. Abstract class: A class, which cannot be instantiated. It may contain some already implemented methods and others that
are abstract (with no implementation, requiring subclasses to implement them). e.g
  ```ts
    abstract class BaseRepository {
      abstract save(data: any): void/
    }
  ```

####  Implementation/Concrete (Adapter)

The implementation  is the code that fills the abstraction, this is, the class inherits from the abstract class or
implements the interface. Here we define how to saveInMemory or saveInDatabase

### Final Conclusion

  In summary
  
  • Abstraction often called **Port** defines the "what", the contract of functionalities that the core needs.

    . It is the boundary that isolates business logic from external concerns.
    . It is ideally represented as an interface (like `IDataRepository`) for a clear, pure contract

  • The implementation (often called as **adapter**) defines the "how", the concrete logic that fulfills this contract. 
    . The adapter is the code that realizes the abstraction and handles technical details such as saving data in memory, to a
    database, or calling an external service.
    . By implementing the interface of extending the abstract class, the Adapter ensures that the core system can interact
    with the outside world without caring about the details of where ow how the action is executedd

  Therefore, this creates a clean point of exchange (contract), and the implementation/Adapter provides the multiple
  concrete mechanisms to meet that contract, resulting in highly decoupled and maintainable code



## Lesson 4 - Basic Example #04: Dependency Injection (Database)

### Second Refactoring

### `RegistrarUsuario` class

Now that we have configured the environment, we can start to define a flexible use case. For this, we will create an
interface called `Colecao.ts`. At the moment, we won't worry about where this will be placed in the file structure and
what it will this implementation become.

Inside `Colecao.ts` we will define an interface called Colecao, which will have a method named inserir, it could be any
name, but just following what we already have, since we still don't have contracts to meet. We will only define what the use case expects.

Back to BancoEmMemoria class, we will make sure it implements the Colecao and comply with the Colecao interface

And to make sure we have the flexibility in our use case, instead of directly instantiating the persistence type, in this
case, `BancoEmMemoria`, we will want to receive the implementation on the constructor, e.g.

If we simply utilize this.colecao.inserir, it knows what this type consist of, independent of the class/interface that is
being used we know that it will have the `this.colecao.inserir()` method.

```ts
  	constructor(private colecao: Colecao) {}
```

This means that the constructor needs to receive a parameter that implements that Colecao interface. And this element, doesn't
necessarily need to be a `BancoEmMemoria` or `BancoMySQL` as long as it adheres to the interface type.

Since we no longer have this binding/coupling with `BancoEmMemoria`, this will turn the use case way more flexible.

### RegistrarUsuario test

With this being done, when we instantiate `RegistrarUsuario`, we now have to inform it an instance of `Colecao`, because
by default, not even the use case that receives an implementation of `Colecao` knows about it. It  does not know which
class can and will be inserted there, it only knows that it requires it via parameter.

This is where we will have a **Dependency Injection**, which means that "someone" needs to pass down something it depends
on.

Now with this change, we need to go back to our test, and where we instantiate RegistrarUsuario, inside the parentheses
we need to inform an instance of `Colecao` (Which can be an instance of `BancoEmMemoria`)

We can notice that inside our use case, there is no dependency of `BancoEmMemoria`. It simply receives a `Colecao`, which
could even be saving on the cloud or a database. 

The fact is that an instance of `Colecao` is required for the class to work. By doing this, our use case became more
flexible and we can utilize multiple ways configure our use case and create an instance of `RegistrarUsuario`


#### Implementation Recall:

  The implementation MUST satisfy the interface contract. The contract defines the signature of the method, its names,
  number of parameters, type of parameters and type of return

## Lesson 5 - Basic Example #05: Dependency Injection (Cryptograph Password Provider)

  ## Criptografar Senha

  We are going to repeat the same sequence for the InverterSenha class:

    1. Create a Cripto interface with the contract of a function named cripto which receives  a parameter `senha:string`
    2. Inside InverterSenha, implement this `Cripto` interface, and define a cripto method
    3. Inside `RegistrarUsuario` class, where we instantiate a new inverterSenha() class, remove where we were hard-coding
    a n instance of InverterSenha, change its constructor to inject any class that implements the interface cripto
    4. Inside the tests, pass down to the constructor of RegistrarUsuario, an instance of cripto. e. g

      ```
        // `Registrar Usuario` class
          	constructor(
		          private colecao: Colecao,
		          private cripto: Cripto,
	          ) {}

        // RegistrarUsuario.test

          	const bancoEmMemoria = new BancoEmMemoria();
            const inverterSenha = new InverterSenha();

            const casoDeUso = new RegistrarUsuario(bancoEmMemoria, inverterSenha);
      ```

#### Instructor's naming conventions:

  • Where i used Cripto to name the interface, he used ProvedorCriptografia, since it is an interface that will provide
  a function to encrypt a password, and modify the whole code to conform with the new name.

#### Different implementations

  We can see the power of the dependency injection by creating another test using other implementation of ProvedorCriptografia
  , and in the new example, we are going to use `SenhaComEspaco`, and create another test to show case the dependency
  injection and how we can use two different implementations in the same test file

  ## Lesson 6 - Basic Example #06 - Folders Configuration

### The architecture must make the code intentions clear

Even though folder conventions are not part of an architecture, we are advised in the CA (Clean Architecture) book, that
to name files, functions and classes in a way that they reveal their intention — The names should make our intentions clear.

The code must also be **"self-documenting"** — If we feel the need to add a comment to explain something that the name itself
doesn't make clear, then the name is explanatory not enough.

The author even extends this reasoning to an architectural level by saying:

  "The architecture should scream the intent of the system"

The idea behind this quote is:

  • When someone opens our project and looks at the folder and file structure, they should immediately understand the
  system's intent
  • For example, an e-commerce system should not "scream" controllers, repositories, services; it should "scream" products,
  orders, payments, etc

### Folder organization and guiding questions

  This is not going to be the definitive organization, but it will be used to exemplify how that separation should resemble

  • Inside src create a folder `exemplo` and inside of it two other folders of `adaptadores` and `portas`. And the questions
  we have to do to move the existent files is something as:
  
    1. Now where should we put the `Colecao`: "Colecao is an interface which is used for the dependency injection and other
     classes must implement from it", This means that it is an "entry PORT" inside our application
    2. "Do our code have another interface, that acts like a contract to other classes?" The answer is yes, `ProvedorCriptografia`
    is also a contract
    3. And the adapters? do we have any for the adaptadores folder? and the answer is yes, `BancoEmMemoria`, `InverterSenha`,
    `SenhaComEspaco` are all classes that implement these contracts and **ADAPTS** to them, which mean, they must go into the
    adapters folder
    4. Inside the exemplo folder, along with portas e adaptadores folders, we can create a folder that represents our app
    6. Create an app folder and move everything related to our app. Therefore, move the ports folder to this folder (not
    the adapters, adapters are part of the "rest"). 
      - Inside the adapters there are implementations that may depend on databases, services, and therefore, we access
      technologies with no restriction and inside the app folder, we don't have any dependency on frameworks and specific
      databases because or application must be decoupled from this kind of dependency 
    7. inside app, create a folder for each entity, in this case, we only have `usuario`. It will be used to centralize
    everything related to a `Usuario`, which means we can move the use case RegistrarUsuario to that folder. Because the
    organization can be separated by business and not aspects of infrastructure. In fact, even the DDD book has a chapter
    that it talks about creating `modules` on top of infra details — In other words, technology names, For example, when
    creating an "adaptadores" folder, at any moment we are saying that the business has that word "adaptadores", it is
    simply a detail of infra and the pattern being used. If it makes sense to name it as adaptadores or not, it is a
    matter of project's nomenclature choice. Therefore, in addition to making the architecture "scream", which is an
    explicit architecture, we should always make the business we want to solve "screaming" in the app, every time we can
    use folder names that represent aspects of the application, it is better than simply naming folders using technology
    names.
    8. We can also create multiple separate folders for the adapters. So for example, we have adapters for the database
    and for the password encryption. Creating two separate folders for each of them and not placing both of them in the
    root is a good approach.

  ### Architectural Conclusion: Prioritizing the business

This set of steps solidify the project structured based on two essential pillars: The dependency inversion and of Domain
Priority.
  1. Decoupling and Specific Boundaries
    - App: It is the core of the application, in that folder should reside the ports and the entities use case, and is now
    the "control center". By moving the interfaces to that folder, we ensures that the high level coding (the business)
    defines the controls, and not the low level code (the infra).

    - Infra (adapters): Kept separate, this folder contains the **concrete implementations** (`BancoEmMemoria`, `InverterSenha`,
    etc). This separation ensures that what moves the application (use cases), remains technology-agnostic — We can
    change a database without changing the business logic
  
  2. "Screaming" architecture

    - By separating the app in entities, we prioritize, we enforces the project to "scream" about its domain

    Any developer who opens the folder app/usuario immediately knows that the system deals with users register. This is
    infinitely more informative than having folders named just by technology (interfaces, services, repositories), that
    may obscure the software main functionality.

  In essence, we are creating a project where: 

    . The dependency flows correctly: from the inside out (infra depends on the app)
    . The structure reflects the business: the domain is visible and centralized

  This approach does not only ensure technical flexibility, but also superior maintainability and scalability, since the
  architecture protects the application core from outer changes

#### Material Icon Theme Folders

This doesn't have anything to do with our code, is just for better visualization.

There are folders that are already associated with different icons, but some don't and is the main gray folder, to change
this, we can check the material icon documentation and modify the global json settings.
and associate the folders we have, that don't have icons associated with, to some of the already defined ones that express
what we desire. 

e.g.`"material-icon-theme.folders.associations": {"portas": "circleci"},`

## Lesson 7 - Basic Example #07: Real Password Encryption

We'll start this lesson by creating an user interface.

We already have a `ProvedorCriptografia`, however, it would be important if in addition to just encrypting, it is able to
compare an original password to an encrypted one.
To create this, inside the interface, add a new contract `comparar(original: string, senhaCriptografada: string): boolean

Since we altered the port, we are required to change every adapter that implements it, because they need to comply with
the interface.

However, we are using a strict comparing `===`, which is not necessary able to be resolved in the use case, therefore it
is interesting that the implementation itself knows how to compare two encrypted passwords.

Create a new password implementation to define a real encryption using the bcrypt library.
Create a new test for this new implementation

And we notice that for the use case, the adapter that implements the given contract, is irrelevant. We've kept the
same use case for the tests while swapping between different adapters (e.g, simple encryption with password inversion, 
and complex hashing with salts), and in both scenarios, the use case tests behaved the same worked the same.

● Async | Sync

The main difference between defining a constant to store the salt (` const salt = bcrypt.genSaltSync(10) `) and calling it
with `hash(password, 10)`, are:

1. Type: Asynchronous (non blocking) | Synchronous: blocking
2. Salt: Automatically Generated. | Manually generated (two passwords in the same function call, use the same hash)
3. Security: Same level
4. Performance: Better suited for servers and APIs | May block the event loop if multiple executions happen simultaneously
5. Simplicity: Cleaner and more common nowadays. | Slightly more verbose 




***Bcrypt comments: 
Every time we are going to encrypt a password with bcrypt, we will need to generate a salt. The salt is not required, we
can simply pass as the second parameter of the hash function, our "cost": (e.g., hash('myPassword', 10)), 10 is out cost
factor, the bigger it is, the safer and slower it will be.

Salt is a random value added to the password before the cryptography, It is used to ensure that:
  . Two people with the same password will have 2 different hashes
  . rainbow tables attack, that hackers use to try to figure out a password, are ineffective 

When using methods such as genSaltSync, if we intend to save two passwords in the same render, it should not be used,
since the passwords are going to have the same hash. If we are willing to generate more than one in the same render, the
best approach would be bcrypt.hash(password, 10); and not a constant.
***

***
Simple recap: 
• Interface defines a method that should exist but not how they should be done. The implementation is the one
responsible for fulfilling the contract and defining how each method really works.

• Port contains the necessities that the app has, which in this case, is the necessity of a login, that will require both
passwords to be compared.
***


## Lesson 08 - Basic Example #08": User interface

Now that we created a real cryptography version, we will create a real database class to persist on a database. This way,
we can create a real example that will look like an integration test that will pass through a real adapter and save it on
a postgresql database. This way, we generate a use case that is minimally functional.

Within the folder `usuario` folder, define an interface Usuario

Even though an interface may not be the best option, and the best one would be to create it as a class and make it as rich
as possible, but the focus on the course is CA and Hexagonal Architecture, so it will remain an interface. 

To use this new interface we will make some modifications:

  1. In `RegistrarUsuario` class, type the usuario with this new interface, this way, we type guard the usuario constant
  because we will clearly know its attributes and if the attributes correspond to its types.
  2. Type the `executar` method return as `Usuario`
  
Suppose we have an occasion where we are creating a constant, defining its type as user, however its email is required and
we don't have one and we won't have a full user, what should we do? 
  - 1: Inside typescript we have the possibility of enclosing the `Usuario` type in an utility function named Partial<>,
  and what it does is to turn every required attribute as optional
  - 2. Define the interface attributes as optional.

In later classes, to improve organization, we can create interfaces that represent a use case, where this interface will
be a standard among all the app's use cases.

install the package dotenv to create a .env file

## Lesson 09 - Basic Example #09: Define a Real Database

Install knex (query builder (it can eventually have the db drivers)) and pg (driver to connect with postgresql).

Inside the adapters, create a knex folder and a knexfile.js to define its configurations, even though it is not going to
be a concrete implementation, it will be used by the other db implementations
  - The reason for this file being a .js, is because when using knex, we will be able to call the migration commands outside
  of our project that is configured in typescript. So for it will important for us to define in tsconfig that it allowsJs

Install dotenv to create an env file to store all the sensible configurations or environment specific (such as passwords
and URLs), env files are important for the app to alter without changing its logic

Inside env file, define a DB_URL with our database one and use it on knex's connection attribute

Since our package.json type is a module, make the js file to be a .cjs, since the file extension overrules the definition
in package.json

### package.json knex scripts

  All knex scripts will need to include the configuration path of the knexfile, because since knex isn't defined in the
  root folder it won't automatically find it and need to be specified.

  1. "migrate:make": Create a migration file that will make knex to read our config file and generate a template for us
  to write db updates — such as createTable

  2. "migrate:down": Undo the table creation

  3. "migrate:up": Execute the table creation

## Lesson 10: Basic Example #10: Update the Port

  The previous lessons established the core concepts of Ports and Adapters. Now, we are making some important architectural
  refinement by moving from generic interfaces to context-specific Ports

  The idea isn't just to drop interfaces into a single "portas" folder. That's a temporary step. The real goal is to be
  coherent and define the ports inside the contexts they belong to

    . If an interface is specific to managing user data, it belongs right next to the `User` entity and its `Use cases`,
    inside the `usuario` folder
  
  This grouping makes sure that when we look at the `usuario` module, we see everything related to users, be them entities,
  business logic, and its contracts (ports) needed for it.

  ### Defining the User-Specific Port: `ColecaoUsuario`

  We can start by defining this context-specific port. This interface will handle all communication according with the 
  `usuarios` data table.

  And the reason why the inserir method's return is a Promise<void> and not the actual user, is because in real-world
  projects, database insertions functions rarely return the full object. They often return nothing or a Promise<void>.
  Success is implied by the return; and errors are signaled by throwing an exception.

### Refactoring the `BancoEmMemoria` adapter

  Since our existing in-memory database only handles users insertion. We can also make it specific and align it wit the 
  new refactorings

    Therefore, we are going to follow some steps:
    
    1. Rename: Change the class from the generic `BancoEmMemoria` to `UsuarioEmMemoria`.
    2. Typing: The adapter now explicitly implement the new `ColecaoUsuario`, and the usuarios will adhere to the
    `Usuario` interface we've created

    And by changing the adapter name and type to be specific to `Usuario`, we narrow its responsibility, making the code
    cleaner and easier to read

### Implementing the database adapter

With the port defined, we can create an adapter based on knex, and it will handle the actual SQL connection

### Centralized knex connection

Inside knex folder, we can create a file to export the configured connection object. Which will act as a reusable code
among the resources that can make use of the db. This will happen by exporting a `conexao` constant as default, which will
be the result of calling knex library `knex` method and invoke it wrapping our connection as argument: e.g. `knex(config)`

Now our ColecaoUsuarioDB can simply import conexao and call:
  `await conexao.table("usuarios").insert(usuario)`

  ### Shared dependencies folder

    instead of placing the `ProvedorCriptografia` inside the ports folder, one option would be to create a shared folder
    and place it inside that folder, in case multiple use cases make use of it.
    If no other scenario uses the cryptography except the user, it would be specific for the `usuario` needs and we could
    move it together with the `ColecaoUsuario`.

    In other words, if everything that has to do with a certain entity, like its use cases, its entities, and its necessities
    (which could be seen as the Ports), they can be moved to the specific folder.

    By doing this, by separating the concerns, with both the UsuarioColecao port and the ProvedorSenha inside the usuario
    folder, we can even remove the ports folder

## Lesson 11 - Basic Example #11 (Architectural "Crime")

In this lesson we are going to commit a "crime" against the architecture to show that sometimes we can violate the architecture,
be it by bringing a library to our core. However, inside an approach where we measure the "trade-offs" and come to the
conclusion that nothing will be loss and there won't be a large coupling in the architecture, and if eventually we have
to change a strategy, we can create a port and adapters for it.

### Possible Trade-Off Example

We are going to install a dependency called 'uuid' to generate random ids and send them directly to our application's
database, where we will like our application to control the id's generation and not the database.  

This is a good option if we are thinking on changing the database and it can be positive depending on our architectural
choices — We can choose that the best is our application to create or the db to define it.

Within the `app` folder, we can create that shared folder we just talked about. Where it will consist of classes such
as the id, that will be shared among multiple use cases.

The id class will simply have a static gerar method.

"We may think, but in earlier classes, you hadn't said that the application/core should not depend on external libraries?"

However, we may also think: "Well, the cost/impact of the uuid library is very small and would not make our code coupled,
so i think there isn't a problem"

**The instructor's approach of using the import uuid for Id class didn't work for the tests, so i moved to randomUUID();**

In the test case of registering a user on the real db, we are executing the test, without passing an id, who deals with
its generation is the use case.

The insert in the database happens based on the object's interface. If eventually, one of the database columns is different
from the interface, we would net to create a mapping which could including be inside that class, where we create a private
function to convert it to the way the database wants, and to convert back when we consult a user from the DB.

### Check e-mail exist

If we would also like the rule that confirms that uniqueness of an e-mail to also exist on the use case and to not depending
uniquely on the database to do so, we will have to update the port — `ColecaoUsuario` to allow this verification

#### But why? 

  - The database already blocks duplication (technical rule / infra)
  - But inside **Clean architecture**, the **business rule should not depend on the database** to validate something so
  important
  - Therefore, a **Use Case Layer** must "ask" to the repository if that e-mail already exist, and this is a business rule
  reinforcement. 

To do so, there are some steps to follow:

  1. Changing the `ColecaoUsuario`interface: define in its contract a new `buscarPorEmail(email: string): Promise<Usuario | null>`

  2. Implement that check in the ColecaoUsuarioDB adapter

  3. Add this function to the useCase

  4. Test remains the same

  5. And for the in-memory database, we must also need to implement this new contract, however, it is not in the database
  how can we return a Promise? Simple, when defining a method as async, we are already wrapping this method in a Promise
  we just need to iterate over all the users, check if any has the given e-mail, and throw, use this method in inserir
  and the adapter also won't be much different from the real db

  6. Since in the local test, the itens array is static, and the database acts like a singleton among all the tests, we
  need to add a reset method before each test. Or we can simply add a different e-mail for each test, but for study purposes
  a reset function will be created and used in the beforeEach() function of the test file.
    6.1 Since the database adapter won't make use of this function, we can simply create an utility function that will empty
    the itens array, and there will be no need to change the port


### Classes that have only one static method

  We have an Id class which the only purpose is to encapsulate the function uuid() making it accessible via
  `Id.gerar()`.

  However, the main argument against classes that contain only static methods (known as utility or helper classes), is
  that they violate one of the principles of OOP by being used essentially procedurally

  If a class does not have state (non static instance variables) and doesn't need to be instantiated (created with the
  keyword `new`), many argument that it should not be a class

  One cleaner and more modern approach to group utility functions is simply creating a module (file) that exports functions
  (and not a class)

  ```ts
      import { v4 as uuid } from "uuid";

      export function gerarId: string {
        static gerar(): string {
          return uuid();
        }
      }
  ```


 
 





## Overall Concepts

### Difference between modules in tsconfig

This question was motivated by a case where my ts init, wasn't giving the same result as the lesson one. While my tests
was throwing an error of "can't use 

While in the instructor code, the generated tsconfig, consisted of a type commonjs, and with a es2016 target, the latest
typescript's version, generates one with module as nodenext and the target as esnext

But what are their differences? 

  • commonjs: When the module is defined as `commonjs` typescript does two things:

  1. transpile the import and export from our ts code to the cjs syntax (require/module.exports).
  2. Node.js/Jest, which prefer cjs, are able to load and execute the cjs compiled code with no problems.

  as a result, the error doesn't happen because by the running time. there is no instructions of import on the generated
  code

  • nodenext

    When the module is defined as nodenext (new standard for ESM), typescript does the following

    1. Keeps the import and export syntax on the generated JS (or doesn't generate code, only check the typing)
    2. Tells Node.js: "Treat this file as an ES Module"

    If the testing code is being loaded by Jest before ts-jest is able to correctly transform it to jest's esm environment,
    we will see the error

  #### Is there a solution for using the nodenext?

  To keep nodenext/esnext configuration and solving the error, we must ensure that jest is enabled to run ESM end-to-end

  This is an hybrid approach

  1. Correcting package.json (ESM Guarantee)
    Add "type": "module"

___________________________________________________________________________________________________________________________

#### /// <reference types="jest /> 

This code seems to be a comment, but it has a very specific role

##### Why is the command similar to a comment but is not? 

1. Syntax: The /// syntax is called a reference directive or triple-slash directive. It begins with three slashes, that is
a special syntax which typescript compiler and IDEs recognize.
2. Function: The compiler reads this line as a JS code, it will be ignored, but the compiler will use it to resolve the
types

##### Why is this directive necessary for the jest case? 

If we are having problems on making TS to recognize jest global functions (`test`, `expect`), and we could notice we were
getting errors with cannot find name, so there were two possible solutions

1. Global (tsconfig): Add "jest" in the types section of the tsconfig.test.json
2. Local (Triple Dash-Reference): Use the directive in the file

Even though the solution of the tsconfig.test be the "correct" and global way of configuring, sometimes, in complex setups
with Jest/TS/ESM, the compiler or the IDE may take a long time to recognize or simply faille in injecting these types on
our IDEs

Adding this directive on top of our file is a fail-safe guarantee that enforces the compiler to include the types and make
that error to vanish

## Errors

  1. When i created a package.json with the `npm init -y` command, the type attribute came as commonjs, which have a different
  syntax from the type: module that i'm used to. The main differences are

    1. Importing syntax: While commonjs uses `const module = require('name-of-package'), esm modules uses
      import module from 'name-of-package'
    2. Exporting Syntax: Commonjs uses module.exports = {...} or exports.function = {...}, while esm uses typed exports or
    default exports
    3. Commonjs loading is synchronous, it blocks the code execution until the module is fully loaded, which is typical in
    servers. Module is asynchronous, meaning that it allows the code to continue being executed while the module is loaded,
    which is essential to browsers and performance.
    4. Import usage: common is node; s historic default from node.js, while esm is the default pattern of modern JS
    5. Default extensions: While in commonjs, .js files are treated as CJS, in ESM .js are treated as ESM 

  Therefore, what type: module tells our project is saying to node.js: 
    1. Interpret all the .js and .ts files in this package as ES Modules. 
    2. Enables the modern syntax: Allows us to use import and export (as well as other features, like top-level await)
    3. Inside TS: Since we usually use the module as "nodenext" in tsconfig.json, TS adapts itself to this configuration,
    ensuring that our ts source code is verified and correctly compiled for a ES Modules environment

  



