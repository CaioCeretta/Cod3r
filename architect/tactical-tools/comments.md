
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
    business itself,


      
        
      
