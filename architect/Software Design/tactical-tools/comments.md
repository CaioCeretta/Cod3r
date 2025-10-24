
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

● Lesson 6 - Where to implement the rules? 

  ○ When we deciding whether to use the anemic model or rich model, we are directly talking about the domain modeling
  inside a bounded context. And when we think of domain modelings, we think on the objects that represent the model within
  that bounded context.

    ■ Examples of these objects are: Course, VideoClass, ArticleLesson, Attachment, User. They belong to the educational
    bounded context, only the user is belongs to the auth.
    
  ○ Now that we already "zoomed out" and saw the domain as a whole, explained the subdomains of a domain, its types, and
  so on. We are going to zoom in on the Course bounded context, and understand ow it works.

    ■ First question could be: "Does the model represents our application data?"
      □ Yes, the data will be reflected inside a model, but not only the data, but also its behaviors. 
      □ And the instructor will be focused on bringing this rich approach to the app and incorporate data and behaviors
      inside the model.
      □ Since the reference of most programmers is the anemic model, having this alternative is extremely important for
      a more mature programmer and this strategy can fit very well in many projects. This happens, because the basis of
      the OOP is combining both. But many times we violate OOP rules when we "rip off" the behaviors of objects.

    ■ Now, zooming in inside a course we will see that its attributes are: name, description, dataPub, classes, professors,
    duration, level, themes, and tests.
      □ If we get a very simple example to understand how do we start bringing this idea of richness to our model. We
      could simply get the `name`, and get a `Course` that is a very typical and clear object of an EAD platform, and
      we specifically want to get its name to understand how we can bring a rich behavior or ensure that a course name
      is consistent.
        - We want a course name to have three implemented rules
          1. At least 3 characters
          2. Up to 120 characters 
          3. Special characters are forbidden
        - We may think that these 3 rules are too simple, and to make the validation we just have to add ifs and it is
        done, something as, if(nome.length > 3 && nome.length <= 120) and some simple regex to verify the special chars.
        - This problem is silly and the programmer can be very excited thinking that this is a "piece of cake" and he can
        do it in a very simple way, and then we ask the programmer: "Ok, where do i place this validations?¨
        - At first sight, we may think: "Oh, in the class of course, since all the attributes are inside of it and i learned
        that behaviors must be close to the data they belong to.
          - This is an alternative but there are some things to discuss
        - Back to the question, he then answers to whomever asked: "I will place it inside the Course class, since it is
        the owner of its name, it makes sense if i check if it meets all the requirements". Then he implements it in
        the constructor, ensures that everything is correct and the validation will work
        - However, we also have the same validation for an ArticleLesson name, and to a VideoClass name, and the programmer
        will think: "Should i replicate the code? Should i create an utility class to make this validation?"
        - When we think of replicating a rule, we violate the DRY (Don't Repeat Yourself) principle, that says to never
        replicate or express something more than once, a business rule of our app.
        - The BEST solution is going to be introduced in the next lesson

● Lesson 7 - Object of Value

  ○ We will talk about the exact location for placing the business rules.

    ■ This tool is the primary location where we will try to place a business rules in. If we don't succeed, we will try
    putting it inside an entity, and if it also don't work, on the third tactical tool that is the domain service.

      □ Inside these 3 tools: #1 Object of Value, #2 Entity, #3 Domain service, we have the basis of rich modeling.

    ■ Back to the Course object, when we have primitive types, such as numbers, string, boolean. Multiple developers
    utilize the basic/primitive types of the languages to type attributes.
      □ Let's say we want to change these primitive types to something else. such as an object. But what object would it
      be? An object of value
      □ When changing to an object of value, such as changing a name: string to a name: SimpleName, at first glance, it
      will look that nothing changed, however, this changes a lot our modeling. But why?
      -  When we replaces a string for a SimpleName, inside a course, this SimpleName may have a set of validations embedded
      in it. It can ensure the minimum length, the maximum, that certain characters won´t be present inside this SimpleName.
      When we have a SimpleText, which would be description, we also may have a set of rules. The duration attribute that
      was simply a number, we can change it to a `Duracao` object, we can convert this Duration to hours:minutes or just
      to milliseconds, hours, minutes, subtract durations, sum durations, and more. This mean that we can define a set
      of operations and apply rich behaviors from the exchange of primitive types to objects.
      - Even if string is a primitive type, it has behaviors and indeed is an object. The fact is that it is a basic type
      of the language. We are replacing it with a specific type of our business like typing a name as an object SimpleName
        - SimpleName will have attributes and behaviors, meaning that we can put inside of it, a set of behaviors that
        addresses the business needs.
        - We can also ensure that a variable typed as SimpleName can only be created if it is on a consistent state. If
        all the business rules satisfied. This is very important because it ends up bringing a consistency to our whole
        object. Since that it will verify if the SimpleName, SimpleText, Duration satisfies the conditions of each one
        of them. It will make the whole Course object more precise.
        - Using a real example, the published attribute is a boolean, and classes are an array of Class[]. However, we
        can create a logic inside this rich object, so a course must have lessons to be published. Therefore, there will
        be a rule to check if those two attributes match.
      
      □ Therefore, the object will always be valid, and we can have the architectural choice of allowing the SimpleName
      to be inconsistent for a while or we can choose that it will always be valid.

        . "But what if the SimpleName is invalid for a while?". We can simply throw an exception, stop the flow, and make
        our application to treat that error in some place. Or we could also make this kind of validation to be "lazy" and
        create some strategies to execute these flows even if there are invalid data.
        . Everything depends on the strategy put on these behaviors in practice   


      □ If, for example, we define a date attribute with a `PastDate` object of value type, it could have a check for this
      Date to be at least before the date being inserted, which would cause an exception in case the user tries to insert
      a date after the current date

    ■ The primary point is that an object ceases to be a mere data holder (data storage) and becomes to express a domain
      rule. "A course can only be published if it has classes". This mean that the validation logic is inside the object
      itself, and not spread in other places. It represents an abstract concept that does not have a unique identity, which
      means that it does not have an ID, and it is defined only after it properties. He is normally immutable and can be
      compared with other objects and values based on its attributes.
        . An object of value can have one or more attributes, such as an Address, it has a street, a number, and more.
        And we can compare one with other after this set of attributes. 

      □ The most important to understand is if, let's say we are going to create an Address and it has an ID, meaning that
      if if we compare the identity of two objects after their unique ID, means that it they aren't a object of value.
      
    ■ Therefore,  an object of value is an object that encapsulates one or more values, and in addition to store one single
    value, or multiple values. It will have all the rich behaviors to use the data that is inside the object of value.
      We bring a high level of expressivity to our application.

  

    ■ More expressive examples:

      □ 1.

      ```ts
        const course = new Course(...) 

        /* Since in an object of value we can insert multiple rich behaviors in it, every single one of this behaviors
        are made inside the object of value itself, so for example, the duration attribute, since it is of the Duration
        custom type, this type will include a method, to process and transform and return this duration formatted in
        hours:minutes:seconds. This behaviors of formatting and returning back on the desire way, they don't exist by
        default in the language. But we can implement them on that new property type */

        console.log(course.name.fullName); // Which would be a function defined in the SimpleName of getting the fullName
        console.log(course.description.partial(20)) // Retrieve the first 20 words/letters of the description    
        console.log(course.duration.inHMS) // Processes and format into hour, minutes and seconds

      ```

    □ Other examples of an value object would be:
      - Cpf
      - Phone
      - HashPassword
      - PastDate
      - Id
      - Email
      - StrongPassword
      - PersonName
      - Price

      ```ts
        // Other examples

        console.log(student.phone.ddd)
        console.log(student.cpf.region) // The last four digits of our 'CPFs' are the region where it was issued
        console.log(user.email.domain) 
        console.log(course.description.short) // Define a pattern of what is short and what is long. And we wouldn't have
        // to worry about calculating it on every single place
        console.log(student.name.initials) // Let's use a avatar as an example, we could use it to replace the image in
        // case there is none
      ```
    
    □ 2. Real world example: Comments about the instructor code

      . The class auth/Usuario.ts/senha has an attribute `senha` typed as `SenhaHash | null`, SenhaHash is can be null
      because it is an object of value that will only be available during the login, when a user is retrieved, we don't
      want SenhaHash to be "traveling across the app", so most of the time, the user senha will be null, which is important
      since the password won't be exposed (Even if it is encrypted, is not good that this password leaks to other places
      and this would be a security failure)
        - Inside a User object, the instructor won't worry with validating the person's name, their email, of if it is
        indeed a hashed password. Because if we pass a "normal" password that is not a hashed password, the property
        itself won´t allow an user to be created, it is REQUIRED to store only hashed password because our mechanism
        of persistence won't allow.

        - If we get, for example, the use case of registering an user, we also use objects of value in this case, we create
        the name constant after a method, the email, and a new strong password. By creating a strong password, we are
        ensuring the business rules of how a strong password should be.
          - This way, inside use cases, we do not need to implement new rules. Simply call rules that are already set
          inside the objects of value.  

      - Having this knowledge will start changing the way we think of our applications because we start placing the rules
      in only one place, e.g. we are creating the name constant after the NamePessoa method, and this method is being used
      before creating the user. We are using the rule inside the use case and we also could call this rule directly
      within the User.
        - Inside our User we only store hash passwords, and in the use case we create a strong password to ensure that
        the user login was indeed a password that meet all the requirements to be a strong password. 

● Lesson 8 - Entities

  ○ Entities are the second most important tactical tool. And those entities are usually anemic.

    ■ However, we would like them to be rich. In addition to add the rules inside the objects of value — what already
    "frees" us from having to implement the rules inside the entities.

    ■  Eventually there are rules that are going to work with more than one attribute at once, e.g. A Course can't be
    published if its duration is 0, or  can't be published if don´t have any rule, if it hasn't at least 45 minutes
    available, etc.
      □ Sometimes we can't put these rules inside an object of value. Which would take us back to the explanation that
      objects of value are number of one place, but if we can't "fit" these rules inside one, it is probably because this
      is an entity rule. The same rule applies to the domain services.

  ○ An entity is an object that we care about its uniqueness, and we want to identify these objects through their id.

    ■ For example:

    ```ts
      class Entity {
        id: Id
      }

      class Course extends Entity {}
      class Lesson extends Entity {}
      class Progress extends Entity {}
    ```

      □ We can create a base class, that has an Id, and after it, we create an heritage ensuring that this id will be
      passed down as inheritance for the children classes.

    ■ To exemplify this, the instructor's project, where he has a common package to hold the code that is common to all
    packages, an Entity class, which is an abstract class, with two attributes, id and props, and these class have methods
    to compare the equity between entities after their id.
      □ Two objects will be the same if they have the same id.
      □ Ensuring the uniqueness of an entity, can be made through the id comparison

      □ In case we have two objects with the same id, but with different values, it would need the developer to determine
      which one is the more recent. And one thing we can do to certify if this comparison is on the id and on its values
      is by creating a deep comparison.

      □ Therefore, the id is the criteria of comparison every time that we value the uniqueness of an object and we
      can't replace an object with another if it has the same values, the ID must be unique

  ○ Examples of entity would be

    ■ Course, Lesson, User, Attachment, Discussion, Progress, Tutor, Post, Certificate
  
    ■ By looking, we can see that each one of these are entities, we value its uniqueness, each one will have an ID to
    differentiate them, and more. However, when we think on a set of objects, like 'a course has a set of lessons', and
    if a course has a set of lessons we want to persist them inside one transaction, it would be part of the aggregate
    concept. 
      □ In aggregate functions, most of the times we have the root of the aggregate that in this case is the Course, meaning
      that in an aggregate of a Course with Lessons, Course would be the root of the aggregate, because after the course
      is where we persist all the other data related to it

  ○ So in Summary, what is an entity? 

    ■ An entity is a singular thing and can be continuously modified for a long period of time. These updates can be so
    extensive that the object may look way different from what it was before. But is the same object by identity.

● Lesson 9 - Domain Services

  ○ We should´nt confuse domain service with application service. Application service is our use case, it is intended
  to orchestrate the application flow, and the domain service has the purpose of implementing a business rule.

    ■ Domain service does not work with database transactions, nor I/Os, or asynchronous processes. They can be a simple
    rule, a simple calculus, an implementation of a basic rule inside an structure/class.

      □ Then we have to go back to the tiers of importance, if we tried to implement this rule inside an object of value
      but wasn't able, we try to implement it on an entity, if it also does not work, we create service domain to implement
      this rule.
    
    ■ The fact that it has service in its name, doesn't mean we should confound it something "heavy", or something that
    involves an interaction with I/Os or database. It is basically a business rule that didn't fit an object of value
    nor an entity.

    ■ And this is the rule that the developer on the first example would make, he would ask himself
      "Ok, i faced a rule that is not an object of value, nor an entity, so what should i do with it?"

    ■ The creation of a domain service usually happens when:
      - Or we have a rule that use non related objects
      - We have a rule that will deal with a list of objects

    ■ Example 1:

      ```ts
        export default class FilterCategories { 

          constructor(private cats: Category[]) {
            return this.cats.reduce((filtered, cat) => {
              //...
            }, [])
          }
        } 
      ``` 

      □ Let's use an example of a financial manager, and it has many categories, such as a category food that has subcategories
      like: Sandwiches, Bakery, Restaurant, and so on. 
        . When we write anything on the search box, such as en, it will show energy, presents, supplements...
      
      □ This would be a domain service, we have a FilterCategories class, that receives a list of categories, and a search
      we want to do on top of these categories
        . And inside its reduce, we will make sure that we return only the categories that have part of their name as
        the typed text.
      
      □ The question is that "energy" is a subcategory of "house¨, but we can't remove house from the result list.

      □ Basically what is being done is ensuring that the "filtrar" method is inside a domain service. This is a domain
      service, because if we stop to think, we can't fit it inside the category, since the category is only one object
      and not a list of objects.

    ■ Example 2:

      ```ts
        export default class CreateCourseProgress {
          constructor(readonly course: Course) {}

          new(): CourseProgress {
            return this.create
          }

          synchronizedWith(currentProgress: CourseProgress): CourseProgress {
            return this.create(currentProgress)
          }

          private create() {
            ...
          }

        }
      ```

      □ We basically receive a course as parameter of the constructor of this domain service, and it can both create a new
      progress after this course as well as synchronize an existing progress so it can update this progress based on the
      modifications that happened inside this course.

        . For example, some classes may be added to a course 
        . classes was deleted

        . Therefore, we need to ensure that the progress of the course is in sync with the latest version of the published
        course
    
    ■ Example 3:

      □ Sometimes we want to extract a given rule, because the object was getting too big, and we can also create domain
      services for this

● Lesson 10 - From the inside out

  ○ This lesson will be focused on the quote "To attack the complexity from inside out is the best path".

    ■ This takes us back to the DDD cover subtitle: "Tackling the complexity in the Heart of the Software".
      □ Therefore, if we can implement something within a business rule of our app, we should´nt leave the opportunity
      of implementing in the core to spread these rules at our most external layers, this will end up violating multiple
      principles and it would make harder for us to maintain the app.

      □ So if we have an object, and this object has attributes, and we place the behavior close to the attributes, it
      will make the correct code in the right place which will lead to easier maintenances.

      □ The frameworks are on the outer layer, and because of this, we must remember to protect our projects from the
      framework. The innermost layer, the domain layer, should be our priority when implementing business rules.

  ○ In OOP, everything is in center of our application

    ■ Thinking on a diagram, let's say that we have a large circle representing the use cases, and inside that circle
    we have a smaller one representing the model. It is inside the model where we will implement our objects of value,
    entities and services domain. By leaving the heart of the app and go "up" to the next layer, we will reach the
    "use cases" layer, which is the application layer.

      □ It is within the use cases, that we'll apply most of the principles of OOP. When we dive into this layer, we'see
      see that application services are mainly responsible for integrating these flows with the app's infrastructure — such
      as databases, e-mail services, whatsapp, or any other external tool that need to be connect.

      □ This is different from the domain services, which are focused on implementing the business rules and logic of the
      app.

    ■ Traditional Layer Pattern

      Presentation -> Business Rules (Use cases and model) -> infrastructure

      □ By thinking of business rules in this layers pattern, we have the model, that is our classes, objects of value,
      entities, domain services and the use cases that are the flows  that are going to interact with the infrastructure.
        . In this traditional layer model, the way we interact between our rules (mainly the use cases), with the infra,
        is direct. The rules depend of the infra to work. This pattern is a more traditional pattern used in legacy
        applications, but we can change it to use an approach more modern, inverting this layers logic, and make that
        our business rules no longer depend of the graphical interfaces, neither of the infrastructure, that is the
        hexagonal architecture.
      
      □ Hexagonal architectures / Dependency Inversion

        . Hexagonal architectures use a concept named "dependency inversion", in this principle, it's no longer our
        business rules that depend on the infrastructure — it's the infrastructure that depends on our rules. And when
        we think of business rules of our app, we continue talking about our models and flows. 

        . If we notice in the diagrams, there isn't anymore arrows saying that the rules depend on the use cases, or the
        rules depend on the infrastructure, now we have arrows leaving the presentation and going to the rules, meaning
        that there is a dependency of the presentation to call the rules, as well as the infra need to call the rules to
        provide the access to it. This all concerns the dependency injection principle

        . Inside `DI`, we can add an additional layer, in between the existing two, to protect the communication between
        the business layer and the presentation/infra by creating an adapters layer.    

        . This way of organizing the layers is exactly the same as the one presented in the Clean Architecture book, with
        the difference that in the book it is represented as concentric circles — four circles going from the business
        rules (the inner two), to the interface/adaptation layer and then the infrastructure/frameworks layer.

        . In the business rules layer, we have all our objects of value, entities, domain services, and they have its
        complexity to implement them, but when desire to show these objects on the GUI, most of the times we want a
        simpler object, and for this, we convert something more complex to a DTO (Data Transfer Object).
          - And the same happens on the other way around, when we receive simpler data, such as in forms, we convert this
          data to call the inner model objects. And when calling the models objects, we will convert back.
          - This layer helps to create a decoupling/independence between the rules and the presentation.

      □ This circle diagram, even though it may seem simple, it explicitly defines the main role of a programmer
        - This is because the main role is to protect the business rules we are developing. Be it on a personal application,
        or on the company we work. When separate or protect the business rules, from external influences — frameworks and
        infrastructure. We are able to evolve the rules according to the business, and not "forced" by infrastructure
        changes.
        - This is so important for the clean architecture, that a layer was created just to protect and avoid contamination
        from the other external layers.
        . Therefore, if someone asks what is the main objective, and primarily of an architect, is to protect the app from
        undesired changes. 

● Lesson 11: Use Cases

  ○ Use cases describe the events flow of how a system should behave. They are used too describe the interactions between
  users and the system. As well as providing a general overview of the system and its functionalities.

    ■ For example, an admin user will have a set of specific use cases for an admin, and whichever role there may be.
      □ Not only fixed users of our application, like a human being that is using the app, but another system can interact
      with it through use cases.
    ■ And the use cases can also show us the available functionalities of an app

  ○ Example of flows:

    ■ Example No 1 - Frontend triggers a backend call: it interacts with the back that interacts with a use case that
    interacts with the domain model

      □ In this example, let's say an user clicked on a button and it triggers the data sending to the server, which then
      calls the use case, which calls the domain model

      □ If we use typescript across all the four steps of this flow, we can easily imagine that both the use cases and the
      domain model that have to do with our rules, does not belong to the backend.

    ■ Example No 2 - Timer calls the backend:  The timer from time to time calls a given URL in the backend API, which then
    calls the use case, which calls the domain model

    ■ Example No 3 - Front end calls the use case directly: Directly from the frontend we call an use case, which is possible
    because a use case does not belong to our app's backend, but to the business rules. So if we organize it well, using
    the same programming language in the front/back/use-cases ,  it will be easy to use them inside our app

  ○ Rules do not belong the backend

    ■ By looking into a running app, we will notice that the rules are located at the bounded contexts, and we will see
    that the `educational`, `authentication`, `forum` rules are separate from the back/front/mobile of the app 

      □ These belong to the outermost layer, including the adapters tool, is also inside a bounded context
      □ Therefore, when using the same language it will become easier to reuse it and could simply after our presentation
      apps, such as the front or the mobile, to directly call an use case, without, for example, having to interact with
      the database, or any infrastructure service.

  ○ So who do the services application belong to? 

    ■ The application services are the direct client of our domain model, when calling a use case, the use case calls
    the domain model, we can see it by the registerUser use case
      □ Inside this use case we are using objects of our domain value — the objects of value, our entities and eventually
      the domain services.
    
    ■ This also mean that by implementing rules of domain inside its own place, this does not make sense to also implement
    them inside the use cases
      □ A use case is not the correct place, it is the place that we will orchestrate and define how the flow will work
      and essentially integrate these flows with the infra services
 
● Organization Examples

  ○ Market pattern

    ■ There is a pattern in the market, that alongside with a model, such as `Curso`, to have a `CursoService`, where these
    services access objects that are anemic, and we may implement inside those files a set of business rule or implementing
    a set of use cases.
      □ The fact is that by looking at the structure in which we organized our code, someone can ask: "Which are the use
      cases that are available inside this file related to Curso?" 
        - We may look and do not have any visibility of what is happening since probably this class makes much more than
        it should do.
    ■ When we structure an application around use cases, we end up having a structure like

      curso
        model/
        usecases/
          AddLesson.ts
          HideLesson.ts
          DeleteLesson.ts
          PublishLesson.ts
          MoveLessonDown.ts
          MoveLessonUp.ts
          SaveCourse.ts

      
      □ When we structure like this, we have a model folder and a separate folder for all usecases. Within this structure
      we can easily identify each use case, it will make the code easier to find and be able to answer that question w/o
      looking inside. 

    ■ The logic stays inside the entity/object of value/domain service, and not inside the use cases.

      □ The use case makes use of these objects, where the rules are already applied. And the use case won't need to
      reimplement them. For example:

        ```ts
          export default class MoveLesson extends UseCaseAdmin<Input, Course>{
            executeAsAdmin(input: Input): Promise<Course> {
              return input.course.moveLesson(input.idLesson, input.delta)
            }
          }
        ```

      - In this example, we have a MoveLesson use case, which extends an UseCaseAdmin class, which has the generics of
      Input and a Course.
      - It then has a function executeAsAdmin, which receives an input as parameter and will return a Promise of a Course
      - Then, with this input it receive, it contains a course, that in turn is a rich model with a moveLesson method
      - This method needs to receive the id of the lesson and the delta.
  
    □ This basically says that the use case doesn't need to worry with implementing nothing to complicated, since that
    moveLesson method already was defined inside the entity

  ■ If we look to a program screen, that has a window written with New Course, the inputs with information concerning
  that course, such as the lessons, its name, its level, its instructors and a save button. We may ask: "Which are
  the use cases that will be triggered by this UI?"

    □ Even though we may think: "Oh, i think its the use case of saving a course". However, if we stop to look, we will
      have: AddLesson, HideLesson, PublishLesson, MoveLessonUp, MoveLessonDown, SaveCourse, in other words, every use
      case informed above.
    □ Most of these flows can be called directly from the front-end, MoveUp, MoveDown, Delete, and others, they don't
    need to interact with the backend, because the use cases do not have to do with any language, but the business, and
    the way we are going to do this is up to us.
    □ If we keep thinking as a "CRUD", only with Saving, Delete, Update, Get, and only imagine that the use cases are from
    that type, we will lose the opportunity of implementing a set of important rules that do not belong to the UI, but
    to the rules of our app and we can test them, putting them inside a rich model, and use it in a simple and a direct
    way trough our UIs.

    □ Each button can fire a different use case, we can have different buttons pointing to different use cases, such as
    an upload image use case, as well as saving the course as a whole — which will interact with the database, and with
    the database

    □ But in short, we see how we can structure a simple screen into multiple different use cases. Use cases that interact
    with the backend/database and use cases that will directly interact with the front end. This means that we should stop
    thinking only of single flows as CRUDs, and think in other possibilities where we can structure a simple screen as the
    course registration UI calling different use case

    □ And this approach will make it easier to test the use cases, have a large test coverage independent of GUI, or DB
    and we can have a more explicit structure with which functionalities are available.
    
  ■ If the use cases do not belong to the front-end, nor the back-end, where should they go? 

    □ The answer is "none of these two places". Although we could place them inside the backend, which is done by multiple
    developers. In the instructor's opinion the business rules don´t belong to the back-end, but can be used through the
    backend. 
    □ At the end of the day, both the frontend is able to access the rules, as the back end. This is because the use cases
    and the model belong to our application rules and not to the technologies that are located on the outermost layers
    of the app. 
    □ This centralization, makes the front, back, and mobile to communicate with the same rules with no changes. And one
    app can call their concerning use case.





      




    


  

      
        
      
