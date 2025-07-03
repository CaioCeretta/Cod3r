## Comments about the mentoring about relationships

Every worldly problems are relationship problems, such as problems at home, wars, and so on. This is not exclusive to the
world, programming problems also reside in relationships. Therefore, establishing a good relation among things, which are
divided in some levels, are: 

Level 1: nouns + verbs

Establishing a strong relationship between the nouns and verbs of our application is a fundamental step in designing robust
software. In this metaphor, the nouns represent the data — the entities, value objects, or models that our application
will manage. The verbs, on the other hand, represent the actions — the operations, methods, or behaviors we apply to that
data.

It is through this interplay between data and behavior that we begin to shape our understanding of the problem space and
design effective solutions. This relationship forms the backbone of how we model real-world scenarios in code.

Every programming paradigm involves data and functions. What differentiates them is how these two elements are relate
and structured:

In object-oriented programming (OOP), data and behavior are tightly coupled. Classes encapsulate both state (nouns) and
the actions (verbs) that operate on that state. This allows for rich, behavior-driven models.

In functional programming, there is a clear separation between data and behavior. Data is immutable, and pure functions
(verbs) are applied externally, promoting predictability and ease of testing.

In domain-driven design (DDD), this metaphor becomes especially powerful. By explicitly mapping domain nouns (such as
Invoice, User, or Product) and verbs (such as generate, create, or update), we align code with real-world concepts, leading
to more expressive and maintainable software.

Ultimately, it's by understanding and organizing this relationship — data + functions — that we lay the foundation for clear,
maintainable, and meaningful code. It’s not just about writing instructions for a computer, but about modeling the domain
in a way that reflects how things work in the real world.

Level 2: Application (Business) + Inputs/Outputs

This level represents the relationship between the application's core business logic and the I/O operations it depends on.
It covers how the code — typically written or specified by business specialists — is connect to external or side effects.

By Inputs/Outputs (IO), we can think of any form of communication with the outside world: writing files to disk, interacting
with a database, consuming data from a legacy system, integrating with any third party services such as payment gateways,
sending e-mails, or reading user input.

When we talk about inputs and outputs, in the context of an application, it's essential to carefully and define how the
core business logic will interface with these external operations. One part represents the pure, domain-driven application
code — ideally kept free from side effects — and the other represents the necessary but impure operations that allow the
application to communicate with the outside world.

Designing a clean boundary between the business logic and the I/O layer helps in creating more testable, maintainable, and
flexible systems. It also makes it easier to mock dependencies, change external providers, or run parts of the application
in isolation for testing or development purposes.

This relationship between data and functions is what determines which paradigm we are following and how much we are adhering
or violating it. We may have chosen OOP to guide the data/functions relationship, and once we make that choice, we will
encounter principles and pillars that shape how we relate these two elements.

However, we might unintentionally violate OOP if we don't follow its core principles and how we manage the relationship

We understand that every application is composed by data and behaviors. This is universal, it doesn't matter
if we are working on a lower level language, or a higher level language, we will always work on data and behaviors. What
will change from a paradigm to other is the relationship.

Therefore, when thinking on data + behaviors relationships, this relationship is what will generate exactly what we know
as programming paradigm. Every paradigm have data and behaviors, and the way we unite both is what will differentiate whether
we are working with one or the other.

Programming paradigms are, at their core, different ways of thinking about how to solve problems through code. 
It's even possible to work with multiple paradigms simultaneously within the same app — for instance we might choose to
tackle a specific problem using a more functional approach because it makes more sense to us, even within a broader object-oriented
system.

This means we will usually have a primary paradigm that guides our architecture and development decisions. However in specific
parts of the codebase, we may opt for a different paradigm if it provides a better fit for the problem at hand.

We may, even incorporate principles from other paradigms that we consider good practices. For example, in OOP, we often
work with mutable data — values that can change overtime. A valuable practice we can adopt from functional programming is
immutability, which can lead to fewer bugs, and make it easier to reason about code, specially in concurrent or multi-threaded
environments.

Even though immutability is not a strict requirement in OOP, We can simply "import" this mindset, and start applying itgg
to our object-oriented code to improve safety and maintainability 

### What are I/Os (Inputs / Outputs ) in an application

On the software context, I/O refers to any communication between system and external world — be it by receiving data (input)
or sending data (output)

Common examples are: 

Inputs — what enters the system: 

. HTTP Requests (ex: a form sent by an user)
. Reading files from disk
. Reading messages of a queue (ex: RabbitMQ, Kafka)
. Querying data from a database
. Commands entered in a terminal or CLI

Output — what the system sends or does externally

. Sending HTTP responses (e.g from an API)
. Writing files in the disk
. Send e-mails or SMS messages
. Persisting data in the database
. Sending events to other systems
. Terminal logics or file logs

In a well structured architecture (such as Domain Driven Design or Clean Architecture), the core of the system (business logic)
should: 

. Not know or care how data comes or where it goes;
. Only process data and apply business rules

All I/Os operations are considered implementation details and should live at the edges of the system (in outer layers), 
so they can be easily changed, mocked, or replaced without breaking the main logic.


### DDD - Domain Driven Design

DDD is an approach to software development that focuses on modeling the business domain accurately and aligning the code
with the real world rules an processes of the organization

Key Concepts of DDD

1. Ubiquitous language
Everyone involved in the project — developers, business analysts, domain experts — should use the same language. For example,
if you're building an order system, everyone should consistently use terms like "Customer", "Order", and "Product", and your
code should reflect that exact language

2. Domain Modeling

You model the business logic in terms of domain concepts — creating entities, value objects, and domain services that represent
how the business actually works, independent of technical concerns.

3. Layered Architecture

DDD encourages a clear separation of concerns through layered architecture: 

. Domain Layer: Contains the pure business logic and rules
. Application Layer: Coordinates use cases and delegates to the domain layer.
. Infrastructure Layer: Handles technical details like database access, external APIs, messaging systems, etc.
. Interface Layer (also known as Delivery Layer): Exposes the system to the outside world (e.g., REST APIs, UI, CLI)


And how does it relate to Inputs/Outputs? 

When we think of separating business logic from I/O, we consider one of DDD's key principles: keep your core domain logic
isolated from technical concerns like reading from databases, writing to files, calling APIs, etc.

This separation allows us to: 

. Write business code that is easy to understand and test.
. Swap out I/O mechanisms like changing databases or APIs without rewriting our domain logic
. Avoid tightly coupling our core logic with specific frameworks or tools.

## Data vs Data Structure

○ One important thing to clarify, is that there is a clear difference between what is data and the structures that organize
this data. For example, we can have multiple numbers, which within the computer it has a structure defined in any given
format, number of bits to specify its signal, and so on. Therefore, data is one thing and data structures are other.

○ For example, Number, Boolean and String are structures, they are the basic blocks of a programming language, and we have
more complex structures such as trees, queues, stacks, custom structures (like objects).  

● System for a basic school

  ○ Let's say we talked to a specialist, and ask what the institution needs for the first version
    ■ The specialist may tell us that it needs to have the rooms, patrimony, students, professors registration, and what
    is the relationship between teachers and classrooms, and so on.
    ■ This would demand a data structure that will represent the student, other one that represent a teacher, other one
    for the classrooms, and so on
    ■ Now 'John Doe' who is seven years old, is a data part of the custom structure we've just created, and we should
    already understand that objects are these structures, ones which uses other kinds of more basic data to compose it.
    Meaning it could exist more complex structures that compose other structures and so on
    ■ We can have, for example, a responsible for a student, and this responsible can have an address, that is other
    object/structure which in turn, composes the responsible object. It can also be related to other students in the
    same schools, etc.
    
■ Most common paradigms

  ○ We mainly have three paradigms, created almost 70 years ago and no other new one was created, it may exist new ones
  but they are built on top of these existing ones.





  ○ Structured Programming (1970)

    ■ When thinking about structured or procedural programming, we think of two similar programming languages, which are
    very similar but they ar not the exact same thing. Structured is more about the control structures and procedural is
    more about procedures / functions. However, they are two things that walk alongside and we can think of both in the
    same paradigm group.
    ■ Functions have inputs (parameters) and outputs, essentially functions have the role of transforming those data
    and inside this paradigm, it is very common for us to use global data, which means they'll be available to multiple
    parts of the app and we have it as the main character.
    In this type of programming, the objective is to transform data — we receive any desired type of data and transform
    it into something else.
    Functions can be: 
      □ No inputs: Only the outcome when invoked is important
      □ Ones that receive a parameter but doesn't return anything: Only processes the argument
    ■ When thinking of functions, there are multiple variations and relation between functions and inputs. In practice
    we can have a series of functions we can use to transform values and variables like we desire.
    ■ One example would be a `power` function, it would receive the base and the exponent, and when passing these two
    parameters it will return us the power, such as 2, 8 that would return 256.
    ■ We may use it in other paradigms, such as `OOP`, but it comes from structured programming.

    ■ One important concept, that came from structured programming, is the execution stack.
      □ It is the whole application execution pile showing who called who, for us to know that: "oh, the main function
      called the function x that called function y, which called the function z that returned the error¨.
      □ When there's an error in the stack, it returns to us that giant message full of errors, but inside of it, it shows
      the `stack trace`, that is the trace from the whole stack until the error, this is a way for us to know where it
      was that caused the problem, and where it originated.
      □ In the beginning, with `goto` paradigm, it could go to any place of the code, the line 287 could send to the line
      4, for example, which is why it is the most flexible existent pattern. However, flexibility is not everything and
      in some cases it can be undesired when looking for having a more readable and maintainable program. Since that using
      goto we can take city streets as an example, it would be like allowing driving the wrong way, going against traffic,
      taking prohibited turns, and so on.  
      □ On the non-structured programming, that is a more flexible kind, it was shown after multiple debates, that it could
      be a problematic way to program, and structured programming started being used, because it is "verifiable", we can
      isolate parts of the application, what we could'nt using goto
      □ Therefore, the idea of a stack, is that one function calls other one, and it would work like: 
        
        1. Call a function main, which is now the base of the stack
        2. Through the main function, we call another function named initialize, which will now on one level above
        3. Through initialize, we call other function named environmentVars()
        4. After each invocation, when it finishes, it will leave the pile and the stack control will go back to the function
        that called it.
  
      □ This is called direct control transference, 
      

       
      

    ■ Whereas in a procedural paradigm, the procedure is the main character,


  ○ Object Oriented Programming (1960)
  ○ Functional Programming (1950)



  