### This chapter will be used to evolve the basic code apps to a more real project, with security, REST Api,
as well as improving the overall code

## Lesson 1 - Understanding what we've done so far

This refactoring will not consist of domain modelling, entities, value objects, services, because the focus is not on
the domain driven design (DDD), but the objective here is to specifically focus on clean architectures, and ports and adapters

We may even ask: "Is it correct to apply CA and Ports and Adapter also inside a front end?"
  . The instructor's answer is yes. He states that the course could even be focused on the frontend, and he would be able\
  to show exactly everything he is currently demonstrating. However, the issue is that frontend development often involves
  a heavier framework load and other concerns that draw focus away from the pattern itself, unlike the current application.
  The current application, which initially began with only business logic classes (which could be libraries used on the
  frontend), is now gaining a "stronger backend face" with the addition of express in this chapter.

But for know we will make a drawing of how our application is organized and link it with the concepts we have seen so far.
**the drawing will be on **progress.excalidraw**.





  ### Drawing Comments

  . The drawing won't consist of an hexagon like the pattern's name, and is interesting to think that the creator only
    used this polygon because he wanted to move away from the "common place" and use a figure that haven´t been used before,
    and he also consider a polygon with multiple sides what ideal to symbolize that the application have multiple "faces"
    or ways of interacting with the external world.

    - According to the Cockburn's itself, he opted by the hexagon because it would be the geometrical form that would allow
    him to draw **enough faces** for the multiple I/O elements of a system without having to redraw the diagram every time
    a new element was added. A pentagon could be too narrow, and an octagon was visually more complex by that time.

  . When we have a port, we are mostly going to have a least 2 implementations to it
    - For example, we have the ColecaoUsuario interface which is implemented by a class that connects and make calls to a
    postgresql, and we may think: Ok, but i don't want to connect to other database, the changes of linking to a mysql db
    is very small, and if i'd like to add another db, it would probably be for other functionality different from the use
    that i have for this one
      - The question that will arise after this question is: "And for the tests? Should'nt i have other implementation for
      the tests without depending on the real db?"
    
    - Therefore, we right away create a port because there are already two explicit necessities of providing two different
    implementations. One for the tests and other for the real database.

  . By the end of the basic example we had two ports: `ColecaoUsuario` and `ProvedorCripto`, of something that would be
  guided by our app, who will call these providers, is our application, and that's why these two ports with their respective
  adapters are DRIVEN by the app.

  - And different from the ports, the tests are responsible for firing the use cases and that's why, they are part of the
  drivers and are going to be one of our application guides.

  . We are now going to create an API, which is also a driver, and an API usually stays outside of our app's core — which
  only contain the business model.

    - This API will be responsible for firing the flows inside our app.
  
  . One question that we could make based on the APIs is if it makes sense for us to create a port to have multiple API
  providers.
    - Suppose we create a port named `servidor`, and it will have a method to register a something, such as a route, and
    we could create an `ExpressAdapter` and a `FastifyAdapter`, and will eventually having the possible of sending multiple
    implementations to this port that will guided by some external source.
      - The answer is, if it makes sense to our app, we could.
    
    - However, normally we don't see much necessity because the API can simply call a use case, and in the controller that
    program it, we can have direct access to these servers, since the controllers are also going to be outside of the app
    on the driver side, and it can directly access express.
      - The case where this would be applied is for cases where we don't want the controller to have direct access to
      express.




  
     






