## Entity / Relationship Model

E/R is a way of thinking, it's a paradigm of how we organize the data in our applications. This model only has one mechanism
of how the data relate, which basically consist of primary keys and foreign keys, every other relationship types is an
outcome of this. 

Entity is essentially a tuple inside a table, where the table is the structure en the entity is what we store in the tuple
(db row). This table that defines the structure of how the data is organized, since a relational db is one that has a schema
, that is a structure that defines how the data is going to be organized,  inside a E/R model we have tables with multi ple
registries and within this set of entities we have the definition of its attributes that are called columns.

Let's use a Courses table as an example.

It may have, in its first column, an ID attribute, which can be auto-incremented, a UUID, random string, etc.

Now let's say we are using a sequence of IDs like 1, 2, 3, and so on.  Sometimes when we try to insert a record — for example
with the ID 8 — the insertion may fail due to a constraint (such as uniqueness violation). As a result, we could end up
with a missing number in the sequence. That number (in this case, 8) is "lost" because the attempt to insert it caused
and error, and the sequence counter kept moving forward.

## Registries

We want to make a relationship between a course and a lesson.

The lesson table will also have its registries, which will also have its attributes which represent the columns and each
one of these rows will have a primary key, which mainly are

surrogate key or an artificial key — which are keys that do not come from the business nor is significative to the business,
its only goal is to identify one registry in the db

Every primary key generate some index inside the db, an index is like a book index, it will have the data structures to
organize and sort them, so it can easily fetch a registry within a large amount of information.

Therefore, a primary key is what defines the attribute that uniquely define that register in the db, and it can "travel"
to other tables as to establish a relation via `foreign key`, which means that we could have a column on the lesson
table referencing the `course_id`, which will be "physically" related to the course table as a fk. Now, basically, if we
add a course of `Java` with the id of 3, we can have a lesson related to this course through this fk.

There are three times of relationships

`One to One`: Man and woman on a monogamic relation, we have the id of the man, the id of the woman, and we have the
freedom of choosing which primary key will travel to the other table, everything depends on the most frequent type
of queries, for example, a woman's health management system and the table can have a column of the spouse id, which is
the `husband_id`, and for it, in the woman's table we have a unique foreign key (otherwise it would be one to many). Therefore
we are saying that a woman with the id 7 and a man with the id 3 which are married, they will only have a unique foreign
key related to each other. By the time we have this constraint, we have a one to one relation

`One to Many`: Mother and children table, and we want to say that a mother has many children, in every row of the children
table we are going to have a `mother_id` column.

`Many to Many`: For this example, let's say we have a uncle table and a nephew table, in the nephews table we have two rows
'Pedro' with the id 7 and 'Ana' with the id 8. In the uncle with have 'João' with the id of 2 and 'Maria' with the id of 3.
Now, to establish a many to many relation we have an intermediate table, such as `Uncle_Nephew` table, and basically we
essentially are going to have the `uncle_id` fk, and also the `nephew_id` fk, and now to relate them, by saying that João
is Ana's uncle, we simply create a row with both of them.

## ER Model !== POO

These are two models that are not completely different, because sometimes we can even translate one into the other.
However, the way of thinking is very different. What often happen is that when someone takes an E/R model and tries to
replicate it using OOP, they end up bringing a design that was originally intended for a relational model into an OOP
application. This is problematic because it contaminates the object-oriented design, limiting it to the paradigm we are
used to.

Many developers start by modeling the database — creating tables, thinking about how data will be persisted, and then
building the project based on that. The problem is that the paradigm influences how we think and plan. Paradigms don't
change easily. Just like in coding, frameworks may change, but the way developers are used to program typically doesn't.

Therefore, when modeling our OOP application, the more decoupled it is from the the E/R model — and the less it is contaminated
by the DB structure — the better. Of course, we still need to consider performance, and every application has its own specific
needs. However, we must be careful not to create "poor" OOP design by simply replicating the relational database structure.

### In the OOP world the types of relationships are different

In the OOP world, relationships are not through keys — primary key and foreign key. The relationship is created when an
object having a reference to the another one, we essentially have three ways of reuse, the inheritance, composition and
`ctrl c + ctrl v`. Therefore, most of the time we are working with composition, which is the most common way we find relations
in the real world, e.g. a car HAS an engine which HAS a piston, a car HAS a door that HAS a handle and so on, we start
compounding complex objects with others more simple objects.

## Cascade 
When we have, for instance, an order (which is an object) and order items (which are objects related to that order), we can
configure operations between them to behave in a `cascade` manner.

When we persist and order and the operation is marked as `Cascade`, the related order items will automatically generate
as well — that is, when an order is saved with cascading enable, its items will be created automatically through cascading
behavior. The same applies to other applications, such as deletion; when a order is deleted, all related order items will
also be deleted automatically if cascade deletion is enabled.

Cascade functionality is also useful for avoiding foreign key constraint errors. Using the same example,. we cannot delete
an order if its item still exist,due to the foreign key constraint. But when we use Cascade on delete, we are essentially
saying "delete this order and all the order items that are related to it".

## ORM — Object Relational Mapping

ORM sites between the Entity-Relationship(E/R) model and Object-Oriented-Programming (OOP). It provides abstraction layer
that allows us to map database entities in the application, enabling a more natural object-oriented approach. This includes
features like inheritance and composition on the application side, while still working with primary and foreign keys on the
database side. The ORM handles the translation between these two representations.

### Intrusive Framework
However, when we use a highly opinionated or intrusive framework — one that enforces specific patterns and conventions — it
may strongly influence the way we write our code. These frameworks typically require an explicit mapping between tables
and objects.

For example, a table has columns, while an object has attributes with values. The ORM mapping ensures that a column X in
the database corresponds to an attribute X in the object, But it might  also impose strict requirements such as.

. You must follow a specific naming pattern.
. You must use getters and setters.
. Attributes cannot be private

This tight coupling can lead to problems. To satisfy all the framework's requirements, we end up introducing boilerplate
code and structural constraints that are not necessarily aligned with the application's needs — compromising maintainability
and design flexibility.

Let's think in this example

We have a table named `Organization`, which has a relationship with another table called `Companies`, This table is related to
a third table called `Sites`, which interacts with a table named `Sectors`, and that in turn has a relationship with a table
called `Employees`. 

If we start fetching data in a cascade manner — loading all related data in one go — querying a single record in the organization
table could trigger a fetch for all its related companies, then all related sites, then sectors, and finally employees. 
As a result, instead of retrieving one single record, we might end up loading thousands of records from multiple related
tables. 

ORM frameworks can simplify this process significantly, but it's essential that we remain in control of what is being
loaded. While an ORM helps avoid doing the manual labor of mapping every table and column, it should be used when it
adds value. There will always be situations where it's more appropriate to write raw SQL queries to retrieve exactly
the data we need, in the most efficient way possible.

An ORM framework can often help, but it can also hinder performance and flexibility if not used properly. The issue is not
with the technology itself, but with how we choose to use it — especially when we're working under time pressure and
skip proper design decision.

In the past, many systems relied heavily on eager loading (automatically loading all related entities), which led to serious
performance issues. Later, when developers tried to fix this "technical debt" by switching to lazy loading, they often ran
into new problems: null pointers exceptions, unexpected data access errors, and a lot of debugging headaches.

Prisma, on the other hand, is a good option in these cases because it does not interfere with our modeling. In fact, our
domain modeling isn't even aware that Prisma is being used. From this perspective, prisma ends up being a very solid and
non-intrusive choice for working with databases.

## Prisma Comments

In SQL we have DDL "Data Definition Language", basically, we have to create a structure in the database so we can use our
data, the DDL is when we create a table in the database, for instance, a `User` table that will have an id of type number,
aa `VARCHAR` name, another field of type boolean, etc. And after we define this structure we are going to be able to persist
records on the db. 






### Random Comments

1. A schema is also a metadata, is the data definition, metadata is essentially a data that describes a data. Basically
   on our `schema.prisma` file we have a metadata file, that describe the db structure, and whenever we run a command
   to make a new migration, it executes all this steps again, if we remove password, add password, and so on, it describes
   the data in the way it evolve over time. 