## Lesson 1 - Domain Services

Domain services are different from application services. Application services are the use cases, and the domain services
are going to help us to model/define rules that are not well adapted to entities and value objects.

The two places we should prioritize to place our rich behaviors are entities and value objects, but there are some rules
or rich behaviors, they may not fit very well inside these two.

Many times it is a behavior that will work with two entities at a time, or a behavior that works with a list of entities
and not only a single one, this will lead us to preferring to place this rich behavior inside a separate domain service.

### What is a service domain?

According to the DDD book, a domain service is a stateless operation that performs a task specific to the domain. It is
often the best indication that we should create a service in the domain model is when the required operation we wish to
execute seems "inappropriate" as an aggregate method or value object.

To alleviate this uncomfortable feeling, our natural tendency may be to create a static method  in the root class of an
aggregate. But, by utilizing DDD, this technique is a code that indicates we, instead, need a service.

### Important Difference

● Objective

  • Differentiate the two types of services

  . Don't confuse **Domain Service** with **Application Service (Use Case)**. We do not want to host a business logic in
  an application service, but we want to host the business logic inside a domain service. Only because a domain service
  has the word **service** in it, it doesn't mean that it should be a "heavy transactional operation", rudimentary and
  with remote capabilities

    . That is what most of the apps do, it has an anemic model, and we end up putting several rules, which should be in
    our domain modeling, inside the use cases. The logic will be inside value objects, entities and domain services..

● Example

  ```ts

    export default class FiltrarCategorias() {
      constructor (private cats: Categoria[]){}

      filtrar(pesquisa: string): Categoria[] {
        return this.cats.reduce((filtradas, cat) => {
          ///...

        }, [])
      }
    }
  ```

This is a service domain example where we have a set of categories, which is the entity `Categoria`, and after these entities
we want to receive a text, and assume that the categories are related by parent and child. We would have this logic inside
a separate file, such as `FiltrarCategorias.ts`. 

In this file we have logics, application rules (how we organize the categories after a query), and it does not make sense
to be inside the  Categoria entity, as a static method to filter the categories.

The reason for it is because inside the entity we put the behaviors of that specific category, and not all from the app's. 

In this case, we can clearly see that we are working with all the categories/set of categories and not with a specific one.

## Lesson 2 - Where to put the rules? 








### Aggregate Concept

An aggregate is a combination of many entities and value objects that are persisted in a transactional way, they are persisted
together.

Suppose we have a `Curso` inside an "ead" system, and a `Curso` entity, which have multiple `Capitulo` entity which have
multiple `Aula` entity.
But at the moment we want to save a new `Curso` with all these elements along with it. Suppose we have a `Curso` with five
chapters and eighty lessons. The `Curso` will consist of multiple VOs, as well as the chapter, and so on.

The fact is, we will have a set of multiple entities and value objects, and the aggregate is persisted in a "single" manner.
