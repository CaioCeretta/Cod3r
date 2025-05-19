## POO

### Before x After

#### Before

In the past, computer programs were a bundle of technologies, which could generate collateral effects

The techs mas mostly HTML, CSS, JS, and we basically we created a folder for each technology and organized the project
based on it.

It was usually a mess with low scalability, and, added to it, there were some technologies server side, such as PHP/Java,
which were also part of the mess.

#### Now

Nowadays, our applications are organized in components, a component is the union of HTML + CSS + JS/TS, and it have this
idea of being a fragment of an application, which can receive inputs to parametrize these components in order to show it
in the way desired.

The frameworks that fit are, for example, angular from the version 2 up to now; Vue.js; React; Flutter, are all based
in components.

In the end, we'll end up having a component tree, let's use a login page as an example:

Page > Header > Logo, Menu > MenuItem, Content > Title, Main, Footer > Logo, Links

### Paradigms importance

Each paradigm, has its own restrictions/disciplines and, these are the main pillars in functional programming:

#### Functional Programming Paradigms

###### 1. Immutability

. Data does not change, instead of modifying existing values, new ones are created
. Example: Instead of updating a list, a new one is created with the desired values

###### 2. Pure Functions

. Always return the same data for the same arguments
. They do not have side effects (don't change external variables, files, database, etc)

✅ Pure Function:

const sum = (a, b) => a + b; // pure

❌ Example: Impure function with side effect:

let total = 0;

const impureSum = (value) => {
total += value;
return total;
}

The problem is that it modifies the total value outside the function, and as a result, the return depends on the previous
value of total.

###### 3. High Order Functions (HOC)

. Functions that receive other functions as argument or return function

. Example

const apply = (fn, value) => fn(valor)

###### 4. Function compositions

const double = x => x \* 2;
const sum3 = x => x + 3;
const compose = x => sum3(double(x))

###### 5. Referential Transparency

Referential transparency is when a piece of code is referentially transparent if we can safely replace that piece of code
with the value it computes and vice-versa, anywhere where that piece is used, without changing the meaning o result of our
program.

e.g.

const add = (a: number, b: number) => a + b

this function is referentially transparent. Why? Because we can replace all occurrences of this function with the expression
it evaluates to, and then with the value it computes, at any point in our program. For example, let's say we have a small
expression called five:

const five = add(2, 3)

We can safely replace five with add(2,3), with 2 + 3, or with 5 anywhere in our code, where the value five is used. By
consequence, all the expressions below are identical in meaning and output

const ten = five + five
const ten_v2 = add(2,3) + add(2,3)
const ten_v3 = 5 + add(2, 3)
const ten_v4 = 10;

An expression is referentially transparent if we can do this back-and-forth replacement anytime anywhere, without changing
the meaning and output of our program.

It provides two key benefits:

1. Refactoring:
   . Repeated expressions can be safely replaced with variables, reducing duplication and improving readability
   . Complex expressions can be broken down into smaller, named components, making code easier to maintain

2. Mental Space
   . RT allows predictable, side-effect-free code that's easy to trace and reason about
   . This reduces the need for complex debugging tools and makes understanding and maintaining code simpler.

Example:

Before Refactoring (repeated & complex):

function add(a, b) {
return a + b;
}

function compute() {
const result = add(2,3) + add(2,3) + add(2,3)
console.log(result)
}

After Refactoring (clearer with variables):

function add(a, b) {
return a + b;
}

function compute() {
const sum = add(2, 3);
const result = sum + sum + sum;
console.log(result)
}

since add(2, 3) is referentially transparent (always returns the same result with the same input and has no side effects)
we can safely extract it into a variable — this avoids duplication and makes the code more readable and maintainable.

##### 6. Recursion Instead of Loops

. Instead of using for and while, repetition is done through functions that are called recursively

Example:

const factorial = n => n <= 1 ? 1 : n \* factorial(n - 1);

### POO Paradigms

#### Encapsulation

What it means:

Encapsulation is about bundling related data and methods inside a class, and hiding internal details from outside access
to protect the object's state

It's useful to keep the data safe from unwanted changes as well making our code modular and easier to maintain

```ts
class BankAccount {
	#balance = 0 // private field

	deposit(amount) {
		if (amount > 0) this.#balance += amount
	}

	getBalance() {
		return this.#balance
	}
}
```

#### Abstraction

What it means:

Abstraction means hiding complex implementation details and only exposing the necessary parts through a simple interface

Why it's useful?

It let's user interact with objects without needing to understand their inner workings as well as reduce complexity

```ts
class CoffeeMachine {
	makeCoffee() {
		this.#boilWater()
		this.bewCoffee()

		console.log('Coffee is ready')
	}

	#boilWater() {
		console.log('Boiling water...')
	}

	#brewCoffee() {
		console.log
	}
}
```

Here, we are abstracting away the complex steps involved in making coffee (like boiling water, brewing, temperature
control, etc.), and giving the user a clean and simple method:

#### Inheritance

Inheritance allows one class (child) to reuse code from another class (parent), and optionally extend or customize its
behavior.

Why it's useful ?
Avoids code duplication as well modelling real-word "is-a" relationship

```ts
class Animal {
	move() {
		console.log('Animal moves')
	}
}

class Bird extends Animal {
	fly() {
		console.log('Bird flies')
	}
}
```

#### Polymorphism

Polymorphism means "many forms" — it allows methods to behave differently depending on the object calling them, even if
they share the same name

Why it's useful:

Makes the code flexible and easier to extend as well promotes interface reuse

```ts

class Animal() {
  speak() {
    console.log("Animal speaks")
  }

  class Dog extends Animal {
    speak() {
      console.log("Dog barks")
    }
  }

  class Cat extends Animal {
    speak() {
      console.log("Cat meows")
    }
  }
}

```

In short:

Encapsulation: keeps the details inside the object and a real world analogy is a capsule medicine — works inside, safe outside

Abstractions: shows only what's necessary, and a real world analogy would be car pedals — you don't need to know how the engine
works

Inheritance: Reuses and extends behavior, parent-child relationship

Polymorphism: ALlows different behavior using the same method, like a remote "play" button works for tv, music, or streaming

In POO, there's a technique, which is very popular, that is the composition, the composition promotes reuses, and by promoting
it, paradigms such as `OO`, `Structured Programming`, and `Functional Programming`. We use composition all the time. Basically
what happened is that we created a model that resembles `OO`, since what before was separated by technologies, we now have
a component that encapsulates HTML, CSS, JS. Consequently, we can think of a component as an object. In fact, when we look
at `React`, for example, components can be defined through functions or classes.

javascript doesn't truly in the traditional object-oriented sense. What is has is something called `Syntactic Sugar`— features
that make the code look cleaner or more familiar, but under the hood, it's still based on functions. At the end of the day,
class syntax in JavaScript is transformed into functions and prototypes.

In Javascript, a function can be instantiated using `new`, just like classes. When we create a <Component /> in React, internally
Javascript is instantiating an object that encapsulates structure, behavior, and styling — bringing together HTML, JS and
CSS — often referred as a composition of technologies

When we think of the component tree, we can visualize it as objects composed of other objects. For example, a page object,
might be composed of a header, content, footer — and those, in turn, might be composed of smaller elements like logo, a
navigation bar, or text blocks. This is what we call composition.

In contrast, `inheritance` models an "is-a" relationships (e.g., a Dog is an Animal), while composition models a "has-a"
relationship (e.g., a Page has a Header). React favors composition over inheritance, as it provides greater flexibility
and modularity in building UI components.

Therefore, in a react application, we can observe both `object-oriented` and `functional programming` principles. Once we
understand these paradigms, we can see how they are applied and expressed within the framework

#### Sharing Data in Component Trees

One important question when designing a component trees is: "How am i going to connect the components" and "How will
i share data between multiple elements within a tree?"

For example, when the `Footer` component includes a `Link` component, we can easily pass props from parent to child — this
is direct communication via component composition.

However, when doing the opposite — for example, if a Link needs to respond to an action triggered by a distant Menu component —
we need `indirect communication`. In such cases, we can use `shared state` managed by external tools like `Redux`, the
`Context API`, or third-party state manages like `Zustand` or `Jotai`.

Basically, we should focus on two main aspects:

1. Component design — allowing them to receive props to customize behavior and appearance, and manage their own internal

2. State sharing - making it possible to synchronize data between components, even if they are far apart in the component
   tree.

--------------------- First Lesson Ended --------------------------------------

## Default Color Scheme in tailwind

:root {
--background: #ffffff;
--foreground: #171717;
}

@media (prefers-color-scheme: dark) {
:root {
--background: #0a0a0a;
--foreground: #ededed;
}
}

by having this code in the global.css, what he'll do is check the configuration of the system, and add the variable --background
to the local css vars, then, on the css body rules, he will simply apply the background-color: var(--background) to dynamically
change its value.

## Tailwind / PostCSS / Autoprefixer

@theme is not part of tailwind nor part of the css specification, it may be part of postcss, which is a tailwind dependency

PostCSS is a tool that processes our CSS with plugins, working as a "transformer". It does not make "anything by itself"—everything
depends on the plugins that we use with it.

We can think of PostCSS as a "Webpack for CSS": it reads our CSS and let plugins handle what we wrote—be it adding prefixes,
supporting variables, transforming new syntax, etc.

Tailwind, is in fact, a PostCSS plugin, when we write on top of the file

@tailwind base;
@tailwind components;
@tailwind utilities;

Tailwind reads it via PostCSS and generate all the utility classes.

In practice:

1. We write our CSS with @tailwind or even @apply
2. PostCSS executes all the plugins we've configured (Tailwind, Autoprefixer, etc)
3. It transforms our css based in it
4. Final result: A big css and ready for production

a postcss.config.js example would be

```ts
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
}
```

In this case, tailwindcss transforms @tailwind, @apply,etc, and the autoprefixer adds prefixes such as -webkit-, -moz-,
etc, if necessary.

What about @theme?

It won't recognized by tailwind nor by pure PostCSS. It would only have effect if we had an extra plugin, such as
. postcss-theme-function or
. some internal/private plugin that processes @theme

if none of these was configured, this rule is 'left over'

## File Structure

The default naming convention in Next.Js App Router for identifying a route is simply to create a page.tsx file. Next.js
will understand of which page we're talking about, (e.g. app/start/page.tsx, corresponds to http://domain/start)
will render that page.tsx

However, if we name the file anything other than `page.tsx`, such as `pages.tsx`, it will no longer recognize it as a route.
In the app router, it's not enough to have a file inside the app directory—it must be specifically named page.tsx in order
to be routable and fetched by the browser.

The `app` folder contains the layouts and the actual pages.
The `components` folder holds both reusable components and components that are specific to certain pages

Within the components folder, there's also a `templates` subfolder.

The templates folder contains shared structural components — such as menus, menu items, headings, navigation
— that are used across multiple pages and help define the layout structure

It was also created a folder, inside src, named data, it's used by the instructor for placing constants / contexts /,

## Layout

Why was it that when we accessed the /start page, the layout content showed but no the one of page.tsx?

For example, layout is going to be applied to all folders and files inside start folder including the page.tsx that's on
the same level.

But why is it replacing the content of page with the content from layout? e.g. Should show the text
start?

This happens, because for page.tsx be included in the layout, we can't simply create the layout component with some text.
We need to, inside layout, receive the current page content as children and display it where we want to in the structure.

Therefore, the layout always have priority and are required because it will help us define the page structure.

One of the biggest concepts of Next.Js is to understand the hierarchy pattern and how components are mounted, since placing
a folder on top of the other, other than affecting the path it's going to be referred to on the URL, it can also affect
the way components are going to be organized in the app.

## Template Comments

1. Usually, using h-screen on a page external div, will make the div occupy the whole height
2. For components that'll deal with structure and template of a layout/page, we can create, inside components folder, another
   folder named template which, for example, will hold the menu

## Icon as Props Comments

We'll need a destructuring with renaming for the icon, because what happen is, by doing const {icon: Icon } = props;;

props.icon is the value coming from the prop, and we are saying "I want to access props.icon with the name Icon inside of
the component", and since now Icon is now a variable that refers to the component, we use it as <Icon />

Basically, if icon was a string, we wouldn't rename it. But since it is a component, renaming it to Icon, with capital
letters, follows react component naming convention.

The other option would be passing the element to this child, such as icon={<HomeIcon />}, however we are going to be passing
an element and not a component, this is the fundamental difference

prop icon={HomeIcon} type: React.ElementType render it by: <Icon />
prop icon={<HomeIcon />} type: ReactNode | JSX.Element render it by: {icon}

Usually, the second ReactElement and <Icon /> approach is used when we want to have more control inside the component.
By doing this, we can apply conditional logic, such as only render if there is an icon, and it is the most common way in
reusable components.

where a prop would be passed, and we assigned const Icon = props.icon
<Icon className="h-4 w-4" />

JSX>Element and {props.icon} approach is when we only wants to inject the prebuilt element, such as

  <MenuItem icon={<MenuItem className="h-4 w-4" />}

<span>{props.icon}</span>

When using icons from a library, such as lucide-react, react-icons, etc, by passing only the name HomeIcon, for example,
that is part of a library, the component won't know from which library to import, and in these cases, the recommended
practice is to not pass the name of the icon as a string, but the component with the icon already imported.

If we still want to follow the approach of only passing the name of the icon, we would have to maintain a dictionary of
icon names inside the code, such as

import { Home, User, Settings } from '@tabler/icons-react

const iconMap = {
home: Home,
user: User,
settings: Settings,

}

and use

type MenuItemProps = {
iconName: keyof typeof IconMap;
}

const MenuItem = ({iconName}: MenuItemProps) => {
const icon = iconMap[iconName];

    return (
    <Icon className="h-4 w-4" />
    )

}

## Full screen height

In one div i used h-screen to occupy the whole screen, but the question of, is it enough to be responsive? should i use
a min-h-full emerged

✅ min-h-screen: Ideal for full-page templates/layouts
Ensures the content takes up at least the full height of the screen.

Commonly used on body, main, or a main layout wrapper.

Allows the content to grow if it’s taller than the viewport.

Prevents that “floating footer in the middle of the screen” effect when content is short.

📌 Usage example:

<main class="min-h-screen">...</main>
✅ min-h-full: Ideal for components inside a parent with a defined height
Only works correctly if the parent element has an explicit height (height: 100vh, flex-grow, etc).

Makes the child occupy all available height from the parent.

Very useful inside layouts using flex, grid, or sidebars.

📌 Usage example:

<div class="h-screen flex">
  <aside class="w-64 bg-gray-800"></aside>
  <div class="min-h-full flex-1"> <!-- takes the remaining height from the parent -->
    Main content
  </div>
</div>

✅ Final tip
If you’re building a layout that should:

occupy at least the full height of the screen,

allow content to grow,

have a footer that always sticks to the bottom when content is short,

then the best structure is:

<html>
  <body class="min-h-screen">
    <div class="min-h-screen flex flex-col">
      <main class="flex-1">
        Content
      </main>
      <footer>
        Sticky footer at the bottom of the page
      </footer>
    </div>
  </body>
</html>

## || (Logic OR ) x ?? (nullish coalescing)

### ||

Returns the first truthy value, which means that if the left value being compared is false, it will return the right one
so { secondary || ''}

if secondary is: `undefined`, `null`, `'' (empty string)`, `0`, `false`

'' will be used as the default value, any value considered 'falsy' will be replaced

### ??

Returns the right value only if the left one is `null` or `undefined` — And only these two values!

in the same example as above

{secondary ?? ''}

In this case, `'' (empty string)`; `0`; `false`, won't be replaced. Only if secondary is null or undefined

### When to use them?

. Use || if you want to replace any falsy value
. Use ?? when you want to replace only null or defined

In the whole example, secondary is part of TitleProps interface, and its value is optional (string | undefined), ?? is more
precise, because it avoids hiding values such as '', 0 or false, if in the future our type changes.

## State Reminders

There are two ways of a component to change, or the properties passed in its creation changed, or an internal state change

## Direct Comm

Let's take a variable named number assigned with a let

When changing its value, it still won't reflect on the user screen, but on the program itself, by consoling it, we can see
that the variable value changed internally, and we can notice a project pattern named `Observer` working.

Javascript is based on `Observer Pattern`, each event we are working on is based on it.

In react, every time the state changes, it will notify the interface, and it will also change.

The interface changing mechanism is always unidirectional: First the state changes and then the render is remade.

Therefore, by adding it to a state, when incrementing, the state changes and the ui re renders

Because this state doesn't have an internal state, the way for it to evolve, is when its properties change.

## Indirect Comm

Indirect communication happens when a parent component passes a function down to a child component. So we have:

parent -> function -> child

When the child triggers this function — for example, a button click handler — the parent gets to notified. That's because
the function passed is just `reference` to a function that is defined in the parent.

When the button calls that function, it's actually executing the logic written in the parent. This is how the child can
indirectly communicate with the parent.

Whenever we have a component tree that is not too extensive — a component which has only 3 children — it's very common that
the state is handled by the parent and the information exchange is made by direct communication.

For example, we have a shopping cart and its children are the cart list, a totalizator, and the checkout button which gets
the information and send to another process. This case is just an example, in more complex applications, we would use, maybe,
an external state to share the cart among other pages as well.

## Property in a state setter

### When prev is necessary

The property is necessary when we depend on the previous value of the state to calculate the next value. This happens because,
in some cases, the state may have not been updated instantly, or may other updates are happening in an asynchronous way
(in "batch", that is, many calculations at the same time). Using the previous value, ensures that we are always calculating
the next state with the most recent value.

example: `setNumber(prev => prev + 1)`

Here, we are saying: "Grab the previous value of the state (prev) and add 1". This is useful when we don't know if the last
update has already been applied or if it's happening a simultaneous update, what may lead to synchronization problems if
we don't utilize the previous value.

### When it is not necessary

If the update doesn't depend on the previous state, then we can simply update the current value, with no need of prev. That
is, when defining a fixed value or based only on the current value of a variable, prev is not necessary.

example: `setNumber(number + 1)`

In this case, `number` is the state current value, so there is no risk of it being outdated. But, attention: this can turn
out to be problematic if we have many sequential updates, because number may not be updated during all those changes (depending
on how React deals internally with state updates).

### Summary

. Use prev when the update depends on the previous value (for example, sum or subtraction based on the current value, or
transforming what needs the previous state)

. Don't use prev when the update doesn't depend on the previous state and can be calculated directly with the current value.

--------------------- Second Lesson Ended --------------------------------------

Our application is divided in two parts

. src: contains all the source code

. app: this folder is structured hierarchically. Inside it, we create multiple sub folders, each of which
can define a route and a layout. The layout is determined by the file's position in each folder structure. For example,
if we are in the `exercises/context/page` folder and there is the layout only in the exercises folder, the application will
keep traversing upward until it finds one. This layout will then be applied in a nested way
. components: used to store reusable components separately

## Why do we have contexts?

In large applications, we usually have an extensive component tree with many children, siblings, parents, and so on. These
components often need to exchange information.

When navigating between pages, many components are reused across the layout. While React optimizes by not recreating everything
from scratch, a new component tree is still created for the parts that change.

Let's use as an example, a parent component with two children

1. The parent can pass data directly to the child component because it has access to the `Child` tag. This way, it can send
   the properties directly to the child.

2. For communication from child to parent (indirect communication), the parent can pass a function as a prop. When the
   invokes this function, it triggers a behavior defined in the parent.

Context is designed to help avoid `props drilling`. Even though we still have the component-tree, context allows us
to share information between component more easily by creating a "global state" — but scoped only to the parts of the tree
where the is made available.

Every context, exports a Provider — after the provider, the context is going to be made available — and after a provider,
which is a component like any other else, we'll wrap the components which we want to share the state with.

If we don't type a context with generics, when accessing its exported values, it won't know of which values we are talking
about. By creating an interface such as interface CounterContextProps { number: number } and by creating the context with
const CounterContext = createContext<CounterContextProps>(), when utilizing the useContext, it will now know which properties
are going to be available.

inside the parentheses, it can be {} as any (which is the non proper way, the parentheses will be used for a default value
whenever this context is applied, it could be an object with ({number: 0}), for example)

This interface structure used to type the context, will also make the Provider value to need these properties, so in this
case, value must be, something like value={{number: 100}}. Typing it is also useful for when we utilize this context, it
will offer us auto complete based on its properties.

One thing to notice is: by leaving the area of action of the context, everything of that context which was in memory/cache,
it'll also be erased.

Sensitive data is usually not stored in contexts, a context is mostly a place for in-memory data, it's volatile — when we leave
or refresh the page, the context gets "wiped", it's not persistent — therefore, even though it may look like a secure place,
we avoid placing sensitive data in these places.

A context has both the idea of being the center area to share information, as well as being useful for us to evolve and
manipulate this data, in a way that it's not tied to a component itself. Therefore it is a good place for placing functions
and data separate from the component to share it across the rest of the app.

## Context x Redux

Context and Redux are both used for state management in React applications, but they differ in complexity and use cases.
The Context API is built into React and is best suited for sharing simple, global data such as themes, authentication, or
language preferences. It helps avoid prop drilling and is easy to set up, but it lacks advanced tools for state
control, middleware support, or debugging capabilities.

On the other hand, Redux is an external library designed for more complex and centralized state management. It uses a
predictable architecture based on actions and reducers, making it easier to manage and scale state logic in larger
applications. Redux supports middleware, integrates with powerful developer tools, and enforces strict patterns, but it
can be more verbose and requires more setup compared to Context.

## Default Export and Export

The difference between default and named exports is that default exports can be imported without using curly braces and
can be renamed freely when importing. Each file can have only one default export.

Named exports, on the other hand, allow you to export multiple variables or components from the same file.
