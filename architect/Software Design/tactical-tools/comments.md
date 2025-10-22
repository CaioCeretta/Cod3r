
● Lesson 1 - Introduction

  ○ As well as the strategic tools, we are going to see multiple tactical tools that are in the DDD book: entities, object
  of value, domain services, application services, repositories, DTOs, facades, project patterns, hexagonal architectures,
  among others. All these are tactical tools that will help us on developing our apps.

    ■ The idea is to focus on tactical ideas that will bring a "timeless character" to our app. And by timeless we are
    saying that it is an app that may resist to the time, an app that may have protection to the frameworks and libraries
    that change all the time, but our project be protected of these external changes.

● Lesson 2 - Strategic Tools - Review 

  ○ Subdomain Types: 

    ■ Basic and Support flows have already been covered on previous courses. However, here is one addition to the generic
    subdomains

      □ Generic subdomains usually are the part of the business that the company will delegate it to another company because
      she understands that in that specific part something that already exists in the market already meet its requirements
      perfectly because there is nothing special or different inside of it that justify implementing it ourselves.
        . If we intend to implement these flows inside the company, even if it is exactly equal to what already exist,
         it will pass from a generic subdomain to a support subdomain.
        . It is only generic when we don't implement the flows locally in the company.

        
● Lesson 3 - Domain Model

  ○ Every bounded has a model (data), and use cases (flows). Depending on the level of complexity of the project we are
  on, a bounded context can be managed from a specific team, can have specific development cycle, because when we there
  is a more complex or bigger application, dividing it into bounded contexts make sense, since they often map the subdomain,
  which is the nature of the business we are trying to solve.
    ■ There is also a law that says that when an organization designs a solution she will end up producing a communication
    structure very similar to the one that happens inside the company.
      □ This means that this communication will influence on the way the software is developed
      □ If we have a good communication inside the company in which we are working on and trying to solve an issue, to
      transfer this communication pattern into the app may be something positive, however everything depends on how the
      company is organized in subdomains and their relationship so we can eventually replicate this in a healthy way
      inside our software.
      □ In case if there is a confused communication this may "harm" the way we develop the application

    ■ Looking at a bounded context, we can notice that it may be big enough to create a project, but first, let's dive
    into our model and application data
      □ By taking a closer look into the model, we are probably going to use the OOP (Object Oriented Programming), there
      is no problem in using a functional programming and a language that is not even object oriented, but we will prioritize
      this paradigm to bring the concepts, patterns, architectural modeling on top of these paradigms. 
      □ This paradigm, is extremely important and very used on the market. Even if we don't directly work with OOP, what
      will be approached in here, will also be relevant in other paradigms. 


    ■ An object is made of attributes and behaviors

      □ It is known that an object is a structure, a capsule, that is made of attributes and behaviors, and inside this
      structure, we place attributes and behaviors, and these flows, in turn, usually have a, in most times, special access 
      to these internal attributes and are able to manipulate the attributes of a certain object.

      □ Let's suppose we have a vehicle 'fusca', and ask ourselves what are its attributes and behaviors?
        . If we stop to think, we will end up in the following conclusion when we thinking on the attributes:
          - A car has some attributes, which some of them are public, like the brand, model, currentVelocity, maxVelocity,
          weight, dimensions, and more. And many of these characteristics are public attributes of that car.
          - We also have some private attributes, like the engine's rpm, engine's temperature, battery voltage, and others.
          Which are private characteristics inside that car.
          - Therefore, we have different visibilities when thinking of attributes of a given object.
        . As well for the behaviors inside that car:
          - We have behaviors, such as turn on, turn off, accelerate, brake, and more. All of these are public behaviors
           that are available inside of a car,
          - For the private behaviors, we have releaseFuel(), startElectronicIgnition(), and others.

    ■ But the question is: Why do when we go into a corporate application, we decide to simply remove the behaviors from
    our model?

      □ In a model, we can essentially think that its basis is the OOP, and when we think about attributes and behaviors
      in simple examples, such as a car, we can easily find the basic attributes (both public and private). However, when
      thinking on our applications, we as programmers, simply say something like: "Forget the behaviors and keep only the
      data".
      □ This means that many programmers, are "robbing the objects", leaving only the attributes and completely taking off
      the object's behaviors. Which mean that the objects that represent the models inside the bounded contexts, should
      have the behaviors that represent the business rules of the domain.

      □ If we take a look on the data that represent of a given bounded context, we will find something as

        ```ts
          class Course {
            name: string
            description: string
            classes: Classes[],
            duration: number
            published: boolean
          }
        ```

        . And where are its behaviors? Will our objects be only data? Should objects only contain attributes and not methods
        as well? Don´t this violate a basic principle of POO that says that an object is the coupling of attributes and
        behaviors? 

● Lesson 4 - Anemic models vs Rich models

  ○ There was an article written a few years ago, that the author created a term called Anemic Models vs Rich Models

    ■ We can say that a rich model, is the rescue of OOP bringing behaviors back into our models. We are talking about
    the domain modeling we will apply inside our bounded context, and they are our data, which should have behaviors and
    these behaviors are the business rules of our application.
      □ The question is: "Why do we create anemic models? Classes that have only attributes, and if they have methods, are
      simply getters and setters?". Since getters and setters don't do anything different than enabling the access to
      private attributes. Making an attribute as private, and simply create multiple methods to access these attributes,
      don't add nothing of value within our model.

      □ One problem we have is simply that people end up focusing all its energies inside the domain modeling, aiming to
      make these model mapping into the database. However, There is a tendency that developers focus on data, instead of
      the domain. This can happen because of the prevailing approaches to the software development that place importance
      on the database. Instead of projecting domain concepts with rich behaviors, we essentially think in data's attributes
      (columns) and associations (foreign keys).
        . Focusing in the database data is not the same as focusing on the domain, because the domain has to do with the
        flows, rules, and the data inside the business. These data have rules, which are described by the domain, and
        we want to model the domain in a OOP manner, and we end up only on focusing on grabbing the model and mapping
        the data so they can go to the database.
        . And since we put a great importance on the database, multiple developers place a bigger importance on the db.
          The DB is essential, however we don't need to start our application after it, we don't have to focus on mapping
          our domain objects, so they are used to map to the database.

      □ With this being said, Our domain must not be focused on the database. We should always focus on the domain and
      how the business work. The model is a modeling of how the business work. It is like a sculpture of a person that
      we are trying to do exactly like the person is. 
        . And we will reflect on how do we get these data, rules, restrictions and think how do we combine everything,
        and model it in a OOP way?
          - This is exactly why the model exists, it doesn't have as priority focusing on the database. Because when we
          focus on the DB, we end up prioritizing issues like foreign keys, think only on attributes that map to a column,
          and we will simply end up leaving out the rich behaviors that could be implemented on the right place.
          - When we think on placing the right code in the right place, which including is the subtitle of the original
          DDD book "Tackling the complexity in the Heart of the Software". Is exactly this. Place the correct behavior
          close to the data it belongs to, since the closer we place the behavior to the data it operates on, better will
          be this relationship.
          - Therefore, we must always be cautious to not focus on the database and end up bringing an "anemia" to our model
          because we planned our model completely oriented to the database. This is not advised because in the end, it will
          not reflect how the business work.

    ■ But what is an anemic domain? 

      □ The basic symptom of an anemic model, is that, at first glance, it resembles the real model. There are objects, many
      of them named after the nouns from the domain space — We can think of this like some developer thinking "Ok, in the domain
      we have a customer, therefore, I must create a Customer class, or in the domain, we have a sale, and then I must create
      a Sale class" and this continues for every noun — there will be a Class for each making the code closely resemble the
      business itself. However, these objects are linked to the relationships and rich structures, this means that multiple
      times a client is related to Sales in the same way that in a business a client also has relationship with Sales, that
      are related to the suppliers. Therefore, we will end up having the same relationships and rich structures that the
      real domain models have.

      □ However, the problem will emerge when looking on the behaviors, where we will notice that there are no behaviors 
      inside these objects, turning them into sacs of getters and setters.

    ■ With this being said, what we don't want to have is exactly this anemic model, we want models that indeed reflect
    how the business functions. If the business work, by applying certain calculus to a given data inside that concept
    of the business. That calculus should be placed inside that class.  

    ■ Many applications work as follows:

      □ We simply have `somethingService` like `CourseService`, which is exactly the layer where we place our rules on.
      And inside of it, we have data like: `Courses`, `Sections`, `Lessons` and multiple other data that are anemic
      objects. Objects with no behaviors, only attributes.
      □ Since these objects don't have behaviors, we need to, inside of the `CursoService`, to ensure that the Course is
      valid, that the section is valid, that the lessons are consistent, and more. Therefore, we have to ensure the
      consistency of all the objects because they simply are a "sac of data".

● Lesson 5 - Architecture, Design and Code

  ○ Tactical Tools

    ■ When we think of three things: Architectural Definitions, Code Design Definitions, and Solutions that are going to
    directly influence the source code.

      □ And these decisions can be both a code decision, design decision as well as architectural. Thinking that the
      architecture is a higher level of decision, we have, basically: Architecture - Higher level of decision, Design - 
      Intermediate and in the code we have the most common decisions.

      □ Then we may think on these two questions:
        1. Does the code decisions directly influence the architecture?
        2. Does the architectural decisions directly influence the code?

      □ The answer is: The code must not influence, alter, or significantly, or at least in 99.9% of the cases, the
      code shouldn't impact the architecture. Unless we indeed have an architectural decision that was motivated by some
      aspect of the code, it led to the conclusion that a code wasn't working properly when faced with a certain problem
      that eventually will cause a significant impact, we may have understood that a change was necessary after a coding
      problem. However, what we need to understand is that the flow is always the bigger flow (architecture , impacts
      the design, which impacts the code), because the code is the lowest level of our app.
        . If we end up replacing a while loop with a for loop, or replace an if with an else if or switch, this should'nt
        cause any architectural impact in our application.
      
      □ When we think of tactical tools, we think of tools chosen to work with on practical moments and to directly
      impact our final code.

    ■ One other question that may emerge is: What is the difference between architecture and design? We understand that
    the code difference is very clear, Essentially when we start to code, create our functions, we start to think: "Ok,
    i want to create two functions" and then "Oh wait, is better if i create three", or "It is better if i break this
    three functions in seven, it will be easier if we need to reuse", or "this function will be private and i want to make
    this other one public", "oh, instead of creating multiple different functions i want to put them inside its own class".

      □ All of these questions are code decisions that we take all the time, things like changing the conditional check
      in our code, or our loop structure, or a variable name, and so on.

      □ When we think of the difference between architecture and design, we will notice these aspects:

        . Architecture Decisions: They are high level decisions, higher impact than the design ones.
        . Design Decisions: They are a lower level then architecture, lower impact comparing to architectural decisions
        but still more important the code decisions.

      □ One quotation of the clean architecture book says the following: 
        . "Design vs Architecture, in general, the word architecture is used in the context of something on a higher level
        independent of the details of lower levels, while "design", often seems to decide on lower levels decisions"
          - This means that when we have a decision that has a bigger impact, is more costly, and cover a bigger area
          of activity. Normally this kind of decision is an architectural decision. 
          - When we think of bounded contexts, we normally think of design and coding. Normally, the architectural questions,
          will not influence only one bounded context, but our application as a whole.

      □ There is very dubious question involving what is a design issue and what is an architectural issue. Exactly because
      of the cost. The architectural one is more expensive than a design one (Code is even smaller, since transforming
      one function in seven or seven in one, has a cost way smaller than taking a decision that will impact the whole
      app).

      □ Either way, we can think of some decisions that will impact the architecture as a whole, such as the choice of
      a relational DB and a non-relation DB. It will generate an impact, this impact can be mitigated by separating our
      code in layers, without contaminating our model with the DB — Which can reduce significantly the database change.
      But an example that we could mention of an important architectural decision, is for example, if we are going to
      work with anemic models (only data) or rich models (model where the object has behaviors). 

        - Everything that we are going to do inside our apps, these decisions have ups and downs. We are not saying that
        anemic models can't ever be used in any circumstances. Many times we have a business that is complex, and a model
        that justify the embedding of the behaviors inside the object, but many people are "conditioned" to write certain
        types of code — focusing only on attributes and forgetting behaviors.
        - What the instructor wants us to understand as programmers, is that we need to have the possibility of taking this
        architectural decision between one and the other, according to the necessities of the project. Who will which
        decision we will take, is the project itself. If we are working on a project that justify the use of the rich modeling
        strategy, we have to take the decisions based on it. If the project doesn't have many business rules, and it is
        justified to use the anemic model? We can also use it. But they are tools/decisions that we should take
        according to the necessities of the project.
        - Even if we are using rich models in parts of our app, multiple times, by dividing the app in layers, on the
        "border" of one layer to the other, we end up using anemic objects, such as `DTOs`. `DTO` is a pattern exactly
        like an anemic model, and it is often used to enable communication between layers through an object that does
        not have business rules. And it is very important for us as programmers, to understand when and how to use these
        two strategies.

 

    


  

      
        
      
