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






