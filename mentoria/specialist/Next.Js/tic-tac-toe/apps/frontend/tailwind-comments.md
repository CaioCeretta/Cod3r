# These comments refer to Tailwind CSS v3.


## What is the `safelist` declared in the tailwind.config?

The safelist (previously called purge.safelist or whitelist) is a configuration option in Tailwind CSS that tells the
compiler to always include certain CSS classes in the final output, even if Tailwind’s content scanning doesn’t detect
them directly in your source files.

### Why do you need a safelist?

Tailwind CSS removes unused CSS classes in production builds to keep the CSS file small. It scans your files to find which
classes you are actually using. But if you generate classes dynamically (like with clsx or template strings) or apply them
conditionally, Tailwind may not "see" those class names in your source code as plain text.

Without a safelist, those dynamic or conditional classes get removed, causing your styles not to apply correctly at runtime.

## Dynamic classes based on properties

On dynamic classes, we utilize the clsx library to do so:  


`clsx`is a small utility for conditionally joining class names. It works similarly to classnames and is often used with
`React` to dynamically build the `className` string.

You can pass: 

. Strings directly: e.g. 'rounded-xl'
. Objects with conditionals: e.g. {'bg-primary-500': color === 'primary'}
. Array or a mix of both: e.g. ['text-white': {'bg-blue-500': isActive }]

It returns a final string of all the "truthy" classes.

What to avoid when using Tailwind CSS

Tailwind CSS relies on static analysis. That means it needs to see exact class names in your source code during build time
(specially in production where PurgeCSS is enabled)

x clsx(hover && `hover:bg-${color}-600`) This is **not safe** because Tailwind won't recognize the interpolated result
(hover: bg-primary-600) and might remove it during purge

There are two approaches we can take: 

### 1st approach - Inline

```ts

<div
  className={clsx(
    'rounded-xl',
    {
      'bg-primary-500': color === 'primary',
      'bg-secondary-500': color === 'secondary',
      'bg-dark-500': color === 'dark',
      'bg-light-500': color === 'light',
    }
  )}
>
  {children}
</div>

```

Pros:
✅ Simple and readable.
✅ Works perfectly for conditional base colors.
✅ Safe with Tailwind (because class names are hardcoded).

Cons:
⚠️ If you extend this approach to do hover && \hover:bg-${color}-600``, it becomes unsafe.

### 2nd approach - with mapping object

```ts
const baseColor = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  dark: 'bg-dark-500',
  light: 'bg-light-500',
};

const hoverColor = {
  primary: 'hover:bg-primary-600',
  secondary: 'hover:bg-secondary-600',
  dark: 'hover:bg-dark-600',
  light: 'hover:bg-light-600',
};

<div
  className={clsx(
    'rounded-xl',
    baseColor[color],
    hover && hoverColor[color]
  )}
>
  {children}
</div>

```

Why this version? 

. Avoid strings interpolation (no `hover:bg-${color}-600` )
. All class names are statically written -> Tailwind sees and keeps them
. Clean, scalable — if you need more variants later, it`s easy to add


Summary: When to Use Each Approach

Approach	         Safe with Tailwind?	Simple for Small Cases	Scalable for Dynamic Variants
clsx({ ... })	     ✅ Yes           	   ✅ Yes	                ⚠️ Gets verbose
clsx(map[color])   ✅ Yes	             ✅ Yes	                ✅ Easy to extend

Final Tip:

If you're using Tailwind with dynamic values (e.g. ${color} ) `never generate class names with string interpolation` unless
you're using the safelist in our config.

use clsx with objects or static mappings to keep your classes visible to Tailwind during build.

### The second parameter must be an object? 

Short Answer: 

No, the second (or any) parameter passed to clsx() isn't required to be an object

Internally, the function clsx(...args) accepts multiple arguments: 

. Strings - added directly
. Falsy values (false, undefined, null) — ignored
. Objects: adds the key if the value is truthy
. Arrays: Processed recursively 
. Anything else: ignored

Taking it into comparison

#### Example with objects (conditional with key/value)

```ts

clsx({
  'bg-primary-500': color === 'primary',
  'bg-secondary-500': color === 'secondary'
})

```


#### Example with direct values (pre-defined, such as baseColor[color])


clsx(
  'rounded-xl´,
  baseColor[color] // string ex: 'bg-primary-500´
  hover && hoverColor[color] // string or false/undefined
)

This works because

. if hover is true, we pass a string
. if hover is false, the result will be false and clsx ignores it

In summary

clsx(
  'static-class',
  dynamicString, // accepts direct strings
  condition && 'class' // accept conditional expressions
)

we just need to use an object when we want to declare multiple classes in a single argument, such as

clsx({
  'bg-red-500': isError,
  'bg-green-500': isSuccess,
})

📌 Basically, the first approach, that uses an object inside clsx, as

clsx({
  'bg-primary-500': color === 'primary',
  'bg-secondary-500': color === 'secondary'
})

we use this approach whenever we want to apply conditionally multiple classes at the same time.

Example: 

clsx({
  'text-white bg-blue-500': isActive, // applies both if isActive is true
  'text-gray-500 bg-gray-100': !isActive,
})

this is useful because: 

. Its readable
. Allow applying many classes at once with a single condition
. Avoids repetition of condition && 'class´ many times.

📌 When object is not needed? 

If you don't need more than one conditional or just want to apply simple classes based in unique constraints, we can use
it directly

clsx(
  'static-class',
  isActive && 'bg-blue-500',
  isDark && 'text-white'
)

or with mapping

clsx(
  'rounded-xl',
  baseColor[color],
  hover && hoverColor[color]
)

In practice: 

  Situation                                           Best Approach

. We want to apply many classes with one condition    Object { 'a b c': condition}
. Multiple independent conditions                     List with expressions condition && 'class
. Classes comes from a variable or mapping            clsx(map[color])
. Mix of everything                                   clsx(...args) accepts all together



Further comments: 

1. Inside clsx, we need to have literal keys, or we need to use brackets to dynamically evaluate it

{
  [darkerColor[color]]: color
  'mb-2'? !noBorder
}

2. We must not use dynamic object keys, such as darkerColor[color] inside an object passed to clsx

```ts
//  e.g.

clsx('rounded-xl', {darkerColor[color]: color, 'mb-2': !noBorder })

```

But in this format, `darkerColor[color]` will be interpreted as the object key, and not the variable name.

In JS it means, `bg-primary-600` is the literal key and the value is `primary`

the correct way of doing this would be

{ 'bg-primary-600': 'primary' }

However this will always be evaluated to true, so the class will be applied even if it's not necessary. Because `clsx`
expects the value to be boolean to decide whether to include it or not.

Therefore, to correct this, we wouldn't need to pass it is as object  in this case. Use the value directly with `clsx()`

clsx(
  'rounded-xl',
  darkerColor[color] // adds the corresponding class
  !noBorder && 'mb-2' // conditional as a string
)

### Final clsx summary

✅ When to use direct arguments (no objects) in clsx:
When using predefined variables or mappings:
clsx(baseColor[color])

When applying individual classes conditionally:
clsx('text-white', isActive && 'bg-blue-500')

More concise and readable when conditions are simple.

✅ When to use objects in clsx:
When applying multiple classes under one condition:
clsx({ 'bg-red-500 text-white': isError })

When toggling between several mutually exclusive classes:

clsx({
  'bg-primary': type === 'primary',
  'bg-secondary': type === 'secondary'
})

Useful when many conditions are involved in class selection.

Tip:
Use mappings or direct values when the class comes from a variable.
Use objects when writing conditions inline for clarity.









