## Programming Paradigms

Most of the programming paradigm were established between 1950s and 1960s. Among them, three major paradigms have shaped
how we develop software.

### 1. Structured Paradigm:

Before structured programming, we had `unstructured programming`, where a program was essentially a long sequence of
instructions, often using a command called 'goto' to jump between different parts of the code. For example, the second
line might contain a goto that jumps to the fifth line, which might then jump to the tenth, and so so on—creating tangled
and hard to maintain logic

This style made it difficult to organize code into manageable sections. A famous computer scientist (Edsger Dijkstra)
argued in a well-known article that the goto command was harmful. While some defended it for offering flexibility, Dijkstra
pointed out that this flexibility came at the cost of modularity and readability, making it almost impossible to maintain
large programs.

Structured programming introduced a disciplined way of writing code using control structures such as 'if', 'for', 'switch',
and 'while. It replaced the chaotic jumps of goto with clear, block-based logic. Although we lost some flexibility, we
gained maintainability, clarity and modularity, which are essential for developing complex systems.

Today, all modern paradigms, including OOP and Functional Programming, are built on top of the structured paradigm.

### 2. Object-Oriented-Programming (OOP):

    OOP extends the structured paradigm by introducing concepts like `encapsulation`, `inheritance` and `polymorphism`.
    It organizes the code around `objects`—instances of classes that represent real word entities and behaviors.

    OOP helps developers manage complexity by grouping related data and behavior together, making code more modular and
    reusable. It builds upon structured programming principles but adds additional layers to model more complex systems.

### 3. Functional Programming:

Interestingly, functional programming is the oldest paradigm conceptually, even though it became popular only more recently.
It originates from `lambda calculus`, developed by Alonzo Church —who was one of Alan Turing's advisors. Long before programming
languages existed, lambda calculus introduced key ideas such as: Pure Functions, Function Composition, Immutability

Functional programming focuses on writing code using pure functions and avoiding shared state. Although it was the earliest
in theory, its practical application became more prominent much later, specially with modern needs for predictability,
testability and concurrent programming

When we moved into `structured programming`, we introduced the concept of all call stack — a stack-based execution model.
Structured programming is also closely associated with `procedural programming`, which is based on the use of procedures
(or functions). In the context of JavaScript, procedural programming focuses on building programs using named procedures
or functions as the main building blocks.

In Dijkstra's article, he noted that `goto` was harmful in specific scenarios, while in others it was not. This was because
`goto` was also used to create repetition loops. For example, we might have had four lines of code executing in sequence,
and at the end, a `goto` would return to the beginning, causing the code to repeat until, at a certain point, the program
pass it.

When the program detected that it was executing a loop, or even using the `goto` for a conditional — such as skipping a
statement and jumping to the next one (which was basically an if) — it became clear that these kinds of `goto` statements
weren't harmful, that's because, over time, we were able to break the code into blocks, so the code wasn't completely
entangled due to these types of `goto`. However, beyond loops and conditionals, he noticed there were other types of `goto`
statements that jumped to completely different parts of the code, and those were harmful.

Going to structured programming, inside the world of programming, procedures/functions were introduced as well as controlled
structures.

While simple programs consist of only a few lines executed sequentially, until they reach the end, more complex cases on
behave differently. For example, a program might begin in a function (fn1) which calls another function (fn2), which then
calls yet another function (fn3). And this can continue indefinitely

Can we just leave fn3 and return to fn1? The answer is No. When fn3 finishes, it automatically returns control to the function
that called it — in this case, fn2 — which in turn returns control to its caller, and so on, until the execution reach the
base and completes
By this, we'll notice that the program is a big pile of code, and this pile dynamics, is a restriction, that in contrast
to 'goto', where we could simply go from one side to the other, that idea of an execution stack didn't exist.

From this, we can observe that a program is like a large stack of code, and this "stack dynamic" imposes a restriction.
In contrast to goto, where control could jump from one part of the code to another arbitrarily, the concept of execution
stack didn't exist

To transfer control from one function to another, each function must pass control explicitly to the next. When the last
function in the stack completes, it must return control to the one that called it. This means a function cannot return
control to just anyone — it must follow the structure of the call stack.

This principle also applies to repetition structures such as for loops. In such cases, the loop controls the flow of
execution, transferring control in a structured and predictable way — not arbitrarily like a noodle flopping from one
part to another.

Therefore, there's a discipline on the control transfer, which was introduced after the structured programming.

In programming, broadly speaking, we can classify its components in two main categories:

`Data` — Organized through data structures — and `algorithms` — organized through lines and blocks of code (such as named
blocks, functions, structs, etc.);

`Paradigms` are a way of thinking, That is, given a problem, we adopt a "framework" of thoughts to structure our solution
based on principles of a specific paradigm. We look at the problem, from that paradigm's perspective, and then reason about
a solution.

The relation between data,behaviors, and algorithms determines which paradigm we are using

In programming based in `goto`, we had data and behavioral/algorithmic code expressed through sequences of instructions.
In contrast, in structured programming, POO, and functional programming we have a more organized relationship between
data and algorithms

How these two main parts of a program — data and algorithms — interact determines whether we are using an OO paradigm,
functional or structured.

The way data relate is the main characteristic that determines which paradigm we are using.

One way to imagine a parallel between structured programming and OOP, is by considering the role of functions. Let's say
we have a function that takes a set of input parameters — for example, x, y and z. This function may or may not receive
arguments and may or may not return a value.

In a scenario where we have functions that receive data and process it, we're working with a paradigm focused on functions.
This could be either a `functional paradigm`, which relies heavily on functions, or the structured (procedural) paradigm,
which also uses functions as core building blocks.

While both paradigms make heavy use of functions, they differ significantly in their approach. Let’s break this down with
an example:

Procedural Paradigm:

```js
let a = 3
let b = 7

let c = somar(a, b)
```

Here the "main character" is the function itself. We pass the data into the function as arguments, and it processes and
returns the result. The behavior is defined independently and applied to data externally.

Object-Oriented Paradigm:

In contrast to procedural programming, oop begins with data — we model real-world entities by combining data and behavior
into a single structure. Instead of having free-standing functions, we define methods inside objects.

For example, instead of a simple `sum` function, we could define a `Calculator` object. This object could include the
method somar, and also have a property like currentValue. In this case, the method could operate on internal state.

```js
let c = new Calculator()

c.somar(3)
```

Now, somar is not just a function — it is a behavior tied to a specific object. The calculator contains both data and methods,
which allows encapsulation. Similarly, we could model a Product object that contains name, price and stock, along with
behaviors relevant to it — like updating stock or calculating discounts.

Internally, OOP builds on concepts that existed before it—such as structures and functions—but introduces a more disciplined
and expressive way to organize code.

Just as structured programming imposes discipline over direct control flow (e.g. avoiding goto), OOP imposes discipline
over indirect control flow, which is closely tied to one of its key pillars: polymorphism.

Before OO:

What we had: Let's say we had an application with three functions and some data —texts, number, booleans, arrays. The
data would be passed as parameters to the functions, which would then return some result. This means we have this loosely
coupled elements within a single structure.

After OO:

What we have now: There's a structure we can think of as a capsule —which is basically an object. inside this object, we
have both data and behaviors.

Using a product capsule as an example, we can divide it into data and behaviors.

Data: name: string, price: number, status: boolean

Behaviors: Methods that operate on the data.

Encapsulation changes the way a developer thinks, because now they are grouping these structures together, which now hold
state. In procedural programming, data typically exists either in the global scope or in the local scope.

In object-oriented programming, methods can have local variables within their own scope, and they also have direct access
to instance variables. This strong coupling allows methods to modify the object's internal state directly.

### Classes vs Objects Relation

Let's say we have a cake factory. If we use a star-shaped cake pan, the cake will take on the same defined by that pan.

We can think of this as the mold or model we use to make the cake. After creating that mold, we can use it to make any
number of cakes. In programming terms, the mold is the class and the cake is the object created from that class. We can
create as many objects as we want using the smae mold

#### Example 1: A class that represents a date

```js
class Date {
	day: number = 1
	month: number = 1
	year: number = 2025

	get formatted() {
		return `${this.day} of ${this.month}, ${this.year}`
	}
}

const currentDate = new Date()

currentDate.day = 4
currentDate.month = 5
currentDate.year = 2025
```

When we create an object using the reserved keyword `new`, this object will allocate memory to store the values of day,
month and year.

Every time we instantiate the `Date` class, we're using the exact same mold. If the class has 3 attributes, the objects
created from it, will have the same 3 attributes — meaning the structure of all objects from class will be the same, including
both the data and behavior.

_Reminder: even if the object is a declared as a constant, we can still modify its internal data_

By creating a formatted getter, like this:

get formatted() {
return `${this.day} of ${this.month}, ${this.year}`
}

We can retrieve the current object's data and present the date object in a human-readable format. Since the class is only
a blueprint, the way to reference the data of each specific object is by using the `this` keyword.

### Static Attribute

When you change an attribute from public/private/protected to static, it stops being an instance attribute and becomes a
class attribute.

This means that the attribute no longer belongs to individual objects created from the class — instead, it belongs to the
class itself. All instances of the class will share the same static attribute.

While instance attributes are stored in each object and can have different values per instance, static attributes are
defined once on the class and shared across all instances.

That's why it doesn't make sense to make certain attributes static — like sharing the same `day` value across all objects.
Instead, static attributes should be used for constant data that doesn't vary from one object to another, such as the value
of PI on a `Math` class

One valid example, for the Data class, would be creating a static attribute of YEAR_ZERO_UNIX = 1970, because this would
be the same for every object, and this would now be accessed using Data.YEAR_ZERO_UNIX, without the need of an instance.

### OOP Pillars

An explanation of each pillar with real world examples.

1.  Encapsulation

    Anything that we use, and we don't need to know its details in order to use it. For example, when driving, we don't
    need to know the communication interface between the human being and the car, nor the details of its pedals, steering
    wheel, gears, etc.

    However we don't need to know its internal details, such as the combustion process, whether its engine its electric or
    combustion-based, whether it has a piston, carburetor, a spark plug, or a a cylinder? All of these are internal details
    of how that object (in this case, the car) works.

    When we think about encapsulation, we think about hiding the internal details. We only need to understand the interface
    of an object. For example, imagine a car from a different brand than the one we're used to. To fuel it, there might be
    a handle on the ceiling of the car and we may to turn it from time to time.

    Another car brand, might require us to click on a trackpad to change gears

    By this, the interface of how a car is driven changes. When we have a shock (i.e., a change in interfaces), for example,
    when we change the way we use a certain object, it creates a higher collateral effect than simply changing the
    internal details.

    However, car gears are commonly changed in the same way, with pedals in the same order, steering in the same place,
    the seats in the same position, and so on. This is because the interface is the same. The adaptation process when using
    cars from two different brands is practically immediate because the communication interface is almost identical.

    Thus, the reason OO hides internal details is that our programs are composed of a large set objects, which interact with
    each other, The goal is to make communication between these objects as simple as possible, hiding the complex details
    of how the object was implemented inside itself, so that it can be used in a straightforward way.

    We can use an e-commerce checkout use case as an example. The object that handles the checkout doesn't need to know how
    the price is calculated internally, taking into account taxes/freight and so on.

    Therefore, what we want is to break the complexity down into small objects, and hiding these details inside the object
    , which acts as a capsule.

    Encapsulation has two main purposes:

    1. "To combine data and behaviors in the same structure"
    2. "To hide unnecessary details from the external world, making the object as simple as possible for other objects to
       use.

    When we start working with a simpler example, the objects will depend on each other and the chances of having
    a high degree of connection are very high.

    By this, we understand that the objective of encapsulation is to control the levels of visibility of the attributes
    and behaviors that are part of the object. Not all attributes or behaviors should be visible to the entire
    codebase. By treating the object as a capsule that holds both, we again, within OO, the ability to keep some attributes
    hidden from the external world, making the object owner of that information and being only accessed by it.

2.  Inheritance

There are some ways we can reuse a code: The first one is the `DRY` (Don't repeat yourself). Sometimes there are cases
that we think its repeating and violating this principle, but we are not, because it have different purposes. However, if
we try to reuse the code, in order to combine both, it will generate a problem.

There's also the composition, which is by far the best way to reuse code, it allows us to reuse code in a more personalized and
flexible way compared to inheritance. Inheritance may introduce unwanted behaviors in certain scenarios, and since it's
more rigid, it becomes less appealing than composition, which offers greater flexibility.

Inheritance: 'It's one relation', every time we think of this, like a dog IS AN animal, it doesn't mean we have to use
inheritance.

There is a well-known principle in OO, that advises us that we favor composition over inheritance. Because the composition
is simpler, more explicit, more flexible, and so on.

However, there are cases where inheritance is appropriate—typically when we can answer the question "Is it a?"

For example: Is ferrari a car? Is a Civic a car? These are "is-a" a relationships, where car is a more generic
concept, and Ferrari or Civic are specializations. In such cases, inheritance makes sense because we are modeling a hierarchy
of generalization and specialization.

In contrast, composition suited for "has-a" relationships. For instance, a car `has` doors, car `has` an engine, car `has`
wheels. Here, we combine simpler objects into a more complex one. The car is not an engine—it contains one. This is the
essence of composition: building complex systems by assembling smaller, independent components.

In fact, the real world tends to prioritize composition. Consider a bedroom: it has computers, wardrobes, clothes, and so
on—objects that, together, make up a more complex environment.

Therefore, if we find ourselves trying to create an inheritance relationship where there is no clear "is-a" logic—like
saying "an engine is a car", chances are we're modelling the problem incorrectly. In such cases, composition is likely
the better design choice.

Sometimes, people try to achieve reusability through inheritance just because some attributes are similar.

For example, imagine a `Food` class which has name and weight properties, and another class named `Person` that also has
name and weight. Some developers might decide to use inheritance simply because the properties name match.

However, this is not a valid use of inheritance. Inheritance should only be used when there's a "is-a" relationship.
Even though a person has a name and weight, that doesn't mean a person is a food.

This demonstrates why composition is often a better alternative.

A design pattern which works very well for replacing an inheritance for a composition is the `Decorator Pattern`, it
allows us to modify or extend the behavior of a without needing to inherit from it directly.

The core idea is to wrap or inject behaviors from another class rather than inheriting them.

A more concrete example would be a `Car` class and the `Specialization` class that inherits from `Car`.

The base `Car` class could contain general data and behaviors such as currentSpeed, maxVelocity, brake(), and accelerate().

Using inheritance, every specialization would automatically gain access to these properties and methods.

Example:

```ts
class Car {
	currentSpeed: number = 0

	accelerate() {
		this.currentSpeed += 5
	}

	brake() {
		this.currentSpeed -= 5
	}
}

export default class Ferrari extends Car {}

// Now, by creating a test file, for example and import this `Ferrari` class and log it, we'll be able to see that it has
// everything from the Car
```

However, we could instead apply composition by injecting these behaviors into the specialization, which can provide more
flexibility and better separation of concerns — especially when we want to extend or change behavior dynamically.

The last example is the polymorphism, which its types are:

Dynamic:

Let's say we have a `Car` class, a `Jeep` and a `Civic`, where these two models inherit from Car with extends.

Assume we create a variable `c: Car = new Jeep()`, what will happen here, is that in the memory, there will be a reserved
spot that stores the c value, and within this space, we have a Jeep. By the moment the program continues to run and we
take this c variable, and assigns it to a new Civic(), instantiating a new Civic object — which is also a car. On this memory
space, what was a Jeep before, is now a Civic.

In other words, the variable c have multiple shapes and we have a polymorphism, meaning that we can have multiple shapes
inside a single variable.

If, before assigning it to the `Civic` object, we accelerate, we are calling the accelerate from the `Jeep` object, and
by calling it again, after the transformation, we are calling the behavior from `Civic`. Therefore, we can change the control
of our application, call codes from different places, because of the polymorphism.

The indirect control transference is because at the moment we have a `Jeep` instance and we call the accelerate method, we
are calling it after another structure, and by changing this variable and calling the accelerate again, we are calling it
from a complete different place.

The accelerate method, can have different implementations from one object to another.

If we had another car model that inherits from Car, we are still going to be able to assign the c variable to it and call
the accelerate method — which also has a different implementation from the others — from the object

Concrete example:

By creating this function, that takes an argument of the Car type and we call accelerate inside of it, we can pass many
objects, from different types, in other words, we are changing the flow of our application because we have the polymorphism
and after it, we can alter the transference of the application but no directly, this is not an explicit function call,
there can be many types of implementations of that c parameter accelerate, and in an indirect manner, we can access
many codes through it.

```ts
function xyz(c: Car) {
	c.accelerate()
}
```

Other example:

Imagine we have a generic type called `Database`, which has three implementations: `DBMemory`, `DBOracle`, `DBMongo`.

At the moment of defining the core behavior of a database , we can create a generic interface that defines the base
methods (e.g. save, delete, find). Each child implementation will then provide its owm logic for these methods

By relying only on the `Database` interface—without coupling our application to any specific implementation— we are applying
the concept polymorphism, often described in the Ports and Adapters (also known as `Hexagonal`) architecture. In this context:

. The interface (e.g., `Database`) represents the Port (or 'door')

. The concrete implementations (e.g., `DBMemory`, `DBOracle`, `DBMongo`) represent the Adapters.

In our application logic (the "inside" of the system), we know that at some point we'll need to persist data. Depending
on the environment or situation, we may use a different implementation—for example:

. `DBMemory` for tests,
. `DBOracle` for production
. `DBMongo` for data migration

Thanks to polymorphism, we can call database.save() without knowing which specific class is being used. The correct
implementation is selected at runtime, and the calling code doesn't need to care about it.

This differs from structured programming, where control flow is explicit, and we manually direct which function or module
to call. With polymorphism, the flow is indirectly handled through abstraction—allowing us to write more flexible and
decoupled code—

In TypeScript, `interfaces` often play the role of ports (generic contracts), and `classes` implement these interfaces
as adapters. This one reason why inheritance and polymorphism are so powerful and commonly used in TypeScript.
