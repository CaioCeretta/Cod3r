## In this folder, we are going to create an e-commerce using Object Oriented Programming

  ▣ In procedural function, once we passed through the main concepts, such as scope, stack, functions, parameters input,
  relationship between data and a function and a function as a data transformer, be it by transforming a data it received
  as a parameter or transforming a data of a bigger scope, such as global, this is how functional programming works.

  ● POO Paradigm

    ○ POO couples data and behavior, where we had "unattached" functions before, where a function call other, receiving
    parameters or not. Inside POO we have functions inside a structure, which is also a data, and within it, we may have
    types such as string, number, boolean, and each data is going to be managed by a data structure, and this object
    can reference another objects and the object can also have functions inside of it. Therefore, it's like a capsule that
    couples both the elements. 

    ○ Every programming is based on data and behavior, and this is no be different in POO. In fact, the object itself represent
    custom data, which becomes part of the behaviors defined within it. Instead of having detached functions modifying global
    data or data that exists outside their scope, OOP couples functions and data inside within a single that references 
    itself. 

    ○ Before, when OOP still didn't exist, it was basically inputs transformed by the function and returning an output.
    Now with OO, we get the function's structure — in a similar manner, getting inputs, transforming and returning them —
    but this structure, besides the functions, own the data.

    ○ However, what happens now is that in many cases, we won't need to receive the inputs, because the data can already
    exist within the object, in a way that a function that once received three parameters, now doesn't receive any, because
    all the data belong to the object. Meaning that this function don't need to receive the data from outside. Now, we are
    able to, internally, access the needed data. 

    ○ `This and Self Concept`, this is the concept that the structure can reference itself, because the function part can
    access data both to retrieve and alter its internal data.
      One of the advantages of having this structure is that we can apply a level of data visibility that no one besides
    the object is able to read and update it. We are not required to do so, but many times it make sense, where we place
    the data inside the object and we end up having one more scope, that is, we have the local scope, object scope (that
    is a larger scope but is inside a structure), and the global.
      While procedural programming have two scopes, local and global (not considering node that has a module scope), and
    in OOP we have local, inside the function, we can also have variables and functions that have only the object scope
    and the global one.

    ○ We know that any application folder structure is divided in folders and files, and the way we are going to do so,
    like: "In this folder i'm going to separate the functions, in this other one an object, in the other one a data array,
    and so on". In the end of the day, these files are going to have a relation, and eventually we can have an app that
    uses the OOP paradigm, but in a certain moment, we decided to only create functions because we not chose to create
    a more complex data to it. 

    ○ Normally when choosing to work with OOP, we end up prioritizing the objects creation inside the files.



  ● Refactoring Procedural Code to POO

    ○ First thing we can do is to transform the cart into a class, by simply moving the functions to the class scope, making
    it now methods, remove the export and function keywords from it.

    ○ The only property needed is the items, which we'll add and get products, which in we'll simply add the this in front
    of the attribute and it will reference the current instance.
    
    ○ We don't export the Cart class, but an instance of cart. We do this, because we want the cart to be treated as a singleton
    and every time the user, in one session, accesses it, it will access the same instance

    ○ Inside `menu`, instead of importing all functions from the cart file, we simply are going to import the cart instance
    and access all functions within the same structure.

    ○ We can also reduce the function names, for example, addItem, can simply be add, because knowing that we are in the cart
    context, it will be easier to know that we're adding a product

    ○ We can also change the getTotal method, to a new `get` total() method. This way, total is now been treated as an attribute
    and do not need to be called with parentheses

    

  ● Comments about POO code

    ○ We've created birth and marriage as new instances of Data, they are both different instances coming from the same
    class, because after the same class we are able to create different instances. This is important and is the essence
    of OO, because the class is a blueprint, and the instances are the realizations, when we turn that blueprint into
    something concrete. Therefore, when instantiating a new object, it will have the attributes and behaviors defined
    inside of the class structure. 

    ○ Regular getTotal() method and a `get total`

      ■ getTotal(): number {}: getTotal() is a regular method, we must call it using parentheses — cart.getTotal(). It is
      explicitly a function meant to perform an action or calculation

    ○ Getter: get total()

      ■ get total(): number {}: Defines a getter, also called a property accessor, we can access it like a property without
      parentheses — cart.total. Even though it's a function behind the scenes, it feels like reading a variable. It is good
      for computed properties that should behave like normal fields










