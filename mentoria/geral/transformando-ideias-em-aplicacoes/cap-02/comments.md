## Introduction: Mythical Man-Month Book

This book defends the idea that the second version of the system, is more likely to succeed. The first is often thrown
away, while the second one is for implementation and even for solving the errors of the first version.

Inside the book, the author discusses processes based on their personal experiences. The book's goal is to "rescue" the
use of object-oriented programming, spec9ally during the time (2006 ~ 2007), when many projects had essentially the same
structure, which became repetitive and too similar across different teams. The aim was to encourage a more thoughtful,
object-oriented approach to development, following the basic principles of the paradigm.

The book is essentially about the pillars of OOP (Object-Oriented Programming) and the basic principles and fundamentals
of the paradigm, which form the foundation of everything.

The first thing we do when developing something is to choose the language, as it will influence on how we program. For
example, if we have to choose between Python and Rust, we'll notice that each language has unique features that the other
one lacks, which will significantly impact our development approach.

Once we choose the language and the paradigm to follow, the next step is to establish communication with the person who
truly understands the system and its requirements.

When thinking about frameworks, we need to consider not just the technical aspects, such as the frameworks and libraries
that help with implementation but also our mindset and how we with the client. This helps us gather the necessary information
to define the application's requirement.

The strategic tools mentioned in the previous topic, are derived from the book, and are strongly linked to real world situations.
They are based on the business goals, rather than on technical jargon or patterns required by a framework. in essence, these
tools focus on understanding the business itself.

When we think about the `procedural paradigm` which involves writing procedures or functions that receive data and return
data, we tend to focus on the technology and code flow. The output from one function becomes the input for another, and so
on. This leads us to think in terms of code rather than business logic.

In contrast, when using an OOP approach, we first map real world objects and entities that have both data and behavior and
bring these into our application. By respecting the principles of the object orientation, we avoid the disjointed or inconsistent
implementations that often happen when developers use an OOP language but fail to adhere to its core principles.

When starting development, we first consider the paradigm that will guide our work. Once that's decided, it does not make
sense for us, to violate the core principles of that paradigm. For example, OOP is built around three pillars: encapsulation, heritage and polymorphism. If we make a decision that violates one of these principles, something is wrong, even if it's
common practice.

We have the freedom to make exceptions and break these principles in exceptional cases, but we should question our choices.
Just because everyone else is doing something in a particular way doesn't mean it's the right way. These decisions will
directly impact the time and effort it takes to turn our ideas into working code

## Domain

A company domain is the performance of its core activities that generate value, typically in the form of products or services
for the client. It involves data and the workflows.

Since we're working with DDD (Domain-Driven-Design), it means that the design is guided by the domain. When we think about
how to organize the architecture, it heavily depends on how we map the data and also the flows of the application.

We usually deal with "two kingdoms", the problem space, which is not related to technology or frameworks, but to the company
itself and how it handles data and workflows on a daily basis, to solve the needs of the client, suppliers, the government,
and others. Then there's the solution space which belongs to the people wo are going to build software to support these flows.

Let's use this example to talk about the problem domain:

We've been invited to develop a furniture financing system for `CEF (Caixa Economica Federal)`, and we'll classify its domains
and sub domains. One of the biggest mistakes when designing large systems, is trying to solve everything at once. This often
leads to tight coupling and unnecessary relationships. Unless we already have a running system with automated checks that
warn us when invalid dependency appear, this can become a serious issue.

Here's the problem we're trying to solve:

1. When someone applies for financing, they initiate a request domain. This request domain is the entry point and includes multiple
   steps. Depending on what is being request, some parts of the process might be optional.

2. For example, let's say i want to finance a house, and like many people, i might be anxious and prefer to go straight
   to 'Caixa', show my income statements, and have a pre-approved credit, before i even start looking for a house just to
   know how much i can finance.

3. In some cases, a client applies for a credit certificate without even visiting any properties. This certificate remains
   valid for three months, allowing them to purchase a property during that time.

So we start with a request domain which assumes there's a person, or a group of people, associated with it. From there, the person
fills out their registration as part of the request domain, which includes other related records.

At first, we might be tempted to handle everything in a single model. But that's not ideal, because it's a complex process
with many rules and possible integrations we may not even be aware of yet.

However, if the application is not very complex, eventually we can handle everything together, and it might sense. But we
might later face difficulties separating the parts. This often comes from a lack of project vision, experience in translating
problems into code, or simply dealing with a small problem that only involves one sub domain, which can be solved in a more
compact way

In any application, it's worth dividing the system into subdomains, even small ones. We just need to understand that even
something like authentication can be treated as a separate subdomain from the rest of the application.

## Financing Problem

There is a request domain that only makes sense if a person is making it, and that person will register their data.
During registration, they will upload a series of documents to the system.

After that, let’s assume we have another sub‑domain (or even a separate system) dedicated solely to documentation.
For example, when someone uploads a PDF, this system performs OCR to convert the document or image into text and then asks
a human to validate whether the extracted information is correct and represents a valid document.

Uploading the documents might be a manual process in which someone later reviews and approves them, or it might be sophisticated enough to justify a dedicated sub‑domain for it.

Another part of the problem concerns credit analysis. The system takes the person’s record; if there is no property, it simply analyzes the registration data, suggests an amount likely to be approved, and generates a report.
However, other factors related to the customer’s profile come into play, and there could be a separate system for property registration. A property might already be registered, might already have been financed, the inspection process might no longer be necessary, and hiring an engineer might be unnecessary, and so on.
Hence, we could end up with one sub‑system for registering properties and another for registering clients.

When examining this problem, we face several decisions:

1. "Is the domain we are focusing on the core of the application we are building?"

2. "Every application must have one most important domain; even if it is only 1 % more important than the rest, it becomes the core domain".

3. Between the core and the generic layers, we find supporting sub‑domains. These are essential to deliver value to the core domain and include some company‑specific logic, but they are not the main competitive differentiator.

4. After the support domain, we have generic sub‑domains: features that are necessary but not unique to our business. Because
   they carry no domain‑specific rules, we can often adopt third‑party solutions instead of building them from scratch.

5. "As an exercise, imagine implementing something like Uber or Netflix. Which sub‑domains would be interesting? Which would you choose as the core domain and which as supporting domains? Obviously, these companies deal with high complexity and have created sub‑domains to solve a variety of problems—some purely software, others infrastructure‑related. We, too, might face new issues and create additional sub‑domains."

None of these companies started out as complex as they are today. Thinking about probable future problems—and classifying core versus supporting sub‑domains—helps when modeling our own projects and making architectural decisions.

## Mapping the Solution

### Part 1.

Here the context map will be applied, the map context is basically defining the contexts we are going to implement that
are normally one to one; one sub-domain will generate a delimited context, or we can have a one to two relation or two to
one.

However, we don't need to focus on this, because depending on the situation we can have many to many, one to many, or so.

But, as a rule, we will always want to map this relation one to one. The number of sub domains, is usually
the same number of the bounded contexts, which mean that when we are talking about bounded contexts we are talking about
the solution, while sub domains are part of the problem.

Let's assume that the entry point is the request domain itself. This request domain will rely on a system responsible for registering
a client, which will likely be a separate project due to complexity involved — such as verifying whether the person's
income tax was filled correctly, checking documentation, interpreting information, and more.

Is not just simply a matter of stating "this person lives here, is married to person X, both will be part of the request domain,
and he earns y". There is also a research component that includes verifying the person has credit status, checking for
legal issues, and confirming whether they voted — If they didn't vote, they may not be eligible for registration.

All of this complexity belongs to just one sub domain, and combining it with others would make the whole system, too large
and unwieldy.

The request domain sub domain inside the application, should just worry with appointments, when the person is going to be fill
this request domain, and so on.

The request domain uses the person register but the person register does not know if there is one, but eventually, the request domain
can ask it if the person is using, for example, a micro front-end, this would open a pop up, but maintaining the context
and insert all the registration information. As soon as the person is registered, it returns an unique identifier and we
attach it to the request domain. Making the dependency to never be cyclic, to avoid this, we can turn it to be a processing
line and when it finishes, we get notified.

In the map made by the instructor, the request domain eventually will interact with the property register part, which has
complexity, use-cases, integrations different from the person register.

We'll notice that request domain, contract, inspection, person register, property register are support subdomains, while the
core one, of a system that deals with the financing filter, is the credit analysis. We could think that the core one is
related to the payment of the financed amount, but this part is not going to be part of the system, it's probably going
to be made by the bank itself, so the core of the application is the credit analysis.

For the documentation and finance, we'll use a generic sub domain, because it's very common that other applications can
use the same one.

Once the request domain received the property, the person, made the analysis, the contract has been signed, eventually, the
request domain domain can ask for a queue to simulate, or even to verify if the credit analysis went ok or not and returns
the answer for future processing.

The instructor believes that for this project, in order to turn all these relationships into a real-world implementation,
he would physically separate the projects. They would still live in the same repository, but by doing this, any dependency
between projects would require more effort to establish. We would need to talk to the other team, so they can expose an API,
and there would be a conversation to determine whether that relation really makes sense. If not, it's a sign that maybe
we need to create a new subdomain to properly solve the issue.

When we use a single project, separated only by folders, it might work if the developer is extremely organized and disciplined.
In that case, it's possible to maintain it for a longer period. However, in practice, this often leads to invalid relationships
forming between modules, and eventually, we end up with a big ball of mud — as if everything were thrown into a single bag.

For example, the inspection domain might need access to something in the request because there's a piece of information
the inspection team needs. But the data only exists in the request domain, which accesses the survey domain, which in turn
accesses the property registry, and so on. These cascading dependencies become very confusing and hard to maintain.

### Explanation of the case above

The instructor is saying that if we separate subdomains into independent projects (even in the same repo), it forces teams
to communicate and define clear boundaries through APIs. This helps avoid messy dependencies.

But if everything is in a single project and only separated by folders, it’s easy to create shortcuts — one domain accessing
another directly. Over time, this leads to a “big ball of mud,” where everything is tangled and hard to maintain.

His main point: separate concerns, avoid hidden dependencies, and communicate clearly between teams to keep the system
clean and scalable.

### Part 2.

When it comes to tools for this kind of work, it's uncommon to proceed without using a method based on 'Domain-Driven Design (DDD)'
. This approach involves talking to the client, defining the subdomains, and understanding how they relate to each other.
Only after that do we begin to look at the problem from a more technical perspective.

Understanding the details won't necessarily lead us use a different strategic tool than the three main ones. Talking
to the client, defining subdomains, understanding their relationships, and then analyzing the application in more detail,
won't change the overall strategy.

The relation between the tools is exactly this: a `bounded context` represents a specific part of the business we've
isolated. A business may have ten sub domains, but we might implement them all within one bounded context. What matters
is how we implement and define the boundaries. A bounded context is a clearly separated project, with well-defined
architectural limits. These boundaries are fundamental — violating them can lead to serious issues in the application.

Each bounded context also has its communication style and domain language, specific to subject-matter expert. For example,
an inspection professional or engineer will have specific terms they always use. We extract this `ubiquitous language`
by talking to those people — it acts as a contract that defines consistent terminology for flows, issues and processes.

If we choose not to align terms — for example, using one name for an entity in the inspection system and the same name
inspect, and utilize the same name in the property registration system — everything can become confusing.

It's important to avoid mixing terms unless the two subdomains are so tightly coupled that merging them into one makes
sense. But even then, we need to be careful not to share the same ubiquitous language across multiple bounded contexts.

The `context map` is a high-level view of the application. It shows the relationships between core, supporting and generic
subdomains.

If we "zoom in" on a bounded context, we'll often find it includes its own front-end (e.g specific to the inspection system)
its own back-end, and possibly asynchronous communication like queues instead of direct API calls. The architecture depends
on the business needs — how real-time the system must be and how much failure it can tolerate.

For instance, consider the person registration scenario: a person is standing in front of us with all the necessary documents,
but the registration service is offline. Should other systems go offline as well? Or should we queue the data and process
it later? This depends on the requirements defined by the client.

Inside the bounded context, we typically have a domain layer (with use cases and models), and this context might have a
dedicated or shared back-end and front-end.

In conclusion, a context map is a macro view of the application, When a business expert looks at it, they should be able
to say that "Yes, that's how our business works". The bounded contexts in the solution are derived from the sub domain
identified through conversations. This way, the client can recognize their own business structure reflected in the system
architecture.

## Architectural Decisions

After completing the strategic planning, mapping the subdomains, and understanding their relationships, what architectural
decisions need to be made next? Should architectural decisions come before design decisions? It depends. Some architectural
decisions benefit from being delayed, while others must be made as early as possible.

For example, deciding which database to use is a critical decision. Choosing poorly can have lasting consequences. Take
X (Twitter) as an example: it initially used a MySQL database but eventually had to evolve its architecture to meet
scalability needs. This transition introduced complexity—such as additional intermediate servers, costly processes,
synchronizations, and replicas—which heavily impacted the system's architecture.

Choosing between a monolithic application and a microservices architecture is another example. In some cases, splitting
a monolith into modules is not truly an architectural change if it doesn't affect code or performance significantly. It
could simply be a load balancing decision—for instance, isolating a high-demand but less critical component from a lower-demand
yet more critical one. In these cases, architecture evolves without major disruption.

In short, it's not as simple as saying, "A, B, and C are architectural decisions, and D, E, and F are design decisions."
The distinction isn't black and white. For example, defining asynchronous processing through message queues can be considered
an architectural decision, especially when following an event-driven architecture—common in complex flows like a shopping
cart checkout process.

Choosing a programming language is also a major architectural decision because it impacts the coding paradigm, design patterns,
and artifacts you'll use.

On the other hand, delaying infrastructure decisions, like selecting a database, can be advantageous. It forces us to
reflect: "How can I develop the business logic without tying it directly to a specific database?" After all, the client
won't tell us, "Use MySQL"—they'll describe their business processes. Modeling the business should focus on behavior,
not on how the data will be stored.

Delaying database decisions encourages a cleaner separation between business logic and persistence. Instead of immediately
thinking about Hibernate mappings, we might design a separate, simple model with public attributes—no getters, setters,
or database dependencies—just to transfer data to the persistence layer.

This way, we implement business processes without being tightly coupled to infrastructure concerns.

Another example of an architectural decision is setting module dependency rules. Suppose we have module A and module B.
We might establish a rule that A can depend on B, but B must never depend on A. Creating physical barriers (such as separate
build artifacts) can help enforce this rule and prevent accidental violations.

Similarly, architectural guidelines might define whether the project will use an anemic domain model (simple classes with
private attributes, getters, and setters, and little to no business logic) or a rich domain model (classes encapsulating
oth data and behavior). Even though "anemic" sounds negative, for simple CRUD applications, it might make perfect sense.

Other architectural guidelines include choosing the programming language, paradigm, domain model style, use-case-driven
development, and dependency directions (e.g., A depends on B, not vice versa).

When we move into the design level, we focus on more practical concerns:

. Which architectural patterns will we adopt? Layered architecture? Hexagonal architecture? CQRS (Command Query Responsibility
Segregation)?

. Which design patterns best suit the project?

All these choices are applied within the bounded contexts, where each bounded context defines its own rules and decisions.
Some projects might benefit from CQRS; others won't.

In the tactical phase, we leave the global view behind and dive deep into each bounded context. For example, in the Inspection
context, we might have an Engineer entity and a RevisionInspection entity. We model data and business flows based on
real-world operations.

For instance, an engineer might tell us:

. The first inspection covers all items.

. A second, follow-up inspection should only check previously non-compliant items.

This real-world input affects our design. Instead of reloading all inspection data, we create a flow that loads only the
non-compliant items, saving the engineer time. We design these flows into application services (AS) inside the bounded
context, reflecting real business practices.

## Complexity

One of the big philosophies in the way of thinking about DDD, is that we should address complexity from the inside-out.
This means pacing and solving the complexity where it appears, rather than leaving that place empty, and handling it somewhere
else.

Why? Because, physically, the part where the complexity appears (the inside), is much smaller than the outer parts, the
surface can involve many different systems. If we have a rule that should be implemented inside the model/entity, and we
simply don't solve it there, we'll likely end up implementing the same rule across all layer of the application.

Imagine we have a function that needs to be called, and because we didn't implement it on the core, it has to be implemented
four different times on the outer layers. If we had created it at the core, we would just call it once. That's better—
but even then, there might be a flow that forgets to call the rule, leading to it not being enforced when it should. If
the rule had been implemented inside, at the point it naturally belongs, there would be a much lower chance of missing it
elsewhere.

Understanding that complexity must be addressed from the inside out is the best path to follow when thinking in an
object-oriented manner — specially when embedding rules inside the data. If we have a rule that depends on two pieces of
information that an inspection already has, then this rule should be implemented within the inspection context or very close
to it.
