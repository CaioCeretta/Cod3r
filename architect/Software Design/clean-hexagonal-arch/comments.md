● Lesson 1 - ArchitecturOverview

  ○ What is an architecture? 

    ■ Th`architecture is the "skeleton" of the app, just like a building skeleton, with its columns and the floors.
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
  
● Lesson 2 - What is architecture? #01

  ○ Architectural, Design and Code problems

    ■ In general, the word "architecture" is used in the context of something on a higher level it is independent of the
    lower level details, while "design" often seems to suggest structures and decisions to lower levels 
      □ Design has a "minor influence" than the architecture, yet it is still relevant inside a given module, taking a
      design decision of using ports and adapters, for example, it is an important decision that will guide the way
      we code
    
    ■ The primary architecture objective is to minimize necessary human resources to build and maintain a given system.
      □ It has the objective of serving to a determined purpose

  ○ Architecture Overview and Objectives

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

● Lesson 3 - What is architecture? Who depends on whom? 

  ○ Architecture -> Design -> Code. However, this doesn't mean that the code isn't important

    ■ Code is the less critic level, but it isn't less important, since that without code nothing works.

      □ We may have a perfect architecture, with no flaws, that thinks about multiple design patterns to apply to the
      application, but we obviously need to "raise the walls" so a building can be functional.

      □ However, its decisions can be exchanged in a way more simple manner than architectural/design decisions.

  ○ Of what consists an architecture?

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

● Lesson 4 - Clean architecture: Concepts and Contexts

  ○ Entities

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

  ○ So should i completely base myself on a specific one? 

    ■ Is important for us to have the care of getting these concepts and be able to understand the context where this
    concept was defined and understand the whole

    ■ What is a controller, what is an entity, what is a use case, they are all concepts that are these blocks of construction
    of their idea of clean architecture and it is extremely important that we understand the concept and know how to
    interpret the architecture as a whole.

    ■ Therefore, we understand that the concept must be understood inside a context because the same context can talk
    about different thing and this bad understanding can compromise the understanding of the whole.

● Lesson 5 - Clean Architecture #01


    
     
      
  

      




    


    

      
         

                            
  

