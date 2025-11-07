## Lesson 1 - Domain Modeling?

"One common mistake is to give up too easily on fitting the behavior into an appropriate object, gradually slipping toward procedural programming"
Eric Evans

### Definition Extracted from the DDD Book

###

- “It is a software model of the domain of the business, very **specific** to the particular business you are working in.
It is usually implemented as **an object model**, where those objects have both **data and behavior** with literal and
accurate business meaning"


#### Specific
In this quote, specific is highlighted exactly because we often tend to create a generic modeling. A modeling that does
not have the "smell" nor the "color" or the "taste" of the business we are dealing with.

Many times we may sloppily create a user by thinking something like: "Oh, this is the same pattern i'm already using in
every system i've built until now". We end up even creating a generic `login` flow, but depending on the app type, it mayh
have specifics and details related to the business.

Therefore, when modeling a domain we need to understand that this given business is singular/innovative. Innovative in the
meaning of it being unique and does not exist any business like that.

Assume it is an e-commerce system and it can be equal to multiple different sites. But this specific client may have a 
different way of "talking", be it by **nomenclatures**, or the flows are unique, and so on. When we start modeling with
the mentality of thinking we are modeling something specific and customized. The chances for us to add that business
"scent" in the client we are attending, is much higher.

Therefore, each company has its specific details, processes, and we want to expose that singularity inside the
modeling. We must "run away" from this general/generic pattern that does everything exactly the same and ignoring
the business "soul".

#### Object Model

When we think of objects, we think of objects inside the oop, that have data and behavior, but on that specific quote,
the writer thought of this data and behaviors having a literal meaning and precise to the business.

#### Data and behaviors

When thinking of data and behaviors in a literal way, we understand that we must always look for expressing them literally
the business we are representing.

If the app calls a given object with a specific name, we should use that specific name inside our domain modeling. For more
counter-intuitive the names may be inside our head, we must get used to getting these business nomenclatures and
put them inside our modeling, since every modeling should literally and precisely, represent the business

### Focus on the Database?

### Definition Extracted from the DDD book (Not literal)

There is a tendency for developers to **focus on data** rather than the domain. This often happens with beginners in DDD because
common software development approaches emphasize the database. Instead of designing domain concepts with **rich behaviors**, we 
end up thinking mostly in terms of data attributes (columns) and associations (foreign keys).

### Domain model is not simply a replica of the database

Even though we want data, associations, relationships, expressive names, or the attributes and column names coincide with
the business, and we want all of that.

However, the question is that we often stop in that mapping thinking that our domain modeling is simply that replica. But
the best approach would even be not to start on the database. We need to model the domain/problem and after that, we are
going to be able to have a bigger understanding of what are the business characteristics.

And we need to understand the model. How will we know if it is more focused on persistence or fetching if we didn't even
model the domain? If we simply start off to decide the ideal database for the project? Or if we really need a database
if i don't understand any domain we are trying to solve?

Therefore, the idea is to leave that database decision for a "second time", multiple companies do not have this possibility,
they may already work with certain technologies and enforces specific choices. But this is not an excuse for us not to
start after the domain modeling, since we want the data to meet our model, and not the contrary. If we start by the data
the chances of having a model that adheres to the database data is way bigger. This may bring a risk, since we will end
up bringing an anemia of rich behaviors to our app.

## Lesson 1 - Anemic Model Pt 1.

A basic symptom is that at first sight, it **looks like the real model**, they often have the nouns defined in the "domain
space", and these objects are linked to the relationships and rich structures real domain models have. The problem arises
when we look to the **behaviors** and notice that it practically doesn't have a single one in these objects, making them
more of a **"sac of getters and setters"**, Getters and Setters are used to access and modify private attributes.

So an anemic class is commonly a set of private data, and to make it "fancy" added gets and setters to access/modify
them. We do not have nothing expressive that reflect the business, and a business specialist — which commonly doesn't
know programming, doesn't know what a getter and a setter do and they wouldn't even be able to identify a flow which is
implemented by the object and they could relate them to the business.

## Lesson 2 - Anemic Model Pt 2.

Sometimes, these models, even enforce a design rule saying that we shouldn't place any domain logic inside the domain objects,
and instead of it, there is a set of service objects that hold all the domain logic, executing all the calculus and updating
the object models with the results. These services live on top of the domain model and use the domain model just for
the data.
  - This basically says: "Let's separate all the logic from the domain model objects and put everything inside services.

However, the problem of separating the logic is that we are violating one basic principle of the object, that is data and
behaviors go hand in hand. One other problem by separating it, is the high probability of doubling a code that should be
done only inside one place across all the app. And we can't even ensure that these objects we are dealing with, are valid
objects.

We may define in the object's interface that it should be an object with positive id, but somewhere in the app we utilize
it as being negative, and multiple data can start being inconsistent.

As a final summary we can think that the "horror" of this anti-pattern is that it is so contrary to the OOP basic idea;
which is combining data and processes together. The anemic domain model is, in fact, just a procedural design style, and
developers often think that they are real objects, and this way, they completely lose the understanding of what is an
object-oriented design.

An example of an anemic model would be simple as
  ```ts
    interface Usuario {
      id: number,
      nome: string,
      email: string,
      senha?: string
    }
  ```

This interface doesn't say absolutely nothing of cases like
- What are the `name` rules?
- What are the `email` rules?
- Is our system password weak or strong? How many characters should it have?
- Can the id be negative or it is simply a number?

We don´t have an idea of how these attributes behave inside the User







 
 