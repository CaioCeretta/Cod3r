# React overall comments

## Comment 1.

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