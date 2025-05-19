## Documentation is important but we should not look it as a limiting factor

For example, an instructor once worked on a system responsible for managing accountability in insurance plans and other
billing processes that needed to follow strict regulatory rules.

The system received financial balances and used a file containing all accounts and their respective rules. He began by
writing the application code itself because the messages presented to clients had to be highly specific and accurate.

At the company, the requirements gathering process and use case documentation were handled very formally. However, developers
faced significant difficulties trying to reverse-engineer the code into documentation. At one point, a client even suggested
worsening the quality of the application messages just to align better with the documentation, since the team couldn't
map all the system messages effectively.

This highlights a critical point: documentation should help clarify business rules and define useful interfaces for
understanding flows, but it shouldn't constrain development. The real source of truth is the code itself. Documentation,
especially at a high level, can increase the chances of misunderstanding or misalignment if overly relied upon.

## Problem vs. Solution

### Understanding the Problem

At the heart of any problem lies a domain. Every organization operates within a specific domain that shapes its processes
and data.

Take social security, for example. Its core domain revolves around providing benefits like retirement, disability, or other
social assistance. Within this domain, there are subdomains, such as one focused on workplace injury cases. In these cases,
clients go through medical evaluations, and the outcome determines whether they're eligible for benefits.

### Focusing on the Right Thing First

When tackling a large-scale application, the initial focus should not be on the technical solution. At the beginning, we
don’t need to worry about which framework to use—whether it’s React, Vue.js, Angular, etc.—or where to host the app.

Instead, the priority must be understanding the problem deeply.

Each subdomain—such as requirements gathering, medical expertise, or benefit eligibility should be understood clearly.
Developers must work closely with subject-matter experts and analysts to create a shared understanding of the domain.
This is where the concept of Ubiquitous Language comes in: a common vocabulary used by both technical and non-technical
team members, specific to each subdomain.

### Organizing the Solution

Eventually, we create Bounded Contexts, which are sections of the system that encapsulate a specific part of the domain.
Within each bounded context, the ubiquitous language helps teams communicate effectively.

While you could create documentation and glossaries upfront, in practice, the language and understanding evolve naturally
over time through collaboration between developers, specialists, and stakeholders.

Once we define the problem, identify the subdomains, and understand how they relate, we can move to the next strategic
tool: the Context Map.

A context map visualizes the relationships between different bounded contexts. These connections should mirror how the
business actually operates, unless the business itself is disorganized or inefficient. For instance, if modules within
the system have circular dependencies (e.g., Module 1 depends on Module 2, and vice versa), this leads to complexity and
delays in development. In such cases, we may need to decouple these modules during implementation to avoid the "big ball
of mud" scenario.

### Mapping Dependencies

Let’s say we have three bounded contexts: Medical Expertise, Requirements, and Eligibility Recognition.

We then examine their relationships. If they connect linearly (e.g., Requirements → Medical Expertise → Eligibility Recognition),
and there are no circular dependencies, that’s a good sign.

In this example:

Requirements is upstream it provides the data.

Medical Expertise is downstream it consumes the data and provides new insights for the next stage.

Eligibility Recognition uses the results from the medical evaluations to make a final determination.

Just like YouTube uploads and streams videos to users, who consume them without affecting the platform itself, we want to
understand which parts of the system are upstream (data providers) and which are downstream (data consumers).

### Summary

We covered three key strategic tools for managing complex systems:

Ubiquitous Language: A shared language between developers and domain experts that ensures clear communication within each
subdomain.

Bounded Context: A defined section of the application that encapsulates a specific domain or subdomain.

Context Map: A visual tool to represent how bounded contexts relate to one another, showing dependencies and ensuring the
system reflects business processes.

These tools help us build systems that are not only technically sound but also aligned with real-world business logic and
workflows.
