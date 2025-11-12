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

We will start working in our app to examples, by creating a grouping of `Pessoa`'s by region after their CPF.

### Rich Domains

A rich domain consist of entities, value objects, domain services and events

#### Domain Services

We are working with Domain Services, and the idea is not to "dive in" a domain service yet, because there is a logic sequence
so we try to fit a given behavior. 
The way we are supposed to think is:

Priority No 1: The first place where we will try to fit a given logic is inside a value object, it is the place we will
try to explore the most to reduce the entities complexity, by making it lighter, since the entities will be groupings of
vo and each vo with its responsibility make the entities simpler, because by default, entities have a bigger data grouping
and when we are not able to fit the logic inside the vo, we move to the priority number two

Priority No 2: The second place would be an entity, and when we tried to fit, we also were'nt able because:
. It involves multiple entities of the same type 
. It involves different entities in the logic
Then, we place the logic inside the third option, which are the domain services.

There should'nt exist logics inside the application services (use cases), because they will focus more on the flow 
orchestration, developing a flow based on a use scenario of a given user rather than having a business rule.

Therefore, we will create domain services focused in that specific rule that didn't fit anywhere else. This logic is
usually inside a single file which can be reused in many different use cases, like

. Use case to check the customers by region
. Consult the sales by region
. Sales by customer

## Lesson 3 - RegiaoCPF Value Object

Lesson will be focused on the vo implementation

We start by defining a constructor saying that every RegiaoCpf must receive a code and a list of states.

Then define a `Todas` static method. Which consists of which states represent each code.

Once we have specific regions and instantiate a RegiaoCpf after them, it does not make sense to leave the constructor "open".

We can also create specific variables for each region like
`static readonly `DF_GO_MS_MT_TO = RegiaoCpf.TODAS[1];`
  . This works as a "single_instance" meaning that we won't need to instantiate multiple times for a single digit, we are
  able to instantiate it only once.

### `TODAS` Enum

  We could think of creating `TODAS` as an enum, however, we created as a static readonly, here are some reasons for the
  choice.

  1. Data Complexity

    The primary reason is because `TODAS` will have to store **full objects** that contain **multiple information** for
    each region, something that `enum` simply can't do.

    1. `TODAS` structure: Stores an array of `RegiaoCpf` objects.
    2. Content of each object: Each object has two crucial properties
      • codigo number:  (Value of the digit)
      • estados: string[]: a list of strings

    If it was an `enum`, we would only be able to have the key `RS` and a single value (ex: `8`), but we would'nt be able
    to associate the list of estados (`["SP"]`) to this member in a clean and direct way.
  
  2. Guarantee of Uniqueness and Static Access

    The use of `static readonly TODAS` ensures a **unique and fixed access point** to every predefined region, simulating
    the idea of an `enum` (a closed set of fixed values), but with the flexibility of being an array of objects.

  3. Ease of lookup (Search)

    Being an array (instead of an object or complex `enum`) makes the search functions simple and efficient, specially
    the `porCodigo()`

    The ordered array structure, where the `index` is the region code itself, is what makes that lookup instantaneous, it
    would be an efficiency harder to replicate with an enum that maps to objects.

### Rich behaviors: 

  • `static porCpf(cpf: string): RegiaoCpf{...}`: Way of retrieving a CPF region by the cpf number, this function works as
    . Creating a `codigo` constant which gets that cpf, and assign to it that eighth digit.
    . Which the code, call RegiaoCpf.TODAS with the code, such as `RegiaoCpf.TODAS[codigo]`

  So if, for example, we would like to get all the customers from 'SP´. Then we simply call RegiaoCpf.SP and retrieve them.
  
  • `static porCodigo(codigo: number)`: Multiple times we will want to get a region after the code.

  • igual(outraRegiao: RegiaoCpf): boolean 

  • diferente(outraRegiao: RegiaoCpf): boolean



## Lesson 4 - RegiaoCPF Tests

With the tests we can understand best how the functions itself works 

`RegiaoCpf.porCodigo()`. in this test, we used it to create a cpf of a given region based on its code it, which we
used 0. The function uses the code inside its parameters to call the function TODAS[code], and it returns a new instance
of RegiaoCpf based on that code. The second parameter of the RegiaoCpf is an array of states that belong to that object,
and since the id 0 has only the estado "RS". instance.estados[0] should be "RS"

RegiaoCpf.porCpf(). in this test, we created a RegiaoCpf by informing a cpf. We pass a cpf as argument, the function retrieves
the eighth character of that parameter, store it in a constant, and call the method TODAS with the code, which returns a
new instance of RegiaoCpf based on that code. Meaning that by passing a cpf with the eighth character "0", and checking
the estados[0], it should return 'RS'
 
methods `diferente` and `igual`: This method is simply, it simply checks whether the `codigo` in these instances are the
same or different.

Check if undefined is equal or false, this has an expected behavior.

## Lesson 4 - RegiaoCPF Tests

Use this value object inside the class Pessoa, our cpf constructor receives one parameter, that is the cpf, and have access
to multiple rich methods.

We will add a `get regiao(): RegiaoCpf { return RegiaoCpf.porCpf(this.valor) }`.

Adjust the tests to add the newly added method.

## Lesson 5 - `PessoasPorRegiao`

Assume that we have a business requirement to group people by region based on their CPF. We don't have a better
way to distinguish them, so we'll use use their Cpf to perform this grouping.

This is a business demand asking us to implement this functionality or logic. The first question we have to ask is: 
**"Should this be placed inside a value object or an entity?"**.

At first we might think of putting it inside `CpfRegiao` value object, but would it make sense to include the `Pessoa`
entity inside a value object? The answer is no.

A stronger candidate could be the `Pessoa` entity itself. However, if we consider the responsibilities of a `Pessoa`, we
realize that it is responsible only for its own rules and behaviors, not managing or grouping all the `Pessoa` instances
in the application.

We could technically create a static method inside `Pessoa` called `agruparPorRegiao`, which returns an empty array, for
example. This method would be shared across all instances of `Pessoa`. But since this functionality deals with a collection
opf entities, rather than a single instance, the entity is not the most appropriate place for it.

As stated in the DDD book, our natural tendency is often to create a static method in the root entity of an aggregate.
However, that approach goes against the principle of keeping entities focused on their own behavior. Instead, **this kind of
operation should be implemented in a domain service**, which is precisely meant to handle operations that involve multiple
entities or concepts that don't naturally belong to a single entity or value object.

### PessoasPorRegiao domain service

The `agrupar` method  inside of this class returns a Map<RegiaoCpf, Pessoa[]>, but how does a return map works? 

#### Function return type Map<>

  The type `Map<K, V>` is a js native structure that represents a key->value mapping

  In this case

  K (the key) is `RegiaoCpf`
  V (the value) is an array of `Pessoa`

  it is a map where every key is a `RegiaoCpf` and its value is a list of `Pessoa` belonging to that region.

  A practical example would be

  ```ts
    const pessoas: Pessoa[] = [
      new Pessoa("Joao", '123.456.789-00')            
      new Pessoa("Maria", '123.456.689-00')
      new Pessoa("José", '123.456.589-20')
    ]

    /* Each Pessoa has a CPF that can be associated to a `RegiaoCpf`. The grouping method can generate something as*/

    Map {
      RegiaoCpf('Sul') => [Pessoa('Joao'), Pessoa('Jose')]
      RegiaoCpf('Norte') => [Pessoa('Maria')]
    }
  ```

  We can notice that our objects of value starts being "richer", since that when reducing over the array of pessoas, each
  pessoa has a `cpf`, which is a value object and this cpf value object has a function that will get that pessoa.cpf value
  and call the regiao getter, which receives the current cpf as parameter to the function that retrieves a `regiao` by cpf.

  Therefore, we have a cpf value object, which has another value object that represents the region of that cpf, and we
  start making these logics way simpler because we are dividing part of the logic in different places.


#### Method implementation

Moving back to our example, 

  ```ts
    agrupar(): Map<RegiaoCpf, Pessoa[]> {
      return this.pessoas.reduce((map, pessoa) => {\

        const regiao = pessoa.cpf.regiao;

  
        const pessoasDaRegiao = map.get(regiao) ?? [];
        pessoasDaRegiao.push(pessoa);

        map.set(regiao, pessoasDaRegiao);

        return map;
      }, new Map<RegiaoCpf, Pessoa[]>());
	  }
	``` 

  Reduce accumulator initial value is an empty `Map<RegiaoCpf, Pessoa[]>`, and on each iteration, we store the person`s
  cpf region after the cpf.regiao and we use the get method of map.
  Since we initialize reduce with a new Map<RegiaoCpf, Pessoa[]>, the variable map is an instance of `Map` class.
  .get(regiao) is the default method in all instances of Map to recover the value associated to a specific key

    • If the key exist in the Map, it returns the corresponding value (in this case, the Pessoa[])
    • If the key doesn't exist, it returns undefined

  In our domain service context, `get` is used like this:

    1. He tries to find the list of `Pessoa` for the corresponding `regiao`
    2. If it finds, it continues using the array
    3. If it doesn't find (undefined), the nullish coalescing ?? enters and create a new empty array with that pessoaRegiao

    This ensures that, at each found region, the grouping process always start with a empty list, avoiding errors and allowing
    the correct push of the new person

#### How does map.get(regiao) knows we are talking about the `codigo` and not the `state`

  This has to do with the way Map deals with objects as keys

  JS `Map` uses equality by reference, which means that, if the key is the same object in memory, to determine if two objects
  are equal.


  A scenario:

    In the `agrupar` method, the key is generated like this:

    ```ts
      // regiao is a reference to the object RegiaoCpf returned by pessoa.cpf.regiao
      const regiao = pessoa.cpf.regiao

      // 2. map.get() fetches the value using the REFERENCE of this regiao object
      const pessoasRegiao = map.get(regiao) ?? []

      // 3. The same method is used to store the value
      map.set(regiao, pessoaDaRegiao)
    ```

    • What happens: When `reduce` processes the first person of the region 8, it stores the object RegiaoCpf(8, estados...)
    over a memory reference. For every person of that same region in the same iteration, the pessoa.cpf.regiao is returning
    the same object or, if it is a well implemented object of value, an object that Map considers identical by its implementation

    • If `RegiaoCpf` is a singleton, if the class ensures that RegiaoCpf.porCpf(valor) always will return the same instance
    for the same code, the map.get() works perfectly, since the reference is always the same

  ● So as conclusion, since in every iteration, a `pessoa.cpf.regiao` returns a new `RegiaoCpf` to us, and when we execute
  a new map.set(regiao, pessoasDaRegiao), other than linking the pessoa with the regiao, it will create a new key with that
  RegiaoCpf, so when we call, on the test, agrupadas.get(RegiaoCpf.SP), RegiaoCpf.SP is equal to an instance created by
  the RegiaoCpf which already was instantiated0

  

## Lesson 6 - `PessoasPorRegiao` testes

  The first method is 

  `test("Deve agrupar as pessoas da região de SP", () => {...` and this test work as follows:

  1 Preparing and execution
    . calls the `PessoaBuilder` to create a list with 10000 `Pessoa` entities, each containing a valid CPF
    . It instantiated the `PessoasAgrupadas`, with this list and calls the `agrupar()` method
    . The method then uses Array.reduce() to iterate through the list. For each `Pessoa` it extracts the `RegiaoCpf` via
    pessoa.cpf.regiao and populates the accumulator, returning the final Map<RegiaoCpf, Pessoa[]> structure
  the agrupar() method

  2. Query and Validation (assertion)

    1. **Querying the map**: the test accesses the group result using the native Map.get() method:
      `const pessoasSP = agrupadas.get(RegiaoCpf.SP) ?? []`
    
      This step demonstrates the efficiency of this service. It retrieves all people from São Paulo by using RegiaoCpf.SP
      Value object as the look up key, the nullish coalescence ensures an empty array is returned if no people from SP were
      generated
    
    2. Assertion: The final assertion iterates over the retrieved pessoasSP array and checks the condition for every person
    in the list.







  



















  





















### Aggregate Concept

An aggregate is a combination of many entities and value objects that are persisted in a transactional way, they are persisted
together.

Suppose we have a `Curso` inside an "ead" system, and a `Curso` entity, which have multiple `Capitulo` entity which have
multiple `Aula` entity.
But at the moment we want to save a new `Curso` with all these elements along with it. Suppose we have a `Curso` with five
chapters and eighty lessons. The `Curso` will consist of multiple VOs, as well as the chapter, and so on.

The fact is, we will have a set of multiple entities and value objects, and the aggregate is persisted in a "single" manner.
