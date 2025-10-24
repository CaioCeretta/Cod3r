● Overall Comments

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
  
  ○ Architectural, Design and Code problems

    ■ In general, the word "architecture" is used in the context of something on a higher level it is independent of the
    lower level details, while "design" often seems to suggest structures and decisions to lower levels 
      □ Design has a "minor influence" than the architecture, yet it is still relevant inside a given module, taking a
      design decision of using ports and adapters, for example, it is an important decision that will guide the way
      we code
    
    ■ The primary architecture objective is to minimize necessary human resources to build and maintain a given system.
      □ It has the objective of serving to a determined purpose
  

