Inspecting Code

In this chapter, we're talking about a project that has been made

1. In this project, the mobile version hadn't been developed yet. He explained that by following the rules, and adapting
   the code to the existent back-end —and vice versa — it was very easy to implement and ensure the code worked across
   all layers.

2. When we design our application in a way that "protects" it from mixing frameworks with the business rules, we eventually
   end up having a gigantic advantage.

3. The front-end was rebuilt for mobile using almost the same structure, since React and React Native are similar. However,
   the components, token storage, and state management differ. For example, if we close and reopen the app, it detects that
   the user is still logged in and shows logged-in state, meaning a session has been maintained

4. Even in less complex projects. it's important to build good habits by understanding how good architecture works in practice.
   Applying those principles in projects will eventually pay off.

5. Within a project, it's a good idea to use a language or framework that is similar to the one already ins use, such as,
   For instance, if we build the front-end with React, using React Native for mobile, can allow us to reuse parts of the
   web components. However, some kinds of reuse can eventually harm the project by making things more complicated instead
   of easier.

6. In some cases, the code is tightly coupled, so any change affects multiple parts of the system. That's why we chose a
   decoupled approach, which is ideal for implementing business rules. For example, if we build the back-end in `Java`,
   we can't directly reuse Java-based business rules in the front-end. This forces us to replicate logic, specially if
   it's something that should run on the client side and isn't feasible to handle with a different language.

7. Continuing with the previous example, suppose we use `flutter` instead of `react native` for the mobile app. In that
   case, we'd likely need to implement many things differently or move most of the functionality to the back end. Although
   much of it may already be there, Flutter would act more like a shell to run to run the logic. However, we wouldn't reach
   the same level of productivity as we would using a more similar tool.

## Commenting the EAD Project Code

Every code has the strategic part, it consist of three specific tools that help us organizing our code.

### First Tool

1 - Bounded Context: Basically is the "divide-and-conquer" rule, when we have a big business and even if it's an "distance
learning" platform, which is still in the beginning when compared to bigger applications, we still can notice bounded contexts,
within the application that can consist of different parts which can be developed independently. Let's use a forum as an
example, it may still be simple, but it could have moderators; different ways to organize it; IA Integration to respond
automatically. Therefore, the quantity of use cases can grow in the app, and the module become really big. So when we look
at companies, we have in the bounded contexts, two big parts, which are the company domain (the business that the company
works on) and everything the company does, all it flows, the reason for the company to exist is divided in many sub-domains,
that represent how the company is divided, and they can represent one bounded context.

Consequently, if we look within an app, we might find inside this application three bounded contexts: one representing
the authentication, the educational domain — course registration, class management, user progresses, etc. — and one for the
forum. let's say that within the distance learning platform, we also want to create a blog — that would be another
bounded context.

If we try to place everything together in a single context, there's a high chance things will get messy. We may end up
with classes that take on responsibilities from different modules, causing the codebase to grow uncontrollably and
become harder to maintain.

That's why even in smaller applications, breaking it in three bounded contexts is a good option.

There's also a folder "common" but is not a bounded context, it's simply a package that have common things that is useful
for every module of the application.

We can observe that within the authentication context, we have a class called "User", and within forum context, there's a
class named "Author". Although in the database the Author has a foreign key relationship with the User table, this link
is not strictly necessary in the code. That's because an Author could also be an independent entity, with a name that's
not tied to the rest of the platform.

This brings us to we used: bounded contexts. We can see that this concept is reflected in the code structure through the
use of folders—or more specifically, packages—that separate the business logic of the application.As a result the folders
like auth, educational, and forum represent distinct domains of business rules. They are intentionally kept free from any
direct database interactions—there are no DB imports, no language-specific constructs, and no third party libraries, being
the only exception is an UUID library, which, instead of letting the application framework or the database to generate the
IDs, is used to ensure that the application itself has control over ID generation.

### Second Tool

2 - Ubiquitous Language: On the example above, the strategic part is not complicated, but many people can jump that part
for finding it hard.
But it is simply divided in these three tools that we talked about. It's basically talking to the experts that will explain
us the hard part because it depends on the business, so it's a business complexity and not an accidental one.

The difference between what is accidental and what's a complexity inherent to the business. When we choose to use micro-services
inside our application, that is a structural choice which will bring with it a series of accidental complexities to our
project, they are complexities inherent to the technology chosen, and because of this, we need to going to bear the consequences
of the complexities brought by this choice.

One example of complexity that is commonly introduced unnecessarily is the decision to program in English. The client speaks
portuguese, the team speaks portuguese, and the business is specific to Brazil —yet the team chooses to use English. This
can be problematic if neither te team nor the client speaks English, neither. If often leads to a mix of English and Portuguese
in the codebase, introducing accidental complexity into the project. As a result, someone who doesn't understand English may
struggle to comprehend parts of the system due to the language barrier.

However, when we do choose to use English — and some times there are valid reasons for that — we need to be aware that this
choice introduces additional complexity and cost. In some cases, it may be justified by the inherent complexity of the
business itself, which would make the use of English necessary and appropriate.

With that being said, the second tool is the creation of a ubiquitous language — a shared language used consistently across
all project communications. This means the same terminology should be used in the code, messages, emails, and all interactions
with the client. This language is not invented by the developers alone; it is co-created with a domain expert — someone
who deeply understands the business, such as a lawyer in the case of a system. Together, the domain expert and the developers
define this shared vocabulary, which is tailored to each bounded context within the project.

## Third Tool

3 - Context Map: It's the way we'll relate all the bounded contexts — who depends of who? — Forum depends on educational
or vice versa? forum depends on auth or vice versa?

By establishing the relation between the parts, the application will start working passing through all the integrated flows.

In an hospital example, let's say we have a hospitalized patient, there will be flows that are going to speak with the
surgery context, that will need to interact with the legal context of the company — some procedures need legal approval
to happen and it demands the health plan to make some specific procedures — these related flows, pass through the context
map.

In the mentoring, the application, the application initially being developed was simple — just a single application with
a single rule. But now it has become more complex, involving more strategic parts.

One might think that only three things are needed to create an app, but we mustn't forget that there are other important
processes, like talking to the client, gathering requirements, holding meetings, creating user stories, and so on. However,
when we're talking about DDD, the focus is specifically on a few essential tools. In the end, DDD aims to generate a shared
vocabulary (a glossary for communication) and a diagram showing all the bounded context and how they interact.

Take the hospital example: imagine we have clients spread across different states. a medical staff was assembled — one
professional from each state — so the team could gain a broader understanding of how the medical expertise works across
the country. The team included not only doctors, but also other hospital staff. Since they came from different regions,
the same business term was often used in different ways depending on the client

To complicate things, the developer who joined the project created the developer, that took the project created yet another
term to use in the code, and the project team itself ended up choosing a fourth term. As a result, the developers had to
constantly translate between terms — for example, when someone said "A", they were actually referring to "C" in the code,
while the client might call it A or B, This lack of a shared, ubiquitous (universal) language increased the complexity of
the codebase.

### Question Off-Topic

One viewer asked about utilizing a different framework on the project, asking if using a specific framework that has an
own structure, if it would affect the project that's being dealt with.

The answer is no, because as we've seen before, inside the packages folder, we separate the business logic from the application,
so it would'nt even be inside the business folder.

The rest of the code application, such as frameworks, they are kept in the apps folder, which will have the front, back
and mobile applications.

Visually, saying that the core of the business is separated from the shell (outer section), is like having a circle in the
center, representing the business rules and another circle around it representing the shell where the frameworks is placed.

Frameworks are the shell of our application. As we mentioned at the beginning of the project, the instructor started working
on the mobile version of the app when a web front-end and a back-end were already in place. Because of the separation implemented
in the project, he didn't have to adapt the back-end for the mobile version, instead, he built the mobile app around the
already functional back-end. No other changes were needed — neither in the back-end, nor in the business rules — because
mobile is part of the shell. Consequently, creating this protection, we'll have a better structure.

## Other Commentaries

1. The DDD, tell us that everything said by the client in a meeting — the phrases, the verbs, substantives — they should be
   placed within everything generated from then on, and it'll influence everything said on the meeting and it will have a
   complete link with the application.

2. When writing clear code, even someone who doesn't understand programming should be able to look through our folders
   and grasp their meaning.
   For example, a person who uses a distance learning platform might occasionally see the developer workspace and notice
   a folder named "educational". They would automatically wonder if it does what they thinks he does.

If they open it, and navigate to src folder, then into the model folder, they will find familiar names, such as 'curso',
'progresso', and 'aluno'.

Inside the curso folder, They'll also find more intuitive and recognizable terms, and so on.

3. Having the sensibility and as developer, having this sensibility of changing the mental paradigm, helps one on creating
   a code more healthy decoupled and interesting in the long term.

4. OOP preaches that we look at the real world, and bring an abstraction of it within the software. However, many times,
   developers, look into the business and end up creating several disconnected layers, rather than working in the way
   intended. Given that, programming with a clear architecture — such as DDD.

5. The "update user name" use case requires access to the database because it modifies the user record, just like the registration
   and login use cases. That's why, when creating use cases that all implement the same interface, a data repository is
   needed. The specific method of data persistence isn't something we need to worry about; what matters is that
   the repository is defined as an interface, without implementation, and only says that it has two methods: save and get.
   However, if we look in the useCase, such as registerUser, we'll notice that it's calling the models to validate the
   rules — there is no validation inside a useCase, that's why the model is called —, will encrypt the password, verify
   if the user exists, and then send the request to the database.

6. Usually, a use case that involves the data base, we usually have: Front Web / Front Mobile -> Back-End -> Database.
   When this use case is called from the front, it will call the back-end — which have accesses to the use cases and the
   business rules and returns the result.

   Therefore, the important thing to know is: The front-end is the shell, whereas the use cases are implemented in the
   back-end.

## Application Flow

The flow is basically: We have the web application and the mobile front end, which are the shells, and when interacting
with it, it has already been made a deploy within the web application — the code is already running on the application —
and the user interaction will make that the business to already call something from the front-end. Even though they are
separated, physically inside a project, inside the project, when deploying it, the business has already been compacted
inside the web application

Now, by deploying, it is now like a dependency of the project, like we are importing it as a library, in a way that when
we click on a button to execute any action inside a use case that don't need to be called in the back-end, it'll simply
call the code directly from the front-end, with no need of calling the back-end to do something.

We can even do something local, a "pre-call" could be made to validate everything before going to the back-end and ensure
that the chance of working is bigger. And for it, another use case can be created just to validate the data before the
registration; before login; course registration, etc.

## Folders

Inside the business (packages) folder, we have these three contexts, auth; educational; forum.

Within the apps folder, we'll find the back-end, the front-end and the mobile, which are the expected applications to
be in the project.

In the package.json, we'll notice that in the front-end package-json dependencies, include the educational, forum, and
auth, which are separate workspaces.

This happens because the front-end depend on those 3, whereas the back-end will depend on the authentication, educational
and forum —this happen because those three bounded contexts, need, after the application, call the use cases inside these
elements—. All use cases are called within the adapters folder, which separates each bounded context and its rules.

Each use case has an url inside the API that points to it, e.g. getCourseByIdController.ts, we can see that within it,
the GetCourseById use case, calls it with the signature created, and returns a formatted response expected by
the use case

## Use Cases

Some examples are:

1: Toggling the visibility of a class: On the shell, a simple click on a button will change its visibility, and by clicking
it, he's only modifying the front-end, back-end is not doing nothing and not changing on the database, if the page is
reloaded, it will show the visibility that is persisted on the database.
The use case of toggling the class visibility can only be called by an admin and its implementation is on the 'curso',
entity. Therefore, the entity 'curso', is only being used as a 'shell' to call a state change within the application.

2:Changing classes order on the list:
This also has a specified code to move the classes, but it's not part of the
use cases, because there isn't the place to implement domain rules. However, it is still inside the Curso model, where
it calls the Classes model, which contains the classes and inside of it, move the lesson to the desired position.
Therefore, inside of it, we have the logic to do so. If one did not intend to do so, and not put that code in the
model, and suppose that changing the order is a front-end necessity, and this would cause us to implement in the
front-end web.
But because a useCase was made, where changing the order of the classes, was not a front-end responsibility, but a
business necessity. And, he as lecturer, recorded a course where and he needs to upload a lesson, on the second position
because he needs to give a notice of an important change that occurred in the framework.
Therefore, it's not a front-end necessity, but rather a business need for him as a teacher.
And he defends the opinion that this must not be placed in the front-end and yet, on the models, in a way that he can
use it in both applications with no problems / code rewriting because he does not have to violate a principle named
`DRY` (Don't Repeat Yourself), which in this case means, Don't write a business rule in more than one place.

## Public Q&A

1 - Inside the turborepo structure, it works really well when we're working in a stack based on javascript, but does it
work if the front and the back are in different languages?

R: There may not exist a manager tool that manage projects of more than one technology. However, we still can have a single
repository for the projects and the architecture principles used in the clean architecture; hexagonal architecture; domain
modelling; use cases; they are going to work independently if one has only one language or not. It will be independent
from the language, being pure OOP applied to the business.
It would be grabbing the basic principles, apply them on the business, and this knowledge can be applied for any
language (including languages that are not OO)

2 - In applications front-end and mobile: beside educational, auth, and forum, do they also depend on the back-end or
the back-end call is only via API and no dependence is needed?

R: Yes, they don't depend on the back-end, it's only made by API. The dependency do not know to what application
it's attending to determinate API, we simply call the API without direct dependency.
The only application that depends on the database is the back-end, no other bounded context depends on it. Unless if we
change the technology, such as firebase, it's accessed directly on the front-end, but even in these cases, it can still
be completely unlinked to the front-end and be accessed via use cases
