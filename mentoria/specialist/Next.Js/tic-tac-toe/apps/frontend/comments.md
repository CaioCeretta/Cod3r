# General Comments

## Comment 1 - passing functions from a server components to a client component as pro

The issue here, was that i tried to pass an onclick function from a server component to a client one

What i was trying to do:

1. In next app router, every component inside the app folder is a server component
2. I wasn't trying to utilize a onClick in a server component, but i was trying to pass the behavior i wished would happen
from the server to the client

And that's why ts warned us

"Functions cannot be passed to Client Components from a Server Component"

Because even if `Button` is on the client, the parent component is a server component and server components can't pass
functions as props to a client one.

If we want to keep the button logic (ex: onClick) defined in the Server (Home), but we also need that the logic is executed
in the client, the correct path is:

✔️ Solution: Leave the logic in the client and expose only the behavior parameters

The idea is: instead of passing a function, to pass only a serializable instruction as a "string", "type", "id", or other
type of data that the client understands and translate it in a `onClick`.

Example 1 - Using action as an instruction string

Server Component - `Home.tsx`

```ts

import ClientButton from "@/components/shared/ClientButton";

export default function Home() {
  return (
    <ClientButton action="alert-test" />
  );
}

```


Client Component - `ClientButton.tsx`

```ts
use client

import Button from "@/components/shared/Button";

interface ClientButtonProps {
  action? : "alert-test" | "log-hello"
}

export default function ClientButton({action}: ClientButtonProps) {
   
  const handleClick = () => {
    if (action === "alert-test") {
      alert("test");
    } else if (action === "log-hello") {
      console.log("Hello!");
    }
  }

  return (
    <Button buttonClick={handleClick} color="primary">
      Click here!
    </Button> 
  )
}

```

Example 2 - Passing the ID or prop that affects the behavior

If the logic is more dynamic, we can pass a type, productId, route, etc. and interact based on it

<ClientButton variant="openModal">

if(variant==="openModal") openModal()

In summary

Clients component can have onClick
Server components can't pass functions to client components
The solution is to encapsulate the behavior inside the Client and pass serializable data that determine the behavior

## Comment 2 - Transpile

Transpile is short for "transform + compile". In web development. It usually means converting code written in one version
or style of JavaScript into another version that is more compatible with different environments — like older browsers or
certain framework

There are some cases, when we need to add transpileOnly for certain packages of our project. This may be necessary because
some third-party packages, especially those not transpiled to ES5, may cause issues when used in modern frameworks like
Next.js

By default, frameworks like Next.js only transpile your application code and not the dependencies in node_modules. So, if
a package includes modern JS syntax or features not supported by the current build configuration, it can lead to errors
during build or runtime.


## Display grid recap

Why does the grid become 3x3?

When we create, for instance, this element <div className="grid grid-cols-3 gap-5">{renderCells()}</div>

grid-cols-3 defines that the grid has 3 columns (with auto width for each column by default). With display grid, we don't
have to manually define the rows. The grid calculates the number of rows automatically based on

.  Total number of child elements
.  The number of columns


In this case, we have 9 elements (3x3) and defined the grid columns as 3. Therefore, grid understands: "Oh, 9 elements with
3 per row -> 3 rows!"

Visually it would be

<div class="grid grid-cols-3">
  <div>1</div> <div>2</div> <div>3</div>
  <div>4</div> <div>5</div> <div>6</div>
  <div>7</div> <div>8</div> <div>9</div>
</div>

In conclusion we don't have to specify the number of rows for a grid. Just define the number of columns and the browser
will take care of the rest, generating rows as needed.

If you want to also control the rows (e.g., fixed heights), then you might use classes like grid-rows-3, but normally this
is only necessary for more specific layouts.