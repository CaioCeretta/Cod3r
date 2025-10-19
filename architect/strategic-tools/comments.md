## Comments on the course

  ● Lesson 1: How to transform ideas into applications?

    ○ In the problem and solution context, we can think that every problem we have (such as climbing a mountain) there
    should have a solution planning, which usually is

      ■ Strategic - Physical exercises, understand the main difficulties, work on our cardio, and this could take even
      some months for us to be able to make this travel.

      ■ Tactical - Select tactical tools we think we may need during the climb, such as electrical gadgets, tools, etc.
      However, when we start climbing, that will be the moment we start choosing the best tactical tools inside a practical
      context and use them to solve any problem during the course.

        □ Once we have a problem to be solved through technology, this problem may generate a business and companies around
        this problem, and this company will have a "field of expertise". A business domain can also refer to a deeper
        knowledge and specialized that the company has on its field of expertise.

    
    ○ And how do we solve software problems? primarily complex problems

      ■ One of the most famous strategies are the "Divide to Conquer", which there can be many levels for us inside the
      programming world

        □ The most basic way to organize an application is through lines and blocks of code, and this is a kind of
        dividing to conquer.
        □ When we think on organizing a larger application, we think of separating it in files and folders, separating
        parts of the logic in a way it makes sense.
        □ Multiple applications, inside one project, create a separate front end project, and a backend project, and
        separate this application along our application.

      ■ However, the "layers" pattern is the "father" of these multiple patterns we end up using in our applications nowadays.

        □ Separating in a logic way our application gives us the possibility of separating the code by responsibility.

          . Let's say we have three layers, and in one of them, we used it to place our gui (graphic user interface), then
          in the other layer, we place all our business rules, and another layer as the infrastructure one.
          . So multiple times we can have something going out of the gui layer, then the business layer, then through the
          infra, to finally save some data in the database
          . Therefore, this is one of the most famous ways of dividing to conquer and each layer has its own responsibility:
            One capture the inputs and show information to the user, other applies the business rules in our app, and the
            last one finally interact with the infrastructure services, communicate with the DB and store data.

  ● Lesson 2 - Using frameworks

    ○ Let's use as an example one case where the client asks the dev to create a "EAD" system for him to publish its courses,
      the developer starts coding, using multiple different technologies, be extremely happy because everything ends up
      working well, but at some point, the application may become a "big ball of mud" — this term comes from the DDD book
      is a way of relating the bounded contexts in an erroneous way. 
    
      ■ The fact is, when we don't have a strategic planning, we don't have the idea of how the application may grow along
      the time, and our tendency is to solve everything together.
        ▢ Every problem a company may find, we will try mapping it and model this problem as if it was only one thing, but
        this is not how a company works, even simple applications we will end up noticing that there are clear division
        inside an app.

      ■ Let's take an hospital as example
        □ If we think of an hospital, we end up concluding that an hospital is separated by many different areas. We have
        the hospitalization area, the surgeries area, resources, legal, and so on.
        □ If we try mapping an entire hospital as if it was a single and integrated problem, we will have a set of problems
        and the chances of having this big ball of mud by the end of our domain modeling, is very high. Because we may end
        up mixing things that are sometimes incompatible.
        □ An example: we can have a single CPF (A single person) inside the hospitalization context, this person is a patient,
        and when he/she leaves the hospitalization and goes for a surgery, he/she is STILL a patient but may have some
        additional information, such as specific information for the surgery. And when this person is discharged and go
        to the financial sector to settle the accounts with the hospital, this person isn't a patient anymore, he/she will
        now be a client. Therefore, the same person executes multiple different roles through this trajectory

      ■ Now let's go back to the dev that created a ball of mud, everything coupled, with no strategic plan on the "EAD" 
      problem, and this generated all the problems, he may think: "Where did i go wrong to create this?"

        □ The problem is that a developer, multiple times, "marry" the frameworks, and our role as developers is to
        protect our applications from frameworks, to protect the companies of the technologies that are in constant
        change.
          . Multiple times the developers, because they really like a framework, they become hostages of their constant
          changes
          . We can use Next.js as an example, by the current time, it has 6 years of life, and already launched more than
          2000 releases (Of course, the big majority didn't generate major changes that "break" the framework behavior)
          but many of these changes generated significant impacts on the framework use.
          . The fact is, if we marry a framework, the framework won't marry us back. It will protect its belongings and
          continue living a single life, and we will get stuck to a relationship that multiple times will bring multiple
          problems for us 

        □ Therefore, by protecting the applications from the frameworks, has more to do with the strategic planning,
        selecting good tactical tools, to enable us to utilize an architectural planning that brings a way of writing
        "timeless" codes — We can do this, by being careful and separating what is indeed precious for the business from
        the technologies. And this does'nt mean that we must not use the best frameworks in the market. However, if those
        frameworks tht are very famous today, change, and other frameworks take their places, we will be safe because
        we have separated the business from the framework, in a way that we can migrate to a better framework in case
        it is necessary.

        □ And the error number 1 the dev made was to start the application after the framework choice and concentrated
        and every thing was completely based on the framework itself.

  ● Lesson 3: Domain and Sub Domains

    ○ Continuing the last story, the developer has decided to talk to the client. Because multiple times, experienced developers
    tend to think they know about the business without even being minimally specialists in the business.

      ■ The instructor is using the fact that he worked for many years in the Social Security, and it is extremely complex.
        And he said he was sick of seeing developers deciding to make decisions without talking to any specialist. Then
        simply codes and these codes will need profound changes since what he thought he understood, wasn't exactly that
        way.
        □ Listening to specialists is an excellent practice to begin a project that will fully meet and in a correct form
        the problem we are looking to solve.
        □ There is always someone that is specialist to the problem, and we are specialists on the technologies that will
        help us developing the solution. However, the real solution is not simply an entanglement of technologies, but
        a talk with have with the client and we can, by abstracting this problem in a solution, multiple times object
        oriented, we will map this problem in a precise way using the "terms" used by the client, using a modeling that
        reflect the way the business work.
        □ The developers don´t have this capacity of hearing the client and understanding that the business is more complex
        than we developers tend to think o

    ○ On the beginning of this course we have talked about problems and solutions, and we will first talk about the
    problem

      ■ First thing we need to do, is to understand how the problem is organized and after it, start to make a "from/to"
      to map the problem into the solution.

      ■ A problem usually haves domains and subdomains:

        □ Domains: The business domain of a company refers to the specific area or industry in which it operates. It also
        refers to the profound knowledge and specialized that the company has in its operation area.

          . Every domain, involves data and flows.

            - When we think about data, we think of the domain modeling, that is, like a mass, we have the clay where we
            will model a sculpture. We start modeling, then make the necessary adjustments, by scraping some parts, and
            so on. Inside programming, we use a term named "refactoring", we write a code, then refactor it, improve it,
            and then the data will reflect the business structure itself.

            - When we think of flows, we are thinking on the use cases.

            - And more than a domain itself, the domain is broken down into several subdomains. No company have a single
            sub domain, because any companies is divided in sub domains, which are essentially subdivisions of a larger
            business. Each subdomain has its own modeling and relevant business logic that usually are identified during
            the analysis stage and project design.
              - Each subdomain has its own model, data, and flows. So back to the hospital example, hospitalization is a
              subdomain, and inside the hospitalization we have its own data and flows.
              - In an "EAD" application, we have the educational subdomain, which will also have its own data and flows.
                - And this platform will have another subdomain related to the discussion forum, it will also have its
                data and flows, and so on.

          . A problem, also have this divide to conquer strategy, companies are separate exactly for solving or attacking
          a large problem. Even if we don't have an associate software, enterprises need to solve their problems somehow,
          be it hands-on or with any other device/tool, something has to be done.

          . We are the knows "battling" to solve the problem through technologies, but the fact is that a problem, usually
          have a domain, and this domain is divided into smaller sections.

  ● Lesson 4: Sub-domain types    

    ○ A company, no matter the time or place, it will always end up being separated in multiple sub domains

    ○ The three sub domains consist of

      ■ 1 - Basic Subdomain (Core) 

        □ Here stays the heart of the business and the core purpose of the organization. It is supposed to be the place
        where the company must concentrate most of its effort and resources.

        □ One thing we must be aware of, two companies inside a same area, can have different basic sub domains. This is,
        we can have an EAD company focused on sales — Its whole project is oriented to sells, every flow, data, business
        definition and the specialists decided that the most important for the business was sales. And the other EAD
        company was focused on the student's experience, therefore, its main focus is the educational section of the
        company. Even though sales, and the capture of these students is important, but the company understood that their
        main focus, inside every flow, was to ensure a good educational experience (which would become the basic subdomain).
        
        □ This subdomain is unique, specific to the company, and where its innovations and creations are going to be
        centered in, this is the place we will put on most investment.

    ■ 2 - Support Subdomain
 
      □ These are important aspects of the business, but it is not the main focus (such as the basic subdomain). They
      help and support the core subdomain on reaching its objectives.

      □ This is, the objective of a support subdomain, is exactly helping and supporting the core subdomain. It is still
      specific to that given business, has to be personalized for each business, but it does not have the same  level of
      importance as the core.

    ■ 3 - Generic Subdomain

      □ These subdomains are generic enough so we can use domains of other companies to solve that specific problem.

      □ Let's take the EAD that has education as its main objective. It may consider the sales part as something generic.
      It may have nothing in special on that part and a company that do really well this part of the process: sales recovery,
      attracting customer, lead capture, sales funnel, and so on. So a company can use a service of another company as a
      generic subdomain and not specifically worry about how to do this sale, and simply integrate through a link sending
      to another checkout page.

      □ Who will define which are the subdomains and their types are the business specialists, the people that profoundly
      understand the business and are able to decide them. However, these definitions have nothing to do with the app itself,
      they are business definitions. When defining every subdomain and their role, this all have to do with the business. 


  ● Lesson 5 - Domains of the EAD platform

    ○ We are going to make the problem space more concrete after the EAD school example, where we are going to put on
    names so we can understand how we can take a domain of a problem and break it in subdomains.

    ○ We will start taking the school domain like it was a unique thing and after it, we will get into multiple elements
    or important data that we will need to manipulate inside this school. We are not talking about the solution space, but
    the problem space. When extracting, we will notice we will have the following: 

      ■ Author: Author of an ARGUMENT that may happen on the forum
      ■ Post in a blog
      ■ User to authenticate
      ■ The course may have a LESSON ARTICLE or a VIDEO LESSON and they may have ATTACHMENTS
      ■ If a student have AUTHORIZATION to access a course
      ■ STUDENT

      ■ Therefore, by looking and imagining, we will see that we have an important set of data to be manipulated within
      the problem space

      ■ When we analyze this way, taking the whole and try to extract it, everything looks mixed, and this is bad because
      we end up creating a big ball of mud as we mentioned, and the chances of we generating a great level of coupling
      or objects with multiple responsibilities, is very big.
        □ An example of this is: We have the AUTHOR, the USER and the STUDENT. These 3 elements, or 3 different objects
        can point to the same-email, but at certain point that e-mail will behave as an AUTHOR, it will have an statistic
        of how many discussions it created, of how many thumbs up he has/received, or thumbs down, and all of this concerns
        an Author inside the forum context.
          - Or a Student inside the education context. How many courses, its progress, how many courses he concluded, how
          many certificates he has 
          - Regarding the user part, it can have other things such as access control and other questions related to an
          user
      
        □ The fact is that we have three objects, and these 3 objects have different purposes inside different subdomains
        of the "problem space". Someone who is a forum specialist, will call this person of Author, as for the specialist
        in education, will call it Student. They are different objects, even though, they may point to the same person
        in the real world. Someone can play different roles according to the flows that he is executing inside the
        business

      ■ If we start analyzing the EAD problem, but not seeing it as an unique object, but after the perspective of
      sub domains, the first sub domain that will emerge that is extremely important, is the educational part. The
      educational part is where we have the courses, lessons, and so on. 
        ▢ Another important sub domain inside an online school, is the sales part, we will have the lead, the sales funnel
        and a specific process for the sales inside an online world.
        □ Then the forum sub domain... And we will start noticing that the business can be separated into subdomains. It
        is still a unique domain, an EAD domain, but we can think of different subdomains even before entering the scope
        of the solution.
        □ And each sub domain, has one or more specialists within the company. Let's suppose we want to get the forum requirements.
        We go to the forum specialist and ask how does the forum work, what is associated to, and what are its flows. This
        means that we need to talk to a specialist, so he can give to us the data, the flows, and how the subdomain works.
          - After we understand, make all the notes, and then go talk to the education specialist: How does the educational
          domain works? How the data is organized? What are the flows and the student interaction? And the specialist will
          give us all the coordinates. Saying something like, the courses have chapters, the chapters have lessons, and
          they might have other associated things, such as exams, attachments, exercises, tests, challenges, and so on.
          - Therefore, after these specialist explanations, we can bring a solution that indeed meet the way the specialist
          explained us.

        □ One important thing to know is that all these specialists, will use a set of "slangs" that concerns their
        business. They will use names that are extremely important to know. For example, inside an EAD platform, we
        organize the courses, and the courses have SECTIONS (which is an important name). As for another company, we will
        notice that there are courses, and they are separated in chapters and the chapters have lessons (chapters is an
        important name that have to do with the business language). If in other case, instead of chapter or section, the
        name modules are used, or the courses may be organized with a higher level than the courses that are trails, or
        one even higher that are areas, so the areas have trails, that have courses, that have lessons, and so on. 
          - All of these "slangs" we will end up getting through conversations with the specialists, and the names used
           by then is fundamental,

        □ And if we take a look on the sub domains, let's take the sales subdomain as example, it have: client, sale, card,
        installments, bill. And all of this concerns the sales domain
        








       

           


           
         


        






    