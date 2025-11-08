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

## Lesson 8 - Class Pessoa


