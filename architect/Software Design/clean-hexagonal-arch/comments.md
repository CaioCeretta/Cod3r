● Lesson 1 - Architecture Overview

  ○ What is an architecture? 

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

      
         

                            
  

