## Lesson 1 - Setup (Configuração)

We start by creating a basic configuration similar to previous courses and have the least possible configuration so we can
use typescript working on the app.

We maintain the configuration as simply as possible and .vscode/settings.json to utilize code-runner


## Lesson 2 - Organization (Organização)

We will execute out gui after the terminal using terminal-kit library

App will be divided in core and the external.

we will create the folders shared and usuario inside the core

usuario will be divided in:

service (application services / use cases )
providers (where we will put out interfaces and make use of the dependency inversion)
model (Usuario model)

In the beginning we won't work with the adapters, so we are not going to create the folder in this moment. 

## Lesson 3 - Main Menu (Menu Principal)

The first objective of our graphical interface is to build the menu, for it, inside the external/ui, create a Terminal.ts
and this Terminal will be used to encapsulate the terminal kit calls so we can create titles, menu, and make use of our
app

### Terminal's menu function

. const opcao = await singleColumnMenu().promise: Means that it will create a terminal with a single column and store in
the `opcao` constant, the index selected in that opcoes array passed
. return the selected index and the option's selected text

### menu/MenuPrincipal.ts class

File to create the main menu of the app

since the Menu function returns an array with the selectedIndex and the texts, first we assign the Terminal.menu to an
array of [_, texto] since we will only be interested in the option text and not index

Create a switch that execute a given operation for each selected text

In the end of the method, make a recursive call, since when we want to select an option and not quit the processing, we want
it to keep calling the menu recursively until we choose the "Sair" option

## Lesson 4 - User Register Use Case (Caso de Uso Registrar Usuario) - #01

  Still inside the ui, create a usuario folder with a registrarUsuario class

  Create a function to wait a user to press enter and only then go back to the main processing.

  In the main menu, change the opcao 1 text to registrarUsuario and case processing for firing the use case

  ### esperarEnter()

  Function that returns a promise<void> and awaits the user to press enter.

  • `await terminal.inputField({echo: false}).promise`
    echo false won't show what is being typed, will wait as it was an input field, and after we press enter it understands
    we inputted the data we wanted and move forward

## Lesson 5 - User Register Use Case (Caso de Uso Registrar Usuario) - #02

Start by defining a new method `campoRequerido` method inside the Terminal.ts, which will only certify that we only move forward if we type something.

We will define a valor constant and assign to it the result of terminal.inputField

An input field receives as parameters an InputFieldOption, so to make this method more flexible and to not  be tied to
only one scenario, we will add another parameter to the campoRequerido function that are options? of that same time. Then
add this options for the inputField opcoes in a way that the only options are going to be expected, and if no option is
typed, recursively calls the function again

## Lesson 6 ~ 11 - Identical value objects from previous courses

Only overall comments

1 - If a value object is instantiated, is because its value is valid and adheres to all the rules.
2 - In an entity properties, that is the most basic form of their attributes, every prop is going to be optional because
then we are able to begin passing their data, but inside the constructor, to build a new one, it will ensure that every
props exist. This will help us on the clone method
3. Senha is optional because we don't want it to traffic through the app, so most of the times that password will be undefined
for preserving their password.
4. Different from previous course, NomePessoa extends from NomeSimples, maintaining the methods that ensure the attributes
validity and adding new getters

## Lesson 12 - Integrating the NomePessoa (Integrando o NomePessoa)

Create a `Usuario` object with the three constants created with the campoRequerido method and print it on the console

## Lesson 12 - Integrating the Email (Integrando o Email)

Integrate the Email value object on the terminal user creation

## Lesson 13 - Integrating the SenhaHash (Integrando o SenhaHash)

SenhaHash value object, will check if, on the user creation, we are passing a hashed password that conforms to the regex
and also provide a method for validating the password based on that regex.

## Lesson 14 - User Register Use Case (Caso de Uso Registrar Usuario) - #03

• Start by defining an interface that will represent a use case (Port)

• Create the core RegistrarUsuario use case inside the core/usuario/service

• The first thing we will do is to validate the password, because we will need a strong password, and with tha strong password
we hash this password for the user creation — the SenhaHash will be originated through a `SenhaForte`.
  - Therefore, in the first line of the use case executar, we assign the constant senha equal to the instantiation of a new
  SenhaForte after the input, and if the informed senha comply with all the rules, it assigns the instance to that constant
  - Before instantiating a user with that new senha forte, we need to encrypt it so it passes the SenhaHash validation

  ## Lesson 14 - Password Encryption (Criptografia de Senha) #01

Create another interface inside the providers folder (Folder where the interfaces that represent business necessities are
going to be placed), even though the password encryption is a business necessity, it also has a relation to the infrastructure
layer, an encryption algorithm, for example. 
Every time we create an interface, we are representing a business necessity, something we need to utilize in our flows
to interact with something that will directly interact with some infrastructure service but is a business necessity we don't
want to directly implement it inside the use case.

Now, with this provedor created, even though that we still don't have an adapter for that provider, the use case do not
know and won't care, it will simply inform in its constructor that it is expecting a concrete implementation of 
ProvedorCriptografia` and will execute the criptografar method from whichever `provedorCripto` in that SenhaForte

  ## Lesson 15 - Password Encryption (Criptografia de Senha) #02

Install the bcrypt dependency

Inside the external folder, inside auth, create a `CriptografiaPadrao` class
Adapters must implement the abstraction so every concrete implementation will implement the same contracts we have defined. 

Back to the use case, first we need to instantiate a new concrete implementation of the ProvedorCriptografia and inject
this instance inside the use case constructor

We will, in later classes, need to create a db provider/interface inside the provider folder, that represents a business
necessity — I'm emphasizing that however these interfaces point to a technology service, they are business necessities.
Persisting a user inside a database in some repository that is persistent and lasting, is a business necessity

  ## Lesson 16 - User Repository (Repositório do Usuário)

Start by creating a new interface inside providers named `RepositorioUsuario.ts`

A repositorio interface define the contract that every repository must follow inside the application. It does not communicate
with the DB, instead, it describes which are the possible operations, like saving a user, fetching by email, list all, update,
or remove. The real communication with the database happen inside the concrete classes that implement the interface, for
example: RepositorioUsuarioPrisma, RepositorioUsuarioMongo, etc.

This repositorio will also be injected on the use case constructor.

Since our concrete class is a in-memory database, a way for it to share every persistence made by the use case and not reset
every time, is to define a static property equal a new instance of the database, and when injecting the Repositorio to the
use case, utilize this static instance attribute

  ## Lesson 17 - User Login (Login Usuário)

In usuario/service create a new LoginUsuario.ts class that  implements a CasoDeUso.

define a constructor that injects the dependencies and accesses these interfaces methods

Define the comparar senha inside the implementation

Retrieve the user based on its email and compare the password with the hashed password

### semSenha(): Usuario

We should never return a user with the password when logging in. So, to prevent this, we create a semSenha method that
returns a clone of that instance, but passing the senha as undefined. Being able to clone an instance and choose if we want
to pass a property as undefined is the primary reason for the optional properties

`senha?: string` means it can be undefined, string, or empty

`this.senha = props.senha ? new SenhaHash(props.senha!) : null` comply with this behavior, so our class already
predicts that this may happen

### External UI Method

In the externa folder, where we are creating means to access the use cases via the terminal.kit add a new file for
the login

  ## Lesson 18 - User Session (Sessão do Usuario)
 
Inside the utils folder create a new Sessao.ts file

For the Session, we will need to store only their properties but no a `Usuario` itself

Define the usuario as a private attribute, and create methods to initiate a add the user to that session, get the user
and its sessions

The iniciar method will assign the user received as parameter to the session private attribute

After the login is made, we utilize the Sessao.iniciar method


  ## Lesson 18 - List Users (Listar Usuarios)

  Use case that return us a list of users. Follow the same pattern as the ones before.

  Create a new behavior inside the terminal utility for listing a table.

  Object.keys(dados[0]), will get all the keys from the first item array
  as a second parameter of terminal table, map over the dados and return and over each data utilize the Object.values(d)

  instead of returning to the table a full user, we can utilize only the `Usuario` properties we want

  ## Lesson 19 - Product (Produto)

Inside the `Usuario` folder, we created separated it in the model, the providers, which hold the interfaces `ProvedorCriptografia`
and `RepositorioUsuario` and the service

However, in the external ui folder, inside `usuarios`, we are directly using the core layer, which isn't the best practice.

For the entity `Produto`, we will make use of the adapters layer to deal with this translation and separate more the concerns.

  ## Lesson 20 - Product Repository (Repositório Produto)


  similar to the UsuarioRepo


  ## Lesson 21- Register Product (Cadastrar Produto)

CadastrarProduto will be the first use case for product.

Use the create the ProdutoRepo concrete implementation inside `external/db` folder
Since cadastrarProduto use case, receives a produto:Produto, we have to 

  ## Lesson 22 - Fetch Products (Obter Produtos)

- For this use case we won't have any input parameter, and for the output, we will return an array of `Produto`.
- Define a repo in attribute in the constructor
- return repo.obterTodos() method

in the terminal kit use case call

- no need for creating any required field
- instantiate the use case, repository implementation instance singleton
- call method
- return the produtos in the `tabela`

## Lesson 23 - Interface Adapters (Adaptadores da Interface)

The idea of having these adapters, is not running the risk of bringing an unnecessary complexity for the GUI, and they
should only be inside a use case and the model.

The idea of the "green layer" is creating a "protection barrier" so that we can evolve our use cases/model without these
evolutions directly impact our gui.

There may be an advantage of the graphical interface accessing the use cases/models, because it will minimize the complexity
by not having to implement another layer, but on the other hand, we end up creating a bigger coupling level.

• One example would be:
  . We have our "listarProdutos" use case, and in this moment, it is showing the price in the number format, but what if we
  would like to show it in "BRL"? Since we have access to the model, we can modify the preco.valor to preco.formatado and
  we will show it on gui normally
  . But the problem is, even though it is simpler, it generates a coupling between the value object and the use case call.
  and when we start to bring the model to the gui, the chances of skipping the use cases and defining the flows directly
  in the graphical interface and start to lose visibility of what are the flows that were really implemented in our app.
  . We will think like: "Ok, i have access to the model, to the domain services, and the value objects", we will fatally
  get all these elements and directly put them inside our graphical interface. And by doing this, we will stop implementing
  the use cases and of having these flows visibility by mixing everything.
  . And all of this can be solved using interface adapters.

• To help with this, was introduced the interface adapters interface, essentially to create a barrier between the external
(e.g. GUIs) with the use cases and the model. When we talk about creating an extra layer, creating a clearer separation, 
it will bring a cost in terms of codes, since we will have new classes, that there will be more rules to be followed, and
so on. 
• But even though we will increase its complexity, there are several benefits. Primarily at long-terms. If we don't have 
the possibility of bringing the whole model power, to our UI, we will depend more on the use cases, creating better mappings,
separating the flows, implementing them at the right places and consequentially, making our UI as simple as possible.


## Lesson 24 - Adapter Layer / Product DTO

DTO means **Data Transfer Object**, this pattern basically extract all the model intelligence and put inside a DTO only
the data that interests us for a given GUI. DTOs can also be specific DTOs, assume we have a specific interface that is a
report of all products of the company — we would then have a DTO responsible for transferring the data to this GUI.
We don't have the necessity of creating a single DTO for each interface of our app, it would be costly, but eventually some
interfaces may have specific needs to them.

### Core Model vs The DTO

Our domain entity's properties are defined by the interface $\text{ProdutoProps}$. This interface has a very clear,
foundational purpose:

• ProdutoProps Purpose: To define the raw, simplest, and required attributes for a `Produto` entity (e.g., id, name, price,
in their raw formats like 'string' or 'number'). These properties are the input necessary for the `Produto` constructor
to perform all business validations and instantiation. It represents the persistent, validated state of the entity

The ProductDto has different purpose, focused on display

• `ProductDTO` Purpose: To prepare and structure data for consumption by a specific GUI or external client. It's a view
or projection of the model data, tailored to a use case (e.g., a product report or a checkout screen).

### Why extending ProdutoProps is not a DRY violation?

We design the ProductDTO to extend ProdutoProps (or use TS utility types like Pick or Omit on it) to maximize code reuse
and maintainability.

Once we pass the `ProdutoProps` into the constructor, and it passed by all the validations and created a product, it means
that all the data we passed, are correct and adhering our apps business rules.

• Reusing the Base Definition: By extending ProdutoProps, the DTO inherits the base fields (id, nome, preco) without 
redundant re-declaration. This is the essence of adhering to DRY, if a base field changes, the DTO's inherited structure
updates automatically.

• Adding values, not duplicating: The DTO's value comes from its ability to introduce presentation-specific attributes,
that are unnecessary or inappropriate for the core domain model. Like totalizers for reports, formatted data, formatted
price, and so on.

The DTO is not a duplicate definition, it is a specific, improved contract built on top of the necessary domain attributes,
ensuring flexibility for the presentation layer without polluting the stability of the domain model


## Lesson 25 - Adapter Layer / Controller

Controllers act as the entry point and adapter layer between the outside world and our application's core business
logic

### What they do?

1. Receive/Translate Input: They accept raw input (e.g., HTTP request body, query parameters, command arguments). 
2. Instantiate Use Case: They initialize the appropriate Use Case (e.g., ObterProdutos).
3. Call Business Logic: They pass the necessary data to the Use Case's execution method.
4. Format Output (Adaptation): They take the result from the Use Case (which is often a core domain entity) and map it
to a format suitable for the outside world (e.g., a DTO or a specific JSON structure).

Controllers should be used whenever we need to translate an external request into a call to a Use Case and translate the
Use Case's result back into an external response format.

## Lesson 26 - Input and Output - Use Case

Every time we have input data and output data inside a use case, we may use that idea of ports and adapters to make the
conversion both from the controller to enter a use case, as well as the use case response can be converted through an 
interface and an implementation

Start by creating a Conversor.ts interface inside shared, it will be as following

1 - Define an interface with this signature `export default interface Conversor<E, S>`
2 - This interface will essentially convert an input of type E to an output of type S, similar to CasoDeUso
3 - The role of this use case port, is to create a generic way of making this conversion

### Presenter

Presenter is a way of presenting/rendering the data according to the necessity of who called it.
- If we are calling the use case from the UI, presenter could be a DTO. 
- If we are calling from other system, presenter can return a XML, JSON, .csv

That's why we create this separation, between the i/o format and do not tie it inside the use case.
  e.g. The use case will retrieve the list of products in the DB and **always** return it as XML. And with this, we are
  tying the Use Case to this output format, meaning that in multiple scenarios we won't be able to utilize the use case
  because the type of output, is not the expected one.
The Conversor interface will come to help us with this.

Inside the `ObterProdutos` use case, we don't have an input — it is void, so it does not make sense for us to use an entry
PORT inside it, because no data is received and there is no reason for converting anything to the UI.
However, that use case returns data, a list of `Produto`, and we can create an output point, and from the use case, call
it and convert it

For that use case, we can use the Conversor in the constructor and it will receive a Produto as an input and return something
that will be defined by the controller.

In the executar return, instead of the list of products, we are going to map over the `produtos`, and apply the conversorSaida
converter defined by whichever controller will "tell us", on each product.

And implement that output port inside the controller, now whenever we make a use case call, it will be like this:

```ts
  	async executar(): Promise<ProductDTO[]> {
		const conversorSaida: Conversor<Produto, ProdutoDTO> = {
			converter(produto: Produto): ProdutoDTO {
				return {
					nome: produto.nome.completo,
					precoFormatado: produto.preco.formatado(),
				};
			},
		};
		const casoDeUso = new ObterProdutos(this.repo, conversorSaida);
		return casoDeUso.executar();
	}
```

So basically, instead of the use case holding that return logic, we are now making the use call to call the function that
will transform one `Produto` (that is one object of the model), into a simple object that does not have rules. only attributes,
into a ProductDTO

This will enable us to create any type of conversion we want. For example, if we would like the Produto to be returned as
a string, we would create another conversorSaida constant, which would be simply

  ```ts
  		const conversorSaida2: Conversor<Produto, string> = {
			converter(produto: Produto): ProdutoDTO {
				return produto.nome.completo,
			},
		};
  ```

and use this new conversorSaida, as a useCase constructor argument.
We were able to create this simple return with only `nome` because every `ProdutoProp` is optional, as well as the additional
attribute from the DTO.

In addition to the output conversion, we can also other property to a use case constructor that will be an Input Port

And this conversorSaida logic being inside the controller, it does not harm any principle, it makes sense to be inside the
"green" layer, since it adapts the external data to the model and vice versa

### Converter folder

We could even, if we would like, inside the adapter layer, create a folder to centralize all the converters. And from one
single converter, we can have the capacity of saying if it will have certain attributes or not and call the useCase, instead
of using the own controller implementation, using this new separate converter


### Presenter

What we are doing here is nothing more than a Presenter, converting the data in a  way to show it on the gui













