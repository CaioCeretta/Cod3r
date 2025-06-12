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
the `husband_id`, and for it, on the woman's table we have a unique foreign key (otherwise it would be one to many), 


  