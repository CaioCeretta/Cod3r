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

    ○ Product will be a class, where we instantiate a Product. This class can only have a constructor and every attribute
    is informed in the constructor with readonly.

    ○ Where we call the full string using the product name and product price toFixed, we can now create on method in the
    Product class to format the same string and increase readability on the code. And since now, Product class has a behavior
    it makes even more sense for it to be a class and not just a type

    ○ The same thing we will do for the Item, which, since we have the product on the item class, we can call the product's
    formatted method and concat it with the quantity

    ○ Now, when we add a new item, since the items is an array of item and item is a class, we no longer can simply pass
    an object to the add function, but we need to use it inside an Item constructor

    ○ The cart total, since it is now a class, we can add a get formattedTotal where it will already format for the
    menu and we would'nt need to code how it should be displayed

    ○ We also have many functions related to the terminal in its file, which they turn into class methods. and each one
    will become static so there is no need to instantiate the terminal. One note is that a class where every method is
    static, and we can simply use a module with named functions (as we were doing, or a literal object) 

    ○ Menu can also become a class, but instead of creating attributes, we just want to use the methods inside the function
    similar to Product, but the opposite, it will simply have a render method, which will wrap the whole code, no constructor
    and instantiate it with new and no parameters, and call menu.render()

    ○ We'll also create a merge function, on the `Item` class for merging items that are bought more than once

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

    ○ Product can be a simple interface, as we did in procedural, but it could also be a class. However, since Product do
    not have any behavior and serves only to represent data, as in our case, it can remain an interface, because a `class`
    is necessary when we want to encapsulate behavior related to the data, such as an  `applyDiscount` method

    ○ Classes are made to create instances, with the this state and behavior, if we never instantiate one and make all the
    methods static, it will only be used as a virtual namespace — which is not the original intention of a class. Therefore,
    is more idiomatic export functions or an object, but in the program code, we'll keep it as a class for education purposes.

    ○ One thing we did that may sound wrong is, the product quantity is on the cart item and not on the cart, but why is it?
      ■ Since we can start "delegating" these responsibilities on different classes, we chose to make the merge responsibility
      on the cart quantity, inside the own item, because it understands its identity, know its responsibilities, and is the
      owner of the attributes, so it end up being the right place.

      ■ In OOP, since the class is the owner of its attributes, we end up bringing the behaviors to the class to make the
      relationships more close and makes more sense at the end of the day.



    










