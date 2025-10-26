## Lesson 1 - ArchitecturOverview

  ### What is an architecture? 

    ■ The architecture is the "skeleton" of the app, just like a building skeleton, with its columns and the floors.
    Therefore, this skeleton is the same as our architecture, our architectural decisions that will build the foundation
    so we can start solving the problems and making design/code choices.

    ■ When we have this structure, it will already define a set of restrictions, like the restriction of height of one
    floor. The architectural restriction define and limit how many floors there are going to be, width of the available
    space, and so on.

    ■ An architecture is designed to solve a business problem. So it has to serve the business, but it does'nt mean we
    are not going to use reference architectures to solve a problem, because there are problems that are common to many
    companies, such as a system that requires a high level of requests per minute, such as a ticket system for a famous
    show. And these cases, many times in less than one hour, all the tickets have been sold, and we are going to need
    a reliable system to deal with these requests.
      □ Probably, we are going to get inspired by a reference architecture and then implement our own architecture

    ■ We saw that codes should'nt influence the architecture, only the other way around. However, they can violate an
    architectural rule, where we insert a dependency, that should'nt, where we use a dependency we weren't supposed to
    and the communication between these components should'nt exist.

    ■ An architecture needs to be a server of the business purpose, it needs to be good on saving resources, easily
    maintainable and other important characteristics.

    ■ Back to the building example, now that we established our limits and restrictions, we have the "freedom", under
    that sphere of influence, to choose how we are going to define the design or organization of these spaces.
      □ For example, we can define that in this floor we are going to have four apartments, and we choose where we are
      going to place the hallway, entries, how many elevators, or choose the space inside the apartment based on the
      profile of who is going to buy this, and we start taking design choices, of how we organize the environments so
      we can then take the code decisions. The code decisions, in the architecture would be something as
        - The walls are going to be made of bricks
        - It will be made of dry wall
        - ...
        . Therefore, we can make code decisions, without necessarily violating the design, and consequently, without
        violating the architecture  
  
## Lesson 2 - What is architecture? #01

  ### Architectural, Design and Code problems

    ■ In general, the word "architecture" is used in the context of something on a higher level it is independent of the
    lower level details, while "design" often seems to suggest structures and decisions to lower levels 
      □ Design has a "minor influence" than the architecture, yet it is still relevant inside a given module, taking a
      design decision of using ports and adapters, for example, it is an important decision that will guide the way
      we code
    
    ■ The primary architecture objective is to minimize necessary human resources to build and maintain a given system.
      □ It has the objective of serving to a determined purpose

  ### Architecture Overview and Objectives

    ■ There is a formula we can use to think the objectives of an architecture that is Productivity = Performance/Effort

      □ Think about how much we can produce, or perform in our solutions and code in general, on top of the effort we
      will need to have, or the effort we put on. How much we can deliver with certain effort.

      □ If this effort start growing, but the deliver performance start to fall down and starts falling apart. This means
      that our architecture is a well chosen architecture to fix the issue — probably one with high level of coupling.
        - Coupling is in the interdependency between the elements of our app, and coupling is never a good choice on our
        apps since that one part of this coupling may slow down the rest . If we stop to think on an architecture that
        has 20 elements, and each item depends on the other. This would cause one change to impact other 10 elements and
        so on.

      □ Most of the times, a bad choice of architecture, will require a more effort of the team, a larger to team, to
      maintain the same performance decreases over time.

    ■ Architectures represent the design significant decisions that shape a system, where the significance is measured
    through the cost of the change. 
      □ And by cost, we don't necessarily mean financial cost, but also, cost of time, is the architecture we are defining
      an architecture that values the writing of tests? or is it simply an architecture that for it to be tested everything
      must be working — legacy system must be up, database must be up, external API must be up. and so on. Meaning that
      we can only test on an ideal scenario, if the database is down, the tests can't be done.
      □ This is a cost question, it doesn't necessarily has to do with the professionals or the resources, but the delivery
      time and complexity will be higher 

    ■ "Architecture is the set of decisions you wish you could get right early in a project, but, like everyone else, you
    didn't have the imagination at the time" and "Architecture is about the important stuff. Whatever that

      □ This quote gives us the sensation that the architecture is something where we have a clear direction of where to
      go, but it is a "human being", different from the building analogy, a building is modular and we are able to make
      replacements until it is done. But in a programming architecture, the fact that we haven't made a decision at the
      beginning of the project, because we could'nt glimpse this necessity in the beginning does not prevent us from
      apply certain architectural changes, like:

        . Twitter started with a MySQL database, up to the point that the database wasn't working anymore and they had
        to change their solutions
        . Netflix started with a java monolithic app, up to the point that it grew, until reaching the point they had
        to break the app in multiple services and so.
      
      □ Therefore, we need to implement a "fault-tolerant" architecture, a resilient architecture that recovers itself
      easily, because if we had an app with multiple services running simultaneously, and these services were published 
      during the day. At some point one of them may go offline and the process must continue.

      □ The architecture is about the important stuff. Whatever that is". 

## Lesson 3 - What is architecture? Who depends on whom? 

  ### Architecture -> Design -> Code. However, this doesn't mean that the code isn't important

    ■ Code is the less critic level, but it isn't less important, since that without code nothing works.

      □ We may have a perfect architecture, with no flaws, that thinks about multiple design patterns to apply to the
      application, but we obviously need to "raise the walls" so a building can be functional.

      □ However, its decisions can be exchanged in a way more simple manner than architectural/design decisions.

  ### Of what consists an architecture?

    ■ An architecture consist of 3 primary aspects: Components, Responsibilities and Relationship between them.

      □ For example, let's suppose that our app has the front-end, two different APIs, relational and no relational
      databases, a load balancer to distribute the load within the app, a queue of messages, and so on.
        . And we are not talking about the components related to the code, but to the components thinking on a broader
        manner, a broader architecture.

      □ And we need to think of: "What is the responsibility of API x? or of the API y? Which languages are going to be
      used in these APIs? 
        . The language decision is a decision that impact the project and it is basically an architectural decision
        . And we may think, "Oh, in the  API x we will use python, because python will be more simple to solve this
        problem. And in the API y we will use ts, because it will be more helpful. And the API x will have its own
        database" . These are all architectural decisions, we must not confuse these decisions with decisions about
        the code, which loop or conditional will be used, etc.
        . "Inside the API x we won't use the hexagonal architecture, since it is too complicated"...

      □ We have the issue of these elements/components of our architecture that will build our architecture as a whole,
      eventually even create a diagram of how the architecture is being organized. Responsibilities of each element, and
      by defining the responsibilities, it is important to define the borders of each component.
        . A component that doesn't know what is his responsibility may end up assuming other component responsibility and
        generating a large coupling between them
          - We can think of a cyclic dependency, where the API z depends on a certain function of API x, but x depends on
          z to fix this function and this will lock the code. Everything because the responsibilities of each one of them
          was not well defined.
        . And the fact that only having the components isn't enough but to also define their responsibilities between
        them.
      
      □  And by the end, we will finally define the relationship between these elements. And this relationships of
      who speaks to whom, who depends on whom, and so on. They are also with a critic level of importance, they are
      architectural decisions.
        . By asking "Which database we will choose? Oracle? Postgre? Mysql?". These decisions may sound simple but they
        are decisions that have a major impact.
        . "Will I initialize this project with a monolithic architecture or will I use a distributed architecture? Or will
        i separate the application in 3 different services, and so on". 

## Lesson 4 - Clean architecture: Concepts and Contexts

  ### Entities

    ■ What does the "Fundamentals of Database Systems"? define as an entity? 

      □ A type entity defines a collection or a set of entities
      □ Therefore, for the database, a type entity is a table, a set of data that share the same set of attributes. Which
      means that we have a type product, for a table product. type Client for a client table, and so on
      □ Since this entity type is also a set of entities which means that the entity is a register, a tuple of the
      database.

    ■ And the "Domain Driven Design" book?

      □ An entity is an object defined primarily by its identity, it its called an entity. Therefore, an ID is what defines
      it as being one.
        . Therefore, when we have something whose uniqueness is defined, and that we can detect that it is the object
        being handled. this is an entity.
        . Imagine we have two user object representing the same user, and they have the same id. This means that they
        are the same object, they may have different versions, the one being used is one or another, which means that
        we will come across two entities in the memory that point to the same object because the ID is the same.

      □ This is the concept entity

    ■ And in the "Clean Architecture" book definition, which is the book we are focusing on? 

      □ An entity is an object, inside a computer system, that embodies a small critical set of business rules.
        . This means that we embody this rule inside a software element, be it a function, a class, an object, and so on.

      □ Does the other books also consider functions, classes, to be entities?

        . For the "Database Systems" book the entity is basically a table, a set of data that share the same attribute, so by its definition
        it can't also be a function.

        . For the "DDD" book an entity must have an id, therefore:

          - Let's say we have a function to express a business rule, a statement summary, a monthly statement, for example. 
            . Is this an entity? Yes, it is an element that expresses a business rule of our app. And to express this after
            a function is also not an entity, since for that book, an entity must have an ID, and there are other elements
            to express a function that express a business rule.

  ### So should i completely base myself on a specific one? 

    ■ Is important for us to have the care of getting these concepts and be able to understand the context where this
    concept was defined and understand the whole

    ■ What is a controller, what is an entity, what is a use case, they are all concepts that are these blocks of construction
    of their idea of clean architecture and it is extremely important that we understand the concept and know how to
    interpret the architecture as a whole.

    ■ Therefore, we understand that the concept must be understood inside a context because the same context can talk
    about different thing and this bad understanding can compromise the understanding of the whole.

## Lesson 5 - Clean Architecture #01 

  ### Clean Architecture and Domain Modeling

    This analysis synthesizes the core concepts of Clean Architecture. its relationships with DDD, and its key structural
    difference from traditional layer architecture

    #### Clean Architecture Structure

    Clean architecture is defined by a dependency rule that organizes an application into four primary layers, moving
    from the most stable, innermost layer, to the most volatile, the outermost layer:
      
    1. Entities (Core business Rules): The innermost layer, containing the objects that embody a small set of critical
    business rules and data. These rules are independent of any specific flow of execution
    2. Use Cases (Application Business Rules/Flows): This layer contains the application-specific business rules. Use
    Cases are the orchestrator or "flows" that deliver a specific application functionality (e.g., RegisterUser, OrderRegistration).
    They consume and manipulate the entities
    3. Interface adapters (Controllers, Presenters, Gateways): This layers acts as the bridge, converting data formats
    4. Frameworks and Drivers (External influences/UI/Web/DB/Devices): The outermost layer, composed of external technologies
    databases, UIs, and specific frameworks/drivers (e.g., the library used to connect to a specific database or API used
    for an external service like SendGrid)

    #### Clean Architecture vs Domain-Driven Design (DDD) 

      A key difference is the level of opinionation concerning domain modeling:

    . Clean architecture is less opinionated on how to implement the core domain. it broadly defines an Entity as an
      object embodying critical business data and rules. If the entities are modeled poorly, the Use Cases will be forced
      to implement an excessive number of rules, which is an inappropriate responsibility for the layer.

    . DDD dives much deeper, providing a comprehensive set of strategic and tactical patterns for modeling complex
    application and business domains (e.g., Aggregate, Value Objects, Repositories). DDD offers the tools necessary to
    ensure entities accurately and appropriately express the business, making use case implementation simpler and more
    reusable.

    Therefore, for an effective "Clean Architecture" implementation, strong domain modeling principles (often derived
    from DDD) are necessary to ensure the core business rules are inside the Entities, keeping the use cases focused
    purely on orchestration

    #### Clean Architecture / Hexagonal Architecture / Traditional Layered Models

      ● Traditional layered models (often drawn as horizontal rectangles like View, Business, Infrastructure) separate
      functionality but have a critical flaw: the dependency structure typically points downward.

        • In this traditional model, the Business layer might directly depend on the infrastructure (e.g. a specific method
        to connect to OracleDB).

        •  The problem is the dependency arrow. If the database changes or the specific connection fails, the core business
        logic is also broken and becomes difficult to test in isolation

      ● Hexagonal architecture (also known as Ports and Adapters, and the model that Clean Architecture adopts for its
      external layers) solves this by inverting the dependency

        • The core (entities and use cases) remains protected and has no knowledge of external world (DB, UI, Email service).
        • The View/UI (The driving side/api) depends on the business core
        • Crucially, the infrastructure/infra (the driven side/DB) is made to depend on the business core by implementing
        interfaces (Ports) defined inside the core

        This structure means that if we want to test the business logic, we can easily mock (simulate) the infrastructure
        components without changing the core business code, isolating the business from technological volatility. In this
        model, every external layer ultimately depends on, and serves  the protected business core.

 ## Lesson 6 - Clean Architecture #02

    ### Recap

    Clean architecture is defined by the **Dependency Rule**, organizing an application into four primary concentric
    layers. Dependencies must only point inward, meaning inner circles are completely independent of outer circles.

    ● Entities (Core Business Rules): application's critical data or rules that are independent of any specific flow of e
      execution. These are often implemented as highly testable, self-contained code artifacts
    ● Use Cases: Flows that are an orchestration of a functionality that use the entities to work, and these entities are
      not particular to a single use case
    ● External Layer: They are the databases, the external APIs, and more.

    ### Dependency Inversion

    ● Use cases need to have access to the external layers such as a database, like the login use case that needs to go
    into the database, and after the sent e-mail and password, to check whether the user exists or not.

      • The linking between both is done by the "dependency inversion" and to understand this, we will use a oracle db
      as example.

        . Does the oracle db depend on our app? the answer is no, because that is not the dependency direction.
        . The dependency is that our app, that by architectural decision, that chose to use the oracle database, will
        depend on the database to work properly.
        . And this line of dependency is the natural line, which is the reason why the layers architecture define that
        our business depend on the infra to work. It depends on external services to work properly.
      
      • And to solve this issue, we are going to use the dependency inversion, defined in the SOLID pattern, and is the
      centre of the clean architecture / hexagonal architecture.

        . It basically works by injecting inside our app a dependency, and we are going to implement an access to the
        database using a class.
        . Meaning that we will have a code artifact that will implement the whole access to the oracle database and this
        class is going to be injected inside our app.
        . To inject something inside the app, we need to have something inside our app that allow us to do this, and this
        consists of the "Ports and Adapters" concept.
        . Because we can't be tied up to external resources
        
      • "Gluing" the external with the internal

        . The use cases have some necessities that don't necessarily reflect on the technology being used. Our interfaces
        and use cases, must not be tied up in a way they only work along with oracle/mysql, it don't make sense.
        . The adapters layers, will make these necessary adaptations 

    
    ### The interface adaptersAdapters layer

      The interface Adapter layers serves as the crucial conversion zone between the external, volatile world and the
      internal, stable core. It functions like an electrical adapter, translating an incompatible external format ( a plug)
      into the format required by the application (the outlet).

      #### Roles and responsibilities

        The adapters layers has the purpose of minimizing coupling and ensure the application core is resistant to impacts
        from external framework drivers and technology changes.
        
        • Protection: By defining clear interfaces (Ports), the Use Cases establish their exact input and output requirements.
        The Adapters handle all necessary data conversions and implementations. For example, if a database driver changes
        a method from closeConnection() to releaseConnection(), only the specific database Adapter needs modification,
        leaving the Use Case untouched

        • Decoupling: The Use Case is entirely independent of the data's origin or format. It doesn't care if the input
        arrives as JSON, XML, or YAML. Translating the data is the adapter's responsibility


    ### Clean Architecture in other perspective (Figure 2) / Data flow components

      1. Controller / Input Adapter 
      
      The Controller or Input Adapter mediates the flow of external data into the Use Case by implementing the Input Port.

      • Its work is basically

        1. It translates the raw user input (from an http request body or URL parameters), into a simple, standardized
        DTO
        2. The controller receives the request (e.g., sending a request to `/api/clients/register`), extracts and validates
        the necessary fields, converts them into a `RegisterUserInputDTO`, and passes that DTO to the use case
        3. The use case accepts the dto as parameter, and inside of its logic, it then instantiates the core entity (like
        a `User` entity) from the DTO data.

      2. Presenter / Output adapter

        The presenter or output adapter mediates the flow of processed data out of the Use Case to the external world by
        implementing the Output Port .

        1. Implements the use case's output interfaces to receive the processed result (which could be a successful Entity,
        a simple object or an error status).
        2. The use case sends its result to the output port. The presenter, which implements this port, transforms the
        internal result into the final presentation format required by the client (e.g. converting back to a serialized
        JSON or XML response, or formatting data for a UI view).

      This dual-adapter approach ensures that the use case, which holds the core business logic, remains completely
      technology-agnostic and only communicates via simple, standardized DTOs and clearly defined interfaces.

      ### Reflecting the figure

        1. The Input Flow (Controller and input port)

        The flow begins when an external interface, l;ike the ui, is used by a user

        • Arrow 1: Controller to use case input port: The controller (or input adapter) receives the raw external request,
        and its responsibility is to translate the data (e.g. an HTTP request body or URL parameters) into a simple,
        standardized DTO and then call the input port interface on the use case.
        • Arrow 2: Use case to input port (Symbolic dependency): This arrow is symbolic and not an actual flow of data.
        It simply shows that the Use Case is the entity that defines the input port interface. This definition shows us
        the structure and requirements the controller must fulfill.

        2. Output flow (Use case and presenter)
         
          • Arrow 3: Use case to output port (result emission): The use case, after executing the business rules, sends
          its final result (a success status, an error, or processed data) to the Output Port interface. This indicates
          the moment the business logic completes its execution and retrieves the outcome.

          • Arrow 4: Presenter to Output Port (Implementation Dependency): This arrow showcase the dependency created
          by the Presenter (or output adapter). The presenter implements the output port interface, making it the receiver
          of the use case's result. The presenter then takes that internal data and converts it back into the format
          required by the external client. (e.g. generating the final json response, rendering html, or updating a component)

 ## Lesson 7 - Ports and Adapters #01

  ### 1. Core Principles?

  #### Name and Purpose

  The official name of this pattern is "Ports and Adapters". The term "Hexagonal Architecture" is primarily a 
  **marketing convention**. The number of sides has no architectural significance.

  Its core idea is to create a division between the **Application** and the **External World**, this basically consist
  of "us against the rest". The only thing that matters is the application logic

#### Agnostic Core

This pattern is not **opinionated** about the structure inside the core. It does not enforce us on how to implement
Entities, use cases, objects of value or domain services. It will simply define the boundary between the core logic and
the external dependencies

  ### 2. Defining Ports and Adapters

  ##### Ports (The contract/plug)

  A port is an interface defined inside the Application Core. It represents a requirement or a specific contact area between
  with the external world

    • Role: The port specifies what functionality the core needs (e.g., methods for data access or token provision)

    • Example: A `UserCollection` interface defined by the application core with methods like `FetchUsers()` and
    `ComparePasswordByEmail()`

  #### Adapters (The implementation/Glue)

  An adapter is a concrete implementation that lives outside the Application Core and implements a specific Port interface.

  ● Ports: Let's assume that our hexagon have 6 plugs on each side, it is a contact area with the external world, and the
  external world will "contact" our application through these plugs. Therefore, it is something defined inside the app,
  so that "anyone" can adapt to this given port.  And when we think about ports we are normally thinking on defining
  an interface so "someone" outside of our app, can implement this interface.

    • Therefore, they are interfaces with available methods to be implemented. For example, suppose we have an interface
    that access a set of data, like a **UserCollection** interface that contains methods such as **FetchUsers()**, **FetchUserByEmail()**,
    or **ComparePasswordByEmail()**
      . These methods may be used to access a set of data, and this definition should be an interface so we can implement
      it inside a **OracleDB**, Memory Access so we don't depend on a database, a non relational database, and so on.
    • So we can have the a single port, being implemented by multiple adapters 

  ● Adapters: Continuing our hexagon example, we know that the hexagon consist of our app that contains the use cases and
  the entities, and the adapters that "glue" and implement our interfaces (the way of fitting in). Each port have a different
  communication interface and implemented by their adapters.
    • Each of these elements, external to our app, are adapters and at any moment we can inject that dependency by instantiating
    a concrete adapter — A code that manipulates the oracle access or a code that will send e-mail via SendGrid through
    its API. And we inject through the dependency injection, that implementation inside the app.

### How do Use Cases communicate with the ports? 

  Inside a use case, we will say on its constructor that we depend on the port, like **EmailProvider** or **CollectionUser**,
  and these interfaces may have the required methods and inside the use case, we receive this interface/port and "someone"
  will have to give us an instance to use it.

### Examples of adapters use

  1. We may have a **TokenJWTAdapter** and this means that for "someone" to use it, we will
  need a **TokenProvider** or a concrete implementation that offers us an auth token.

  2. Suppose we have the necessity of having a data repository and we create one called `UserRepo` and inside of it we
  create an **UserOracleDBAdapter** that implements this interface and have all the functions for a `OracleDB` that are
  related to this interface. And we then create an interface and send it to the server. 
    . The application doesn't depend on this. It will access the data through the defined port/interface and we will
    reference these concrete instances after an interface defined by the App
    . Therefore, who said how the interface needs to be, was the app — It said that it has the necessity of accessing
    a collection of user and this interface needs to have all the necessary methods to handle the Users. And some interface
    will then implement the **Oracle DB Adapter** that will retrieve these information, read from the OracleDB and save
    inside of it.
    . Following the same example, we can have a **MongoDBAdapter** for non relational databases that implement the same
    interface, and other for an in memory database, and so on.
  
  • Therefore, we have now this possibility of creating interfaces, with the functions we desire from a given system, and
  access them through this adapter.

  . We can even create a mocked version and fake the, for example, legacy app, and we won't have the necessity of having
  a legacy app up and running for us to use it.

### Dependency Inversion

  Continuing the legacy app example, we can notice the benefits of the dependency inversion when we need a need a legacy
  app to work, and instead of depending directly on it, we invert the logic, create an interface and "someone" passes us
  an implementation of the given interface that meets this interface. 

  Or in the ports and adapters definition: "Someone passes us an adapter that implements a port defined in our application"

  This is the centre of the clean architecture, the letter D in Solid, and many times, considered one of the most relevant.
  Because it is the essence of the "cleaning" of these architectures, since we separate what is business in a way it is
  independent of what is outside of it. Including facilitating the tests




     

    



   


      
      
         

    


        

        








        




     