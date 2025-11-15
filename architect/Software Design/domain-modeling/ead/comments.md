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

## Lesson 23 - Aula

We are going to begin working with Aggregates. An aggregate is when we combine multiple elements inside our model to persist
them in a single manner.

We won't work with persistence, but it will make clear the relationship there will exist between `course`, `chapter` and 
`lesson`.

In this case, the aggregate root is the Course. When we persist a Course, we also persist its chapters and their lessons
as part of the same aggregate. Whether this is stored in separate tables, a single table, or a NoSQL document is a
persistence-modeling decision, not a domain decision.

The folder we will create inside src is the name of the aggregate root, so we start on curso/Aula.ts

In the super call inside the constructor, we pass an object with all the properties, and modify only the ordem to be equal
to props.ordem or 1. The reason for it, is to ensure that ordem is initialized with a value.

## Lesson 24 - Nome de Aula Builder / Gerador Nome de Aula / Test

We will start by creating an array with multiple classes names and return the names after this array.

The AulaBuilder will be similar to the UsuarioBuilder, with the difference that it will contain a static method to create
a list of lessons, it will work like this:

1. It receives how many lessons we wish to create via the parameter `qtde`
2. Creates a local function `aula(i: number)`, this function will:
  1. Call `AulaBuilder.criar()`, which creates a builder with random values (nome, duracao, videoUrl, ...)
  2. Calls .comOrdem(i+1), which defines the ordem as i + 1
  3. calls `.agora()` which builds and returns a final instance of `Aula`
3. Uses `Array.from({ length: qtde })` to create an empty array of the desired length
  . Example: `Array.from({ length: 3 }) -> [`undefined`,`undefined`,`undefined` ]
4. It makes over that array and creates one lesson per position
  ```ts
    // criarListaCom(3)
    [
      Aula(ordem = 1, ...)
      Aula(ordem = 2, ...)
      Aula(ordem = 3, ...)
    ]
5. As a summary: each lesson is build using the builder, the order i s sequential starting at 1, the total number of lessons
is defined by the method argument.

## Lesson 25 - Capítulo #01

This work involved creating the `Capitulo` entity and its related structures. This entity represents a chapter within a
course and contains a collection of `Aula` entities.

It will have a nome, a ordem, and the lessons representing the lessons of this chapter

The Capitulo entity extends an `Entidade` by passing in the generic.

### Attributes

readonly nome: NomeSimples: Ensures the name adheres to length constraints (3 to 50 characters).
readonly ordem: Ordem: Manages the chapter's sequential order.

### Lesson Aggregation:

readonly aulas: Aula[]: Stores the lessons.

In the constructor, it maps the incoming AulaProps[] array to an array of Aula instances (props.aulas.map((a) => new Aula(a))),
ensuring each lesson object is properly instantiated and validated.

## Lesson 26 - CapituloBuilder

CapituloBuilder will be very similar to the other builders, with the only difference that we are going to create a NomesCapitulo
class to store possible names for that builder. And since we are now working with aggregates and every `Capitulo` has its
`Lesson`.

Therefore, in the `lessons` attribute of the `CapituloBuilder` it will also invoke the other builder to it

## Lesson 27 - Capitulo Tests

Create tests for the current implemented methods.

## Lesson 28 - Capítulo #02

In this lesson we will implement the duracao method, where we will sum all the lessons duration and return it.

For it, we reduce over the aulas attribute, and their duracao attribute. Our accumulator `duracaoTotal`, will be of type
Duracao and this mean that it have to return a new instance of `Duracao` and it needs to receive a duracao in seconds
in its parameters.

Also create getters for quantity of lessons, the first/last lesson, and so on.

Although, there are some other methods we are going to need to work with.

One of them addresses the correct ordering of its data. Because for example

• If we pass the data in a reversed order, such as a lesson with ordem 1, then another lesson with ordem 1, and so on.
  . Are we going to maintain the order 1 for every lesson of a chapter?
• By the time we have the rich behavior, and we pass inconsistent data, such as ordem 1 for every lesson, it is important
that we create this order and put the correct data inside the object. 

## Lesson 28 - Capítulo - Ordenação

In this lesson we will continue to implement the method that corrects the sorting of the lessons.
We will create this method to run automatically, meaning that we won't need a separate method to explicitly trigger the 
ordering.

We are also going to create another behavior for rearranging.

The reason for two different behaviors is because the rearranging will be used both now and other behaviors.
It will receive the current order, and simply assign the new orders, 

• `reatribuirOrdens`: This function will basically get each item on the aulas array and incrementally assign the ordem
value of the `Aula`, in creation order. This will be used in case we move a lesson X to the third position, and want it
to be reordered to the initial position.

. ordenarAulas: This function will receive the aula with the AulasProps type and not the method itself, why?
  . Because we want to order right away, when we receive its properties, and before instantiating the object, we want the
  aulas array to already be arranged.
  . This means that if we pass the properties disordered, we will already store inside the `Capitulo` they previously ordered
  . The method will need to be static because at the time we call the method, the object isn't created yet, meaning that
  no instance member can be accessed.
  
  . Method explanation:
    - We receive in the parameter aulasProps equal to AulaProps[], map over that aulasProps, and for each `AulaProps` we
    instantiate a new `Aula` by cloning the current `Aula` with the `ordem` based on the index.
    - We create a constant aulasOrdenadas and assign to it the aulas.sort(Ordem.ordenar), where Ordem.ordenar is a method
    that creates the ordering based on the current ordem, see if it is equal, and if yes, it reorders it
    - In the return those `aulasOrdenadas` are passed as parameter for the `reatribuirOrdens` method, map over the ordered
    aulas and convert them back to the properties to satisfy the return


We now instead of passing the entire props for the constructor, we spread the props, and for the `aulas` it will receive
`Capitulo.ordenarAulas(props.aulas)`

## Lesson 29 - Capitulo Tests #02

First, in this lesson, we are going to implement tests for new methods, such as the ordering ones, and the ones to retrieve
the first and last lesson.

## Lesson 30 - Adicionar Aula

We'll start this lesson by creating a new method inside `Capitulo` to add a new class

Inside the aula class we will add the possibility of adding a new `Aula` to this object.

The adicionarAula method will receive the `Aula` itself, and the position it will be placed in.

### adicionarAula implementation

• create a constant novasAulas that will be equal to
  . is the posicao defined? no, define it in the end of the aulas.array, if yes, it will separate the aulas array in two
  and we will return an object with:
    1. 1 will be the aulas spread from the position 0, until the posicao (which is not included)
    2. the aula itself
    3. Will start from the position, which is 1 index over the  expected index, until the end

• Create a `aulas` constant and assign to it the result of rearranging the lessons with the new array, and map over it and

• Finally, return clone with the aulas constant

## Lesson 31 - Remover Aula

This method basically filters the aulas array and return every item except the selected one

So the return will rearrange this new array and will return the cloning of these entities

## Lesson 32/33 - Mover Aula

For this method, we will simply remove an `Aula` and insert it back on the given location.

## Lesson 34 - Mover uma posiçao

Now that we have the possibility of moving a lesson to a specified place, we will create two methods so that we can move
the lesson according do their position in the chapter.

The position is defined essentially by the order we defined — which will impact the index of how the lesson is organized
inside `aulas` array inside a chapter

### Methods implementation

• moverAulaParaCima: 
  - Utilize findIndex and `igual` method to find the `posicao`
  - If its the first one, assign to a const `primeira`
  - If `primeira` simply return, otherwise, utilize moverAula to move to the desired position

• moverAulaParaBaixo:
  - Utilize findIndex and `igual` method to find the `posicao`
  - If it is the last position in the array, assign to a constant ultima
  - If ultima, simply return, otherwise, utilize moverAula to move to the desired position

## Lesson 35 - Aggregate

When modeling a course, we may have a list of courses, that have a list of chapters, and they have a list of lessons, and
we imagine that we will send to the database the complete structure. However, at the moment of querying some `Curso`, there
may have two ways of doing that

1 - Query only the course with nothing, no chapters or lessons, only the Curso itself with its information
2 - Query a course with its chapters and lessons.

This means there isn't supposed to exist one situation where we query a course's chapter but don't fetch their lessons.
The modeling also doesn't allow chapter to fetch one without its lesson.

Or we bring a chapter with its lessons, or only a course without chapters and lessons.

Because imagine a scenario where we have 20 courses, and we would like only to show the courses without having to "enter"
inside of it because the quantity of data it could bring with it, may be to big.

Therefore, at the persistence time, we only have the option of persisting all at once, because a course may be consulted
dozens of times more than it will ever need to be saved. So we save when we are registering for the first time and after
that, thousands of people are going to access that course with the same structure, with the difference that some times we
want to show the course directly and other times, we want to bring the course with its chapters/lessons.

Given this, when persisting a course, we need to consider these scenarios

. Does it make sense for a course, other than having an id, name, details, etc. To have its duration calculated?
  - We are able to calculate the duration after the chapters and the lessons.
  - We could have the duration, if we fetched the complete course. 
. But what if we want to obtain the duration without the need of having the structure loaded? 
  - Does'nt it make sense for when we save a course, to replicate this information so we can have its duration without the
  need of loading the whole structure? 
  - It could be positive, since the duration of a course is something important, something that will eventually want to
  show, such as a "course card", where it could have a badge containing its duration
. If we would like to showcase all the courses inside cards containing `name`, `duration`, `quantity of lessons`, `registration
button`, etc. If we don't have the duration previously calculated, or the other information to build the card. So we are
able to do this. we are required to bring every chapter/lessons and it would bring with it a heavier load than we desire.

. This is why when consulting a course we should have both options: To create a valid course without the chapters and to
create a valid course with the loaded chapters, since both scenarios are considered in the application.

## Lesson 36 - Curso

The course is responsible for aggregating and calculating metrics from its chapters, it will initially have two private 
static methods  to ensure data consistency on its instantiation.

1. `calcularNumerosDoCurso(props: CursoProps)`: This method will be responsible for calculating the total duration and the
total number of lessons of the entire course by iterating over the provided chapter properties
  . This method has the two logic implementations
   - 1. Simplified / pre-calculated mode if !props.capitulos is true. This method checks if the `capitulos` are not provided
   (the array is null or undefined), the method assumes the values passed directly in the props are the correct, pre-calculated
   totals. It immediately returns an object containing the duration and classesQuantity from the props, an defaulting them
   to 0 in case they are missing. This allows the creation of a summarized course record
   - 2: If chapters are provided, it will resume its execution



2. `ordenarCapitulos(capituloProps: CapituloProps[])`: This ensures that the chapters are stored in the correct order. It
first sorts the chapters using the Ordem value object, and then reassign the order, similar to the `Chapter` function.

### Constructor

The constructor initiates the class's properties

• Calls super() with modified properties, where `calcularNumerosDoCurso` is used to inject the calculated duration and
lesson count, and `ordenarCapitulos` will be used to sort the chapters
• The other properties are assigned to their respective value object. And attributes are instances, we map over it and
return a new instance of that prop









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

  ### Why do we map over each lesson and returning `a.props`?

• It has to do with two important principles in OOP and functional programming. Immutability and Data representation

1. Role of Capitulo.reatribuirOrdens()

First, let's look at the method you provided:

```ts
private static reatribuirOrdens(aulas: Aula[]): Aula[] {
  return aulas.map((aula, i) => aula.clone({ ordem: i + 1 }));
}
```
This method, is designed to enforce immutability:

• **Iteration and Transformation**:  (`.map()`): It uses .map() to create a new array without modifying the original `aulas` array.

• **Creation of New Instances**: (`.clone()`): The use of aula.clone({ ordem: i + 1 }) suggests that the Aula (Lesson) object is an immutable Value Object. Instead of changing the ordem (order) property on the existing instance (which would be a mutation), it creates an entirely new Aula instance with the updated order (i + 1) while keeping all other properties the same.
