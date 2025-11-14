We are going to apply, in this ead project, everything we learned until now

## Lesson 1 - Validation Error

We will start our project after a `ErroValidacao`.ts class, the reason for this, is because the Error class will influence
on every other class across the app.

Different from the previous exercises, where we had a core folder to have the idea that the core of our app would be
exactly the domain modeling and it should be separate from th app.

But in this case, since the `ead` is "physically" a separate project. Because sometimes, this approach is interesting
because when separating a project, we tend to not have undesired dependencies. So therefore, when we have separate projects,
many times it help us keeping the relationship between the files in a more controlled way.

The ead is essentially the domain modeling of our app. It won't have dependency on database ,any infrastructure service , 
or any dependency with the WEB. Everything will be purely business, objects value, entities, domain services, app
services, and the events. Except use cases / application services.

### ErroValidacao.ts

#### Props

In its properties we will have the code, the value that causes the error, and some extra errors like 'minimum size',
'maximum size' or something that can favor the error message to the user.

This class won't worry about which class caused the error, or what attribute, however, they can also be interesting to
add in the future.

#### Class

The class will extend a JS error and "mirror" the interface properties.

define a constructor, which has its props with the type of ErroValidacaoProps, call the super() method, for calling the
Error constructor and passing the props.codigo as parameter, if it doesn't exist.
Every other property will have its default values in case they are empty. With this, two other methods will be created:

• novo: returns a new instance of ErroValidacao
• throw: instantiates an error an immediately throws it.

#### Never return

Even though we should avoid the  `never` type, when we are inside a method and it will throw an exception, that method
return type is `never`, because this method will never reach its conclusion.


### Constants 

Create a constants file to store multiple errors



### But why the interface does'nt implement/extend the interface? 

Even if that class don't extend this interface, there are still reasons for it to exist.

1. When another function instantiates this class
```ts
function criarErro(props: ErroValidacaoProps) {
  return new ErroValidacao(props.codigo, props.valor, props.extras);
}
```
2. Reuse in other contexts

We can use the same data type to traffic between layers (for example, backend -> frontend), without having to import the
class

3. Separation of concerns

  . The interface describe the data.
  . The class describes the behavior (methods, logic, Error inheritance, etc)


### Functional Paradigm and OO Paradigm

I was a bit confused at first, since i'm used to functional programming, where i would do something as

● Functional approach
```ts
export interface ErroValidacaoProps extends Error {
  codigo?: string;
  valor?: any;
  extras?: object;
}

export default function ErroValidacao(props: ErroValidacaoProps) {
  // creates and return the error
}
```

Which we create an error after a pure function, and the interface is used as a "description of the data".

It is factory function pattern, without using classes

● Instructor's approach

He chose the OOP way of doing the same thing

```ts
export interface ErroValidacaoProps {
	codigo?: string;
	valor?: any;
	extras?: object;
}

export default class ErroValidacao extends Error {
  constructor(
    readonly codigo: string,
    readonly valor?: any,
    readonly extras?: any
  ) {
    super(codigo); // chama o construtor do Error
  }
}
```

Here the class itself is the error "mold", the interface `ErroValidacaoProps` is used simply as an external data contract

## Lesson 2 - `ErroValidacao` Tests

1: seeing if the method `lancar` is returned the expected
2: check if the error is created with `codigo` and `valor`
3: erro com codigo, valor e extras (Although it is hard coded, it shows how we can use extras in a way it make sense on
the real world)
4: Error without a code that must generate an unknown error


### Why did i have to change my default export to export in order for the test to pass?

Sometimes, There is an misalignment with using the syntax alias and resolve CommonJS modules (which jest uses) with ES
modules

  • By trying to export default, the environment may not be able to resolve the path correctly or obtains the whole module.
  • In some cases, specially with jest and ts-jest, the default module value becomes a property named default, and not the
  value directly
  . Final result was that the variable Erros in ErroValidacao.ts ended up being interpreted as an empty object
  . As a result, TS saw `Erros` as {}

To fix this problem, i used named export, providing a more robust and direct for Jest and TS resolve the reference.

  Why did it work? 

  • Explicit resolution: The syntax { `function` } from '...' is an explicit request for the `Erros` property inside the module
  • Less ambiguity: Named exports are less ambiguous and Jest/TS-Jest are able to map and resolve the property name easily,
  ensuring that the Erros variable inside `ErroValidacao.ts` receives the correct value
  • Compatibility: In projects with TS that transpile to CommonJS (which is common), the named exports tend to have a better
  compatibility than default exports.

## Lesson 3 - Validador #01

Different from what we did on the previous project, where the `Validador` class returned error messages, and now, it will
return the exception that was created.

First we will declare a naoNuo method, the idea of this method is:

- We want a value not to be null, if it is, it will get the error we passed to it and, instantiate an ErroValidacao object
with the "erro" we passed as argument, and return that instance with both the erro as well as the value

### Tests

We are going to build the tests along side with the class

1 - Must return null then the text is non null test
2 - Send a null text as the first parameter, and expect erro.codigo to be that error message
  - We are treating this error message as `codigo` because most of the times, we will instantiate that object by passing
  those attributes as it was a code or something that indicates what kind of error was generated

  ## Lesson 4 - Validador #02

More validation errors and tests

#### Jest Tip

If an object can null, test the object and not the object.attribute, because if we expect the attribute to be null, the
test won't succeed since it will be undefined.

  ## Lesson 5 - Id

We will create a `Usuario` that will have an id, name, email, senha, but what is common.

The value objects that are common from the previous exercise to this one, we will copy it to this project, such as Id vo

The only difference will be that instead of directly throwing an Error it will call the custom object error method 'lancar'

Copy the tests

## Lesson 6 - Nome Pessoa

Similar to previous lesson

## Lesson 7 - Entidade

Simple recap:

. Create an interface `EntidadeProps` with the props an Entidade needs
. Create an abstract Entidade class, which defines a generic, saying that first we need the Tipo, which is used by the
child classes to inform their type (e.g. `Usuario`) and the Props, which will extend the `EntidadeProps`\
. Initialize the id: Id and the props received in the constructor, remembering that we need to ensure that inside the
props we have the id for the clones.

## Lesson 8 - Usuario #01

Reminder of how we are supposed to define a object value

We need to, in the properties, say that we are expecting a string, and then, inside the class constructor, retrieve
that name passed as props and instantiate that value object with that property.

## Lesson 9 - E-mail

In the previous exercise, `Pessoa` had an email, and its validations was done inside the `Validador` class. However, in
this project we will only make the `Validador` class to have "generic" validations, such as empty check, null check,
length check, and so on.

Since the email validation is very specific, we will create a new email value object, and leave it to him to make
those validations. In the same way that `NomePessoa` and `Cpf` work.

## Lesson 10 - SenhaForte

SenhaForte vo will consist of a REGEX to check a senha validity if it is a strong password and create its tests.

## Lesson 11 - Usuario #02

The next natural step is to define the property senha as in the `Usuario` object, using the `SenhaForte` value object that
we created.

However, the following questions may arise regarding the entity's design: 

1 **Does it make sense for us to store the `SenhaForte` (the raw and validated password) directly inside the User?

2. **What is the best way to persist password information in the context of the `Usuario` object?**

### The Role of `senha` in `Usuario`

• Optionality: The senha property is defined as optional in Usuario. This is important because, in some flows, we may want
to create a Usuario instance (e.g., in a social login scenario, or an initially inactive/pending
account) that does not yet have a password define

• Utility: The password is fundamental in flows like registration and login. For registration, SenhaForte ensures the provided
password meets our security criteria before the user is created. For login, we need the stored password information to
compare it against the password provided by the user.

### The Persistence Question

The most important decision is: Should we store the "raw" password (even if it's validated by SenhaForte) or an **encrypted/hashed
version of that password?**

The **standard and mandatory** security practice is **to never store the password in "raw" format in the database.**

• **Impact on the Model**: Storing the password securely (as a hash) will impact our domain model.

• **Proposed Solution**: Instead of using `SenhaForte` as the persisted property in the Usuario entity, we will use another
Value Object: such as `SenhaHash`. This new Value Object will be responsible for storing the encrypted version of the
password, ensuring the `Usuario` entity maintains responsibility for security information without compromising data integrity.

### The Value of `SenhaForte`

**Was it unnecessarily created?** No. `SenhaForte` was not created unnecessarily.

**Where to Use It?** `SenhaForte` will have its main role in use case flows, such as `RegistrarUsuario`. It is in this
flow that the Value Object will be used to **receive** and **validate** the user's input, ensuring the provided password
is strong enough before it is converted into a `SenhaHas` and persisted.

**Conclusion**: We have created a Value Object that is capable of storing and validating a strong password. It will be used
in the **application layer** and not directly in the `Usuario` Entity for persistence.

## Lesson 12 - SenhaHash

With this being said, we need to store the user not with the raw/clean password, but we do not want to store a password
like the user passed in, we want to store it through a hash.

Therefore, when we log in, we use the registered password, generate a hash, (different from the one generated in the time
of the register) and check if the hashes came from the same origin.

For this, let's say we generated a hash by informing a strong password and pass that password in 12 rounds of hashing.

We then create an attribute `REGEX` that will have a regex to validate whether a hash is valid or not.

Once we have the regex, we create a static method `isValida` where the parameter is going to be the hash and it returns a
boolean. the function body will simply call the REGEX attribute and test with the hash being passed.

And the constructor will simply receive the value, check if is empty/valid and if not, it will simply pass the construction.


So, this value object does:

1. Storing: It stores the hash value provided in `valor`
2. Validation: it has a regex attribute, and both the `isValida` and the constructor make use of this hash to validate if
the string sent is already in the expected hash format
3. Throwing error: If `valor` is null or not correspond to the expected hash format, it throws an error



## Lesson 13 - UsuarioBuilder

We start the lesson by changing the senha attribute type from `SenhaForte` to `SenhaHash

For the UsuarioBuilder is going to be pretty similar to the previous exercise, only the password that will receive some
options on the creation

## Lesson 14 - Usuario Tests

Lesson focused on creating tests for the user

## Lesson 15 - Duracao

Duration will be a value object that will store the classes duration
 
That value object will store the classes duration in seconds

This will enable us to sum two durations, sum every lesson of a chapter, or the course itself, and so on.

Create three readonly attributes, specifying how many seconds there are in a minute, and hour,

and define methods related to the duration and also to format for the UI

## Lesson 16 - Duracao Tests

Implement the tests for this value object

## Lesson 17 - NomeSimples VO

We won´t reuse the NomePessoa value object for the names of the courses, chapter, classes, we will crate a new VO for it.
Its validations are going to consist basically verification about its length

## Lesson 18 - Validador Teste

Since we modified the tests by checking if it could be greater or equal, or smaller or equal, we will need to rethink of
some tests

## Lesson 19 - NomeSimples Teste

NomeSimples tests

## Lesson 20 - Url Value Object

Even though we already have a URL inside JS that could be utilized as a value object, one of the advantages of implementing
our own is the ease of placing new rich behaviors according to our necessities and not necessarily get stuck to an object
of the language itself.

In most methods we will work together with the JS's URL method.

By implementing our own URL, and defining inside the constructor that the attribute url will be equal to a new js URL object.
This way, we have an instantiated URL and we are able to, eventually create some rich behaviors where won't have to worry
with the implementation, for example:

We can create getters to retrieve what Js's URL return, such as protocol, hostname, path, and so on.

## Lesson 20 - Url tests

Url tests

## Lesson 21 - Ordem

This vo will be used both for sorting  the lessons of a chapter and the chapters inside a lesson

When we are to create a static method, sometimes inside the object, it some times make sense to create a domain service to
implement certain functionalities.

However, in this code we already violated this rule in some scenarios, like the case where we validate an e-mail. However
it doesn't make sense to create a service domain only for this validation when we can create a static method inside Email
to do it. 

And in the Order class we are going to violate it again, but here is to help us on the sorting of a given array

`static ordenar(a: { ordem: Ordem }, b: {ordem: Ordem})` this way of defining the parameters, we define that the a object
will have a property ordem of type Ordem, it can also have another attributes, it doesn't matter, AS LONG as it has the
ordem attribute, and this will also help in the auto complete, what don't happen in any types as long as we cast them

We could create a service domain to make this sorting, but this fall on the case where it is a simple single task which
has to do with this class

## Lesson 22 - Ordem tests

Lesson will be focused on creating tests for the new vo




















### Does the `Entidade` parent ensures that its children have their properties as attribute?

1. The role of the interface (UsuarioProps)

  The interface `UsuarioProps` defines the data structure expected to be passed to the class constructor

  ```ts
  export interface UsuarioProps extends EntidadeProps {
      nome?: string;
      email?: string;
      senha?: string;
  }
  ```

  This is basically saying that by instantiating a `Usuario`, the object must (at least) contain these attributes

2.  Extension and the constructor

  The class `Usuario` extends `Entidade<Usuario, UsuarioProps>`. `UsuarioProps` passed as second generic parameter (`Props`)
  ensures that the constructor(props: UsuarioProps) from the class `Usuario` and the base class `Entidade` (that receives
  `Props`) are working with the format

  `constructor(props: UsuarioProps) { // <- Here the `Usuario` class expects the "type"`

3. Important detail: Value object's immutability

  Although `UsuarioProps` defines the attributes, the class `Usuario` does not use these attributes (`nome`, `email`,
  `senha`as `string`s) directly. Instead, it **certifies** them and store them as Value Objects
  ```ts
  readonly nome: NomePessoa;
  readonly email: Email;  
  readonly senha: SenhaForte;

  // ...
  this.nome = new NomePessoa(props.nome);
  this.email = new Email(props.email);
  this.senha = new SenhaForte(props.senha); 
  ```

  This is a common practice in DDD. the `Usuario` class ensures that

  . The raw data (strings) are received according to the `UsuarioProps` interface
  . The class contains the final attributes (nome, email, senha) but in the form of **value objects**, that encapsulate
  the validation logic and ensure data integrity (for example, `NomePessoa` should guarantee that `nome` is not empty,
  `email` can verify the format, and `senhaForte` enforce complexity rules)

  Therefore, a `Usuario` class is certifying that will be we initialized with the defined attributes in `UsuarioProps`,
  and its instance attributes will conceptually correspond to them, but in a more robust format ('Value Objects')