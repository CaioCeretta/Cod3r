## Lesson 1 - Anemic User #01

We will start by creating a src/core folder and a test/core to maintain a "mirror" of the src structure inside the tests.
This will easy to test each one of one of our tests. Even though some examples may not have much to test, we will create
tests to expose fragilities of our choices when we are, for example, going after an anemic model.

We are going to create multiple versions of an anemic class, so we can see how it may evolve

### UsuarioAnemicoV1

Is very common for us to find inside libraries/frameworks documentation, an anemic modeling. Not because this is an adequate
pattern, but simply because who is writing that tutorial, has the objective of showing something else other than a rich
modeling for the examples.

We will start by defining a simple interface, with primitive types, and the only validation this code has is the types
requirements. 

And when we focus on the domain modeling, and looking after the problem we are solving, we will understand that every company
has a domain of action, clients, market, business, way of proceeding inside that business, and this is the domain, so when
we model the domain, we want to be specific and not generalist, we don't want a name attribute to simply be a string, it
should have some criteria inside the business we are working with, for more common or similar to other cases, that these
objects may be. It is certain that there will exist specific rules for that business. So when we think of creating a modeling,
we think of solving a **specific** problem of a **specific** business.

Even though in practice we don't test interfaces, here we are going to, because that mentality of testing everything is
fundamental, it is important to have inside the domain model, to have this testing culture.

With these tests we have two intentions: Other than the importance of the testing culture, they will be created in order
to expose the fragilities, after the tests, that this anemic modeling may generate.

### UsuarioAnemicoV1

After that interface was created, we will create a test for this interface

Create a `usuario` object, with all the required values.

We will first notice that even though we didn't implement any validation, that ts will give us basic errors that the
type returns, such as id not being a number, a nome being a number, and so on.

## Lesson 2 - Testing Usuario Anemico V1

We will define a usuarioValido constant with all the required properties from its interface

1. First test, will be to create a usuario by spreading all the properties from the usuarioValido, but modifying its name
to be '', and after expecting usuario.nome to be an empty string, we are able to see that this model allowed an empty `nome``

2. Second test is going to be similar to the first one, but changing the id to be negative

3. Invalid e-mail — without `at`, domain, username

4. Senha to be a single character where the business we are dealing with  requires a strong eight characters long password


Therefore, these tests were able to show in how much trouble we can get by choosing this approach. By modeling in a "poor",
"anemic" manner, with no kind of guarantee of data consistency, this means that we will have to do this in every part of
the system where a `Usuario` is used. This will make the usuario to inconsistent, and everywhere we will have to validate it
and apply the rules.

Instead of this, we could do everything in a single place what we would end up having to do in multiple different places.

With the first version, we already exposed many flaws of this model.

## Lesson 3 - Anemic User #02

The UsuarioAnemicoV2 will be a class and in its tests we are able to see that we even after creating a valid user, we are
still able to modify the attributes with invalid values such as `usuario.id = -300`.

We can also "workaround" the interface, because let's assume this scenario

We want to allow an user with undefined name. But the way we defined our interface, with required attributes, we don't
allow a value to be assigned to undefined. However, by some reason, we want to put undefined and do something like:
`usuario.nome = undefined as any`, it will work and the test will also pass — We were able to hack because type casting
is basically us saying to typescript that we know better than him, in most cases is for the best, but with no correct
validation, this is something that could end up happening

## Lesson 4 - Anemic User #03

The scenario that will address in this lesson, is a common scenario to many developers

We first start by modifying the version 2, where every attribute was public, to private

Create getters and setters for each private attribute. For this first test, we are not going to utilize the modern syntax
of js, like defining an attribute with underline and the get method is simply get nome() {return this._nome}, this example
will be "old-fashioned"

### Tests
We will notice that when modifying from the V2 to the V3, we will notice that several errors will now appear, since the
attributes are no longer public, but private, and their updates happen "within" the class. So we now longer can, for example
, simply utilize `usuario.nome = ""`

And we also will need to utilize the getters to access the attribute value for the expect

We can notice that nothing changed on the validation, the syntax has changed, but it continues to be an anemic modeling.
We have only changed public attributes for getters and setters method.
 
## Lesson 5 - Validate Password

We start by applying password rules to UsuarioAnemicoV3.

Inside setSenha, add a check to ensure the password length is greater than 6 (this will make the existing test fail).

**Tests should always be as explicit as possible.** 

Some scenarios, like invalid passwords, could also have other issues happening at the same time, such as name, email, or
other rule violations. If we throw an exception at the first error, the flow keeps breaking one step at a time as the user
fixes each issue. 

What bothers the instructor most is having implicit behavior, something happening that isn’t clear to whoever reads or
uses the code.

For example, if we call setSenha inside the constructor after receiving parameters, and that setter already validates the
password length, creating an object with an invalid password will immediately trigger validation — even though the field
is optional.

There are also cases where validations depend on more than one attribute. Say every Gmail user must have an empty password
because they log in with Google, while other emails require a password. If we place this kind of logic inside the setter,
it becomes too complex, since we might still be setting other properties when the validation triggers.

## Lesson 6 - Validate E-mail

1. Creating the Validation Utility

Create a utils folder and define a file to test whether an email is valid or not

2. The Setter Problem: Implicit behavior and degraded clarity

We could change the set email logic to apply this validity check. For example:

  ```ts
    setEmail(email: string) {
      if(Validador.isEmailValido(email)) {
        this.email = email
      }
    }
  ```

While this appears to enforce validity, this approach introduces an **implicit behavior** that can degrade the code's
clarity. A consumer of this classes expects that calling setEmail(value) will result in the email being set to `value`.
However, because of the internal conditional check, the email might remain unchanged if the input is invalid.

This creates a lack of **transparency** since there is no explicit indication that the method may not actually alter the
state if the value is invalid. An action is expected to occur, but an internal implicit logic decision, dictates otherwise.

3. The constructor logic hole

The problem happens by how the setter interacts with the **constructor**. Consider the following scenario:

1. The class is instantiated with `new Usuario(userObjectWithInvalidEmail)`

2. constructor receives a simple string in the email attribute

3. the constructor attempts to call the setter within the constructor

• However, since the setter uses an implicit check, an instance could still be created where the email property is never
successfully set, potentially leaving it an uninitialized or undesired state if the constructor implementation first sets a
default/initial value AND THEN calls the setter. This generates the possibility of a user object starting with an invalid
email or an empty email property

### Conclusion

So in the end of the third version, it is getting a better validation, it does not allow us to go to an inconsistent state,
but we still have an implicit behavior, there is no "clarity" that this method won't actually be altered in case the value
is invalid.

And we must acknowledge that we still have incomplete protection and an implicit behavior, which will be used in future
lessons.

## Lesson 6 - Anemic User #04

We will start by adding a _  before private attributes


### Erros constant

We defined a constant "Erros" equal to:

  ```ts
  const Erros = {
      SENHA_INVALIDA: "SENHA_INVALIDA"
  } as const;
  ```

  `as const` "freezes" the value, it transforms an object (or array) in a literal immutable type, so in this case

  Without as const the typescript infers the type as SENHA_INVALIDA: string, which means that it is a generic string type
  e not the "SENHA_INVALIDA" literal itself

  With as const the type of SENHA_INVALIDA HAVE TO be "SENHA_INVALIDA" 


  
  And now, when throwing an error, we can simply throw Erros.SENHA_INVALIDA and the error will be thrown with that content

## Lesson 7 - Entities and Objects of Value

### What is entity?

The most critical feature of an Entity is its unique identity (or ID).

The identity is what makes the object distinct and is the primary basis for its equality. Two entities are considered the
same if they have the same identity, even if their attributes (like name or address) change.

The identity remains constant throughout the Entity's lifecycle.

### Continuity through lifecycle

An Entity is an object that has continuity through time, meaning it persists and can change state while still being the
same conceptual object.

Entities are typically mutable; their attributes and state can change, but the core object and its identity endure.

Example: Inside an `EAD` platform we may have multiple courses, which each one of them has its own id. Eventually, we may
change the course name, every chapter/lessons — suppose we have a 2015 version and we will update its classes to a new
updated version — but since the ID remains the same. It continues to be the same course

### Importance to the User
Entities represent things in the domain that users and business experts care about tracking individually.

The distinction of identity is important to the application's user. If the user needs to know if "this object X is the
same as the object X I saw yesterday," then it's an Entity.

### What is represents:

An Entity represents a thing that can be tracked and differentiated over time, while a Value Object represents a descriptive
quality of a thing where you only care about what it is, not which specific instance it is.

## Lesson 8 - Class `Pessoa`

We will start by continuing in the last step of the anemic class lessons by creating a class `Pessoa` and this class will
be focused on being a consistent object, that adheres to all the rules and validates them.

## Lesson 9 - Entity & Value Object

### Value Objects

Following the line of Eric Evans, a **Value Object** is defined by:

"An object that represents a descriptive aspect of the domain with no **conceptual identity**. Value  objects are instantiated
to represent design elements that we care about only for what they are, and not for which one they are.

#### Core Characteristics of a Value Object

1. Defined by attribute (Value) the value object is fundamentally defined by the **value or combination of values** it holds.

  • Structural Equality: Two Value Objects are considered equal if all of their attributes are the same, regardless of whether
  they are different object instances in memory
  • Example: Two instances of a `Money` VO are equal if both represent '$100.000'. It doesn't matter which instance it is,
  only what it represents

2. Immutability: A VO must be immutable:

  • Once the object is created, its state cannot be changed
  • If we need to "change" an attribute, such as increasing that amount, we must not alter the existing object, we create
  a new instance of the VO to replace it. This simplifies logic and concurrency management.

3. Focus on Expressiveness and Validation: They upgrade primitive types like strings, or numbers into domain concepts

  • Value objects encapsulate domain logic and ensure the value is always valid. For example, an email address can guarantee
  the format is correct upon creation


### Relationship with Entities

VO serve to describe, measure, or quantify Entities. They are "adjectives" of our model, we may think of this relationship
as:

**Value Object**:

Focus: The **What** it is
Mutability: Immutable (Replaced, never modified)
Relationship: An **attribute** of the Entity.
Use Example: `Address` of a `Customer`

**Entity**:

Focus: The **Which** one is it
Mutability: Mutable, an have its state changed
Relationship: The target of the reference
Use Example: The customer itself

### The Role in Domain Modeling (DDD)

The correct use of **Entities** and **Value Objects** are the essential building blocks for **Domain Modeling** in DDD.
They are the means by which you create a system of objects that closely reflects the **mental model** and **business rules**
of a specific domain.

##### 1. Expressiveness and Ubiquitous Language

**Understanding the Business**: By deciding whether a concept is an Entity or a Value Object, the development team is
formalizing an understanding of the domain in collaboration with Domain Experts.

**Code as Documentation**: Using VOs like TimeRange instead of a primitive DateTime start and DateTime end makes the code
more expressive and aligned with the Ubiquitous Language of the business.

##### 2. Robustness and Model Integrity

###### Value Objects ensure that descriptive concepts (Address, Money, CPF) are always valid and consistent.

Invariants: They encapsulate domain invariants (rules that must always be true). For example, the logic that a monetary
value cannot be negative is enforced within the Money VO.

Safety: Immutability prevents their values from being unexpectedly changed, making operations safer and more predictable.

###### 2.2 Supporting Identity Integrity (Entities)
Entities provide the structure for Aggregates, which are treated as a single transactional unit to protect all business
rules related to that identity and its VOs.

In summary, in DDD:

Domain Experts determine if a concept has identity (Entity) or is purely descriptive (Value Object).

Entities form the core of the model, handling behavior and lifecycle.

Value Objects are the support, describing the Entity and guaranteeing the validity of its crucial attributes.

## Lesson 10 - Validador

This lesson will focus on creating more examples/tests for the `Validador` class.



Although many time overshadowed by the thinking behind the entities — We put too many things on the entities that could be
distributed in value objects. The objects of value are a ddd's vital block of construction. Not only to DDD but to domain
modeling as a whole.
Examples of value objects are commonly modeled as values such as numbers like (e.g. 3, 10  291,51), text strings (e.g.
"Hello, world", "Domain-Driven Design") dates and times...

Assume i have a R$50,00 bill and you also have a R$50,00 bill. If we exchange one bill for the other, it won't have any kind
of harm, because its value its what compounds its entity. Even though they may have a serial number, for us who are using
the **value** of it, it don´t matter.

Another example is a **CPF**: it has a unique number which is  the value that interest us, we don't care about the ID.
Another example could be an e-mail. It also has lots of rules, like the CPF, and even though it is a unique element with
a large set of rules, what matter to us is only the address. We don't want to use this e-mail as an entity, nor to have an
ID/value to it, we only need the email address.

** Transformative / Game-changing concept

We must make an effort to model using "Value Objects", whenever possible, we should use it instead of entities. Even when
a domain concept needs to be modeled as an Entity, the entity's project should favor using a value container, in place
of a container of child entities.

This is, the idea is that inside our entities, we have multiple objects of value instead of having other entities inside
of it. Value types that measure, describe or quantify things are easier to create, test, utilize, optimize and maintain.

### Problem: 

Let's assume that we have three different classes: Employee, Client and Outsourced, and each of them, share similar attributes
like `id: string, nome:string` and assume we have a rule for the Employee and for the Outsourced that are equal and the
client can have a simpler rule.
  - We won't insert duplicated rules inside the classes. We could create an inheritance and put the rule inside the parent
  class. But multiple times the rules are not exactly the same and the composition is more interesting than the inheritance.

### Solution: 

We can solve that problem using objects of value, we can create an object that will encapsulate every name rule that will
be used in any different class.
The name and id attributes mean absolutely nothing of how a name must behave or how an id must behave. Grabbing a more
generic scenario, to see how it would be without the VO, would be:

```ts
  class Pessoa {
    constructor (
      readonly id: string,
      readonly nome: string,
    ){}
  }
```

Now, with VO, instead of having the primitive type `string`, we can

```ts
  class Pessoa {
    constructor (
      readonly id: Id,
      readonly nome: NomePessoa,
    ){}
  }
```

Inside the types NomePessoa and Id, we encapsulate all the complexity and rules related to these attributes.
This makes our code more expressive and easier to put the right behavior at the right place.

This replacement that may look simple, at the end it will bring not only a richer model, but also the fact that we will
be able to ensure that one time the name is instantiated, that name is valid. And this question of data consistency is
extremely important — If we have an object named id, that object ID is able to ensure that the ID is valid and consistent.


## Lesson 11 - `NomePessoa` VO

We will start by creating a value object `NomePessoa`, the reason for it to be NomePessoa and not simply Nome, is because
a Nome can be of multiple things: a course name, a car name, and each one have its own set of rules. It would'nt make
sense to generalize the Nome, add something based on its surname and use the same value object on a car.
 
Therefore, it must be also specific. Making it specific also increases the chances of thinking the right way is much
greater than the chances of thinking in a very generic manner, and end up trying to load  too many responsibilities inside
something that we can't clearly define its purpose.

Thinking about the NomePessoa, we must first ensure that the name adheres the person name rules and to the possibility
of adding some behaviors to this class.

### Validations

We know that the class `Validador` consist of many errors we can use to check on every value object, be null checks, undefined
checks, empty checks, and more. Consequently, we know we are going to have many validations and possible errors. So we
are going to create a behavior that will combine every validation and give us back not only one error string, but an
array with all the errors string inside a validation.

## Lesson 12 - Combine Validations

The `combinar` method inside the `Validador` class, will filter every error that are not errors — that are empty, and in
the end if the resulting array is not empty, it returns the array, otherwise, returns null.

## Lesson 13 - Empty `NomePessoa``

We can start by, on the constructor of the VO, to check whether the name is empty or not, and can also combine every error
check we want in a single function

## Lesson 14 - `Nome Pessoa`` Tests

Tests to validate valid and invalid names.

Up to now, we are already experimenting how it would be an app modeling, even if we are creating only basic examples, but
here we notice that we don't need to start a new application with the DB, or the UI with the desired framework. We can
start by creating the domain model, understanding the scenarios, the actors, the use cases, and we are able to implement
a big part of the app only using the programming language. Leaving all these decisions aside, and leaving it for later, 
will make us able to ensure that our business logic is completely uncoupled from technologies because we started by the
heart of the app.

## Lesson 15 - Testes `NomePessoa`

We start by creating new errors values inside the errors file and creating tests for these possible errors.

**TIP**: We can organize by alphabetical order by using the "Sort Lines" extension

## Lesson 15 - Validation with the `NomePessoa` #01

Lesson dedicated to fix test errors

## Lesson 16 - Validation with the `NomePessoa` #02

Lesson dedicated to fix test errors

## Lesson 17 - `NomePessoa` methods

We can enrich the ov by creating different methods on that type that will return different results, such as methods to
return the complete name, or only the surnames, only the last surname, and so on. And to it, we make use of JS getter
to make `get completo(){}` will turn completo to be an attribute of `NomePessoa`

## Lesson 18 - `Id` VO

The instructor prefers to create its own IDs rather letting that task for the DB — Since every DB have its own way of
generating its own IDs. And the fact that we are going to transform the ID into a value object and it will have unique
characteristics

For the ID generation, we will use the `uuid` library, even though we are protecting our app from frameworks, some libraries
as this one, is considered harmless, because it won't generate negative impacts nor undesired coupling.

The ID VO, will have a required `valor` and in its constructor it can be optional. But why? It will be a string, but 
in case we don't pass a hardcoded 'valor', it will simply generate a new one using the uuid library. And after that 
generation, we can validate the id after uuid's validate and in case of errors, we will throw an error

It would also be interesting to create a new property `novo` to say if is a new id or an id that was previously generated.
And this can be useful when we are in the process of creating a new object. If that id was sent in the constructor,
this means that is an old object.

Its initial value will be the negation of the valor property, meaning that if an id is passed, it will be false, and if not
it will be true

And now, we can create tests for this VO.

## Lesson 19 - Using the VOs

The instructor likes to create the properties as readonly, and in case we find some use case, we define a function to
update it or even we can create a behavior to clone a behavior other than altering an existing object

We are defining the attributes as value objects like this: On the properties creation we are saying that id is of type
Id, and nome is of type NomePessoa, however, on the constructor, we don't know yet if the id or nome the user passes in
adheres to that Id or NomePessoa, so the constructor receives the primitive inputs (the pure value) that are going to be
used to create the VO's `Id` and `NomePessoa`. Even though the inputs types are strings, only on the constructor body that
we instantiate these properties as `new ValueObject(property)`

We notice that at the moment we start dividing to conquer, and having these value objects being implemented so the entity
becomes leaner, doing what it is really intended to do. We start having the possibility of creating the right validation
in the right place. We don't need to repeat the person's name validation millions of times.

If we go back to the `Usuario` anemic example, and in its interface, replace the name string type for NomePessoa, we will
notice that every benefits of what already was implemented inside another class, and use it inside this other class — in
case everything makes sense.

## Lessons 20, 21, 22, 23  - Creating CPF Value Object

Lessons targeted on creating a cpf value object to validate a given cpf.

## Lesson 24 - Incorporate the CPF VO inside a `Pessoa` 

Now that we created every validation and that all that rich behavior inside that value object, it becomes easy to utilize
it inside the class, ensuring that every rule a CPF has will be followed, because now, everything is **encapsulated** inside
that VO.

We can notice that we have the entity `Pessoa` that have three different value objects, and we notice how it is consistent
and we do not have to worry about specific rules of each attribute.

## Lesson 25 - `Pessoa` props

We notice that we are working with a readonly model, and this is a kind of characteristic that many times is interesting
to work with. However, at some point, we will have to evolve this model, with the need of updating a person's name or
modifying their CPF, or others app such as address, and so on.
Imagine that we want to generate a clone of that `Pessoa` for eventually evolving that `Person` to something new, with
new updated attributes.

For this we will create a clone method, but some issues may arise with this. If w are going to clone a person, we will
need every attribute passed on the constructor.

The strategy picked by the instructor is to create a PessoaProps interface to store the attributes of a person, however,
in the primitive types of the language and not in the VOs.

This interface will have all the properties optional, and by this change, even the tests are going to become more interesting
since we will not fall on errors like trying to create a user with empty name, for example, because we will now have
named parameters after an object.

Basically we created an interface just to define all the attributes of this object using the basic types in a way that if
we eventually need these attributes, we can access them easily. We could even create another attribute `props` which will
be of the type `PessoaProps`, and in the moment we initialize the object, we use `this.props = props`, and we will have
access to the properties with the basic types passed to build our rich model, as well as every version of these basic
types but with objects of value.

Defining the interface, using only the basic types on the params, can also help us, if eventually we have to convert
our value objects into simpler JS objects. In case we would like to persist this data inside a NOSQL database.

In this lesson we grouped every parameter inside one interface, use it on the constructor, and it also makes the conversion
in both ways easier, since we separate the rich object from the basic attributes through an interface, because in any way
we need to declare this not only on the constructor, but also in the clone method

## Lesson 26 - `Pessoa` clone

We want to create a new `Pessoa` instance after the current object, and since we are working with immutable model, we
won't change that object, but we are creating a new instance with altered values.

For cloning, we instantiate a new object, which the properties being spread from the current properties and merging them
with the new values we just received via the clone method parameters. But why are we merging? Because we want to retrieve
everything we already have, and merge it with what was passed as new props.

Let's suppose that when cloning we pass only the nome. This means that the new object will be the same as the current one,
but with a different name. This way we get all the properties without having to replicate each one of them. And that is
why, inside the interface, every param is optional, because when passing that interface to the clone, we only need to
pass certain attributes

We could also do the same thing as above by using the props inside the clone as a Partial<PessoaProps>, however, if any
type is not optional, we may break our rich modeling since we enforce that every attribute is consistent.

An issue that may occur, is during the clone, since when we instantiate a Pessoa, we only used the name and cpf, because
since every parameter is optional, and an inexistent ID is generated in the Id object value, when cloning, the id won't
be cloned, and a new id will be generated.

To solve this and make the clone be capable to get the id, even though no id was informed. We can solve by where we
use `this.props = {...props}` in the constructor, modify it to `{...props, id: this.id.valor }`.

This way we ensure that even if inside the properties we don't receive the Id, we can still put the id generated in the
instance inside the props attribute.

## Lesson 27 - `Entity`

### Purpose of the `Entity` class refactoring

he goal of this lesson is to create a strong, consistent foundation for all entity objects (like Pessoa, Produto, Pedido,
etc.) within the system's model.

1. Centralizing Common Entity Behavior (Inheritance)

An Entity in Domain-Driven Design (DDD) is an object defined by its identity (its ID), which remains constant over time.
Every Entity will necessarily have: 

.An ID (e.g., id: string).

. A set of properties or data it holds (often called props). 

. Common methods, such as a way to clone itself.

Instead of rewriting the ID management, the props storage, and the clone method in every Entity class (like `Pessoa`), we
create the `abstract Entidade` class to centralize these elements.

And the reasoning to choose composition or entity is basically:

### Inheritance vs. Composition in our model

Our current `Pessoa` class is designed primarily using Composition to handle its specific domain attributes. This
demonstrates the recommended practice of favoring composition where possible. The refactoring introduces Inheritance fo
managing common, structural requirements.

### 1. Established Design: Composition ("Has a")
We are already using Composition for the unique attributes of a Pessoa by incorporating Value Objects.

The Relationship: The Pessoa class "has a" `NomePessoa`, an `Id`, and "has a" Cpf.

### 2. The New Step: Introducing Inheritance ("Is an")

That's an excellent clarification! You are absolutely right to point out that the implementation in the Pessoa class, before the refactoring to extend Entidade, already shows Composition. This is a crucial detail for understanding the gradual introduction of concepts.

The core lesson is about using both Inheritance and Composition where they make the most sense, and your current structure highlights this perfectly.

Here is the revised explanation to emphasize that Composition with Value Objects was already established, and the refactoring is the moment where Inheritance is introduced for structural reasons.

⏳ Gradual Introduction: Composition First
Your current Pessoa class is designed primarily using Composition to handle its specific domain attributes. This demonstrates the recommended practice of favoring composition where possible. The refactoring introduces Inheritance for managing common, structural requirements.

1. Established Design: Composition ("Has a")
You were already using Composition for the unique attributes of a Pessoa by incorporating Value Objects.

Rationale: Composition is used because a person is not a name or a CPF; they **have** a name and a CPF. This keeps the
data encapsulated and enforces domain rules within the smaller, focused Value Objects.

2. The New Step: Introducing Inheritance ("Is an")

The need for Inheritance arises when you realize that every domain model entity, not just Pessoa, but also Produto (Product),
Pedido (Order), etc. Must share a fundamental structural identity.

• Relationship: A Pessoa "is an" Entidade.

• Rationale:

  1. Code Reusability: The base Entidade class now centralizes the logic for the ID and the management of props, which
  are common to all entities.

  2. Structural Clarity: It formally defines the fundamental concept that all objects that extend it are considered
  "Entities" in the system, defined by their unique identity.

The refactoring is a move to isolate the two different concepts: Inheritance for shared structure/identity (`Entidade`)
and Composition for unique behavior/attributes (`NomePessoa`, `Cpf)`.

### Tests

When executing the test, we will notice that everything works just fine, with the only difference being that when not
passing the id in the properties, e.g. `const pessoa = new Pessoa({ nome: "Caio Ceretta", cpf: "280.012.389-38" });`, we
notice that the check if the id is going to be the same after the clone will fail, since a new id will be generated. For
this case, when cloning we must pass the current props.id to the object, and as second parameter of the object we must
override the new id that would be created.

### Conclusion

Now we have an `Entity` and that class has an Id and the `Pessoa` will also have the id after the inheritance. Which means
it receives the an id in its creation and we don't need to define it neither inside `PessoaProps` because we inherit from
`EntidadeProps` as well as do not need to have that id inside `Pessoa` because the parent sends it by inheritance.

To conclude the lesson is to define an `igualdade` method inside the `Entidade`, we already have a validity check inside
the Id VO, and we can use the same strategy because the entity equality is associated to the equality of its id, which
is established after the id.

To define this equality we will make use of these comparisons already created in the ID vo

## Lesson 28 - Clone

We will move the cloning logic from the `Pessoa` to the `Entidade`.

First we move the clone from pessoa to entidade, since every class that implements it, will have the ability to be cloned.

• We change the parameter to the generic type `Props`

And the second thing is that we won´t be able to directly instantiate after the generic type, and we will have to do  the
following:

  `return new (this.constructor as any)({ ...this.props, ...novasProps });`

We can use `this.constructor` to call the child's class constructor since it will be used inside a concrete class, and when
we do `this.constructor` it won't call the `Entidade` constructor. Since it calls the constructor of the class being instantiated.
- Therefore, if it is a new `Pessoa` being created, this.constructor refers to the constructor inside its class.

After this change, we run all the tests and it is still working. This shows how important it is to have a "battery of tests¨,
because we changed an implementation, replaced its place, and we can continuously do this.

And since this new clone method, is a generic clone, we must assume that inside the concrete class we are creating, it does
not receive only these parameters, but also other parameters, like a `config?: any`, and we want to send them during the
construction or cloning.

For this, in the clone method, we can add a second parameter with will be a set of any possible arguments and merge them
inside the object creation.

Although the `Entidade` is now more flexible by adding the second parameters `...args`, we are still require to satisfy
the `Props`. But in case we want to pass extra parameters to it, we are able to through the args

### Entity class

We want to create a class `Entidade` and `Pessoa` is an entity, and this is a tip of helping us to choose whether to use
inheritance or composition.

When defining an entity or abstract class, we can start by providing it its id. Inside the entity we can also provide
the clone method, although the clone method can belong to a yet more generic class, but we'll add it to the `Entidade`
class

Inside the shared folder, we create this `Entidade` class as abstract — since we don't want it to be instantiated, only
classes that implement it can be. and apply it to the `Pessoa` class.

We start by moving the id, and props from `Pessoa` to the class `Entidade`. Define a constructor and use it to instantiate
those properties. After the props property, we are able to pass the properties from the child element to the parent.

The problem is that there is nothing that enforces or guarantee the presence of the id on the properties, since the props
is of type any, and we can "appeal" to the use of generics

The generic use is similar to the `CasoDeUso` in the previous chapter. We will create an EntidadeProps for this, and the
reason why we type the generic, is to narrow the properties options, telling that the properties which will be passed to
this class, inherit from those props and needs to adhere to them. Now, we even have autocomplete since by the props type
we already know that there may have an id inside of it

Now we make the class `Pessoa` to extend `Entidade`. And to extend generic, we need to inform it on the <> what is the type of
`Props`, which is an object that has at least, the id attribute. And it is also interesting that the PessoaProps interface,
also extend `EntidadeProps` so it is guaranteed that it has the type expected by the generic

## Lesson 29 - `Entidade` clone method tests

Before starting to create new tests, we need to fix some tests.

### Clone `Pessoa` Clone typed any

When we clone a `Pessoa`, we are receiving an `any` typed `Pessoa`, it is a `Pessoa` but ts is not sure.

We can fix this, by saying that it will return a certain type, which is not `Props` but another generic type we will have
to pass when instantiating a `Pessoa` 

So here at the steps we should follow to make this:

1. In the class `Entidade` define a new argument to the generic that will correspond to the current child being implemented.

e.g. `export default abstract class Entidade<Tipo, Props extends EntidadeProps>`

2. Pass this generic `Tipo` to every method, including as the return type of clone

3. Modify the class Pessoa to say that this `Tipo` we pass to the `Entidade` generic is of the type `Pessoa`

Now, by defining this, whenever we instantiate a child of Entidade, saying that the class itself is the type of `Tipo`, we
won't have that problem anymore, since that when creating a `Pessoa`, we are indeed creating an object of type `Pessoa`.

We can even see on the tests that the `novaPessoa`, which is created using `pessoa.clone` is of type `Pessoa`

With this test, we could see another use of a generic type, and how the parent entity can call the child constructor
and even have access to the class being passed


## Lesson 30 - `Entidade` tests

This lesson will be dedicated to testing the `Entidade` class

## Lesson 31 - `Entidade` Builder

We will create a data folder inside tests, and define a `PessoaBuilder.ts`

First we start by defining a private constructor that will be called internally after a static method

At the end of the process creation, we will want to create a `Pessoa`. If our objective inside the PessoaBuilder is to
build a `Pessoa` we will define a build() method and instantiate it with the properties that are part of it

We've already shown a builder example, but for a reminder, a builder works by calling multiple methods in a chained manner
and at the end, it will call the `build()` to build a Pessoa and this is the objective of the class

One example would be a method exemplo() which its return type is PessoaBuilder and it returns the object itself
  - This means that once we have a method that returns the Builder — References the object itselF. Once we return the
  PessoaBuilder, we can do the object chaining and in the end, call the build method 

And the Builder allows us to generate multiple sets of tests and create as many customized methods inside the 
Builder, which will enable us to create many different types of testing.

Builder is also useful when we have complex data or objects that contain other complex objects inside of it 
- Let's assume we are treating a course, and this course have chapters that has classes, and  so on.
-  Inside the curso builder, we call another builder ('ChapterBuilder`) that calls another builder (`LessonBuilder`),








 
 













