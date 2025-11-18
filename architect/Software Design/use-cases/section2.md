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
  would like to show it in "BRL"? Since we have access to the model, we can modify the preco.valor to preco.formatado.
  

