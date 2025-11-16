## Lesson 1 - Domain Modeling

• This lesson is more of a recap from the domain modeling course. Here are some scenarios worth exploring:

1 - We have a CPF rule that we have to validate its numbers. Where do we want to put it? VO, Entity, or Domain Service?
  - Suppose we have a user and he has a CPF, should the rule be inside the entity `Usuario`? But what if we have another
  `Fornecedor` entity that also can have a CPF?
  - It makes more sense to create a value object that represent the CPF and use the value object inside the entity, in a
  way it will already be consistent with no need for replicating that rule across all app.
2 - Assume we have a functionality that filters a list of `Usuario`s.
  - We could type part of the user's name and it will filter a list of the entity Usuario. Does it make sense to place
  this list filter inside a value object or the entity? No, since we are working with more than one entity, and inside
  the entity usuario we should put what is related to that single usuario itself.
  - When working with lists of entities, it makes more sense to create a domain service for it.

  ## Lesson 2 - Overview (Visão Geral)

• Use cases are also known as `Application Services` — we should not confuse it with domain services that are business rules
that aren't able to be placed inside vo and entities.
They have as a primary responsibility of dealing with the application flow, it will orchestrate the flow to make some
given change on the interface, such as changing an order, deleting something, etc. These flows coordinate and use our
domain modeling.

• **Why won't i implement the business rules inside the use cases?**
  - Because we already implemented these rules inside the domain model. Already created the vo, the entities, and the
  domain services
  - A use case will be responsible for integrating all these rules inside a context/flow of our application.

• A Use case is the intermediate between the domain model and the front end of the app, and there is an architectural
boundary on that communication. We have:

Front End | Use case | Domain Model

Multiple times these boundaries must be planned and we need to cautiously consider how we will establish their use:

  - How will we make our front end to access the use case?
  - How the use case accesses the domain model?
  - Will the domain model be accessed through the front end?

And the ideal scenario is that there don't exist a communication between the frontend and the model because this way, we
prevent a high dependency level between the parts.

• This boundary takes us back to the clean architecture "circle", where the front end is represented by the outer border
of the infrastructure, and web, the use cases is a more internal layer.
  
This means that this architectural limit between them, will, inside CA, generate another layer, that is the interface 
adapters layer, and they help us to establish the communication a between the front end and use case

This green layer is essentially used to create a certain independence between the layers, since if a use case is extremely
connected with the front end, we will end up having to implement things in the use case, which are a front-end demand.

Having the intermediate layer that makes these translations from the frameworks world to the business world, they 
will prevent us from placing: db details, framework details, api details, and so on. Which would start to contaminate
everything.

## Lesson 3 - Clean Architecture (Arquitetura Limpa) #01

Clean architectures are not opinionated, it don't tell us how we should model the application domain. 

Application services (flows/use cases) are the domain model direct clients. Meaning that inside a use case, we will
instantiate our entities that have our value objects and with them, utilize the domain services. This is all these
elements that compose the domain model are going to be used inside a use case.

The use case, more than calling the domain model so it won't need to implement these rules. It will also "indirectly"
have access to a DB and infrastructure via ports and adapters.

With this being said, we don't want our web layer to directly access our model, because the model is usually rich, rich
in behaviors, sometimes even only allowing the object to be instantiated from the class itself. 

• Imagine the scenario where we have a `Usuario` and it has a CPF (which cannot be invalid) and we don't allow an `Usuario`
to  have an invalid CPF. However, at the moment we are filling the form, we don't insert the whole CPF and we try to
put this data inside the user, try to save it and receive an error saying that the CPF is invalid. This would also be the
case for `nome`, `email`, `dataNascimento`, etc. This means that we don't want to negotiate our entity characteristics for
"loosening" the rules in a way it will allow having an invalid entity only to meet some necessity of front-end form. 
  . Therefore, when we mix everything, the chance of impact our model becomes very big, and we separate these layers, it
  becomes way easier to maintain the model as it should be.

We have many ways of firing a use case, it is controlled by who invokes them, the drivers, they can be tests, frontend,
back-end app, after a tempo/batch that runs time to time. They can be fired/called by multiple different elements.

## Lesson 4 - Clean Architecture (Arquitetura Limpa) #02

This idea basically consist of invoking a use case, and this use case, will fire/guiding the access to some infrastructure
resources.

Thinking of the outer most layer of the web, and the adapters layer, they serve to make the communication between the
business rules / application services (use cases) with the necessities related to framework and drivers.

For example, if we are going to access via a relational DB, we have a different form of transforming the model and the
use case necessities for a specific database. For example:

  . Our model isn't directly persisted in a database like it is inside the model, as a object
  . If it is a relational db, the return must be transformed in a register/tuple
  . If it is part of a NoSQL database, it will be transformed into a document that has **other** way of making  the same
  adaptation between the instantiated object with what we will use inside the framework.

We can think of the web as big I/O, because we will show information to the user, the user will have access to our
application data (output), and their information are coming through forms, clicks, and how we interact with them (input).
To prevent a large dependency scale with the standards defined in the web, we use the interface adapters exactly to
convert the data received to the model or the model to the UI.

• Some patterns are commonly used to present the interface

  . Controllers - To control our flows
  . Presenter - How to **present** the data, assume we have a use case to get the user that just logged in or obtain the
  last sale executed inside the website, and we want to get this sale and show it in a key/value manner to show in the
  web or transform it in an XML format to send to a legacy system.
    - The way of obtaining that model object, and transforming it to xml, for presenting in a value object way, are
    different ways of representing.

## Lesson 5 - Business vs Infra (Negócio vs infra)

We can make an exercise an think of different scenarios

1 - Database rules are mixed with infra rules: This is one of the worse scenarios, because any technology/infra change
will directly impact the business itself. Meaning that they shouldn't walk side by side.

2 - Business class almost 100% pure, but with some direct access to the infra: Assume we have a case where sometimes
we end up calling a DAO (Data Access Object). The problem in this scenario is, the DAO may access the database and that
database is directly accessed in this scenario, since we have an explicit call for the DAO. Which may lead lead to problems
during testing since we will try to access a business code, but at the middle it calls the DB, and is not 100% sure it
will work all the time.

3 - Scenario proposed by the CA, a scenario where there is no mix between infra and business: The data access is made
via the business point of view, the business have the necessity of saving the information and we have different concrete
strategies of saving them in different places. Which do not have to do with the business, it only wants to save and retrieve
the data after some given information. Here is where a port and an adapter work                                                                

## Lesson 6 - Default Layers (Camadas padrões)

Assume we have three layers, from the outermost to the innermost

1 - Adapters - Controllers, Presenters, Gateways, DTO (Data Transfer Object, Facades) 
2 - Use cases - Application Services, Repository, Cmd, ...
3 - Model - Value objects, entities, domain services, events

