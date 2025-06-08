# These comments refer to Tailwind CSS version 3." 

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