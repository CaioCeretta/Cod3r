# Overall Comments

  ● Template Strings and Object Literals in console.log

    ○ Template String: `console.log(`N1: ${n1}, N2: ${n2}, maior: ${maior}`);

      ■ This code is correct, because we wan´t to print a formatted string in the console. The template strings with use
        of the ` accent, will alllow us to interpolate values with ${}

    ○ Object literal:  `console.log({`N1: ${n1}, N2: ${n2}, maior: ${maior}`});`

        ○ On the other hand, this code is wrong, because {} outside a function or control structure are interpolated as
        object literal declarations
        ○ The content inside the {} must be a fieldName key, followed by : and not a template string

  ● Two use effects in the same file, with different dependency array

    ○ In the `maior` lesson, where we have the n1, n2, and maior states, we are forcing a re render in one use effect,
    when each of the numbers change, and inside the other use effect, we are console logging only when the `maior` state
    changes
    ○ Even though the first use effect changes the maior with the comparison if n1 is bigger than n2, the other use effect
    which has the maior state in its dependency, will only show its console.log when the maior state changes, if we have,
    for example, n1 as 4 and n2 as 1, when increasing the n2 value, to 2 and the 3, this useEffect won't be fired.

  ● Change the state every time a character on an input changes

    ○ Let's use `texto` and `caracteresRestantes` as an example. When there are two states, one that will cause a re render
    every time it changes, and the second one that will change when the first state changes, it will also implicate in
    another rendering. Therefore, by each typed letter, two states will change and two renders will happen, which is not
    a good strategy, and how to deal with this and render it fewer times? 

      ■ One strategy would be to wait for the user to stop writing for a while and then change the state, this could be
      done with a setTimeOut, however, a simple timeout set for 1 second, if we keep on typing, it will keep firing the
      state change, meaning that this is not the best approach.
        □ The reason for this not being the best approach, is because when typing a single letter, it will wait for the
        specified time, but the new renders are going to happen for each character we type, only will take longer to
        happen
      ■ With useEffect we are not able to create 'some time outs' since the trigger of  the event is related to the dependency
      array being changed. But we can exclude some time outs once in a while.
        □ To do this, we associate the timeout to a variable, and use the cleaning functions
        □ The cleaning functions are going to happen before calling an effect, and it will do some sort of cleaning/manipulation
        before the new useEffect

      ■ In the previous examples, we didn't work with the return of useEffect, a return is basically a function that will
      clear this timeout.

        □ Every time the text is altered, it will call the use effect, we don't have a choice, therefore, we will create
        this setTimeOut every time we type on the field. However, every time we call the time out, we will return the
        function that clears it, and every time we type something new, this effect will be called again. This is where
        the trick of the cleaning function happen. When we call the effect, this cleaning will trigger before the function
        where the timer is created, and it will work like this

          1. Typed the first character, the timeOut function is called, and our timer will start to count the defined
          duration
          2. After this duration fulfills, this altering will be done, BUT, if we write a second char BEFORE this time
          finishes. and when we type something, the timer is cleaned and start all over again.
          3. The timeout function will only fulfill if we stop typing for the duration of the timeout, causing it to
          stop rendering all the time

      ■ In simple terms, the return function is executed before a useEffect fires after the second time it runs, it is
      useful for cleaning any "residue" of previous calls.

    ○ But there is a caveat, what if we would like to update the `caracteresRestantes` on every typing? would we need to
    sacrifice a bit of performance? 

      ■ What we are doing here is because we've set a `manual debounce` with setTimeout, meaning that the state will only
      be updated when there is a one second inactivity, even though this prevents re-renders at each keypress, it will
      create the delay in the characters counting

      ■ What if we want this character counting to be real time? 

        □ If we would like the `caracteresRestantes` value to be updated at each keypress with no delay, we should calculate
        it inside the onInput (or even in onChange) instead of using useEffect.

        □ This way, we would eliminate the setTimeout. The calculus performed is simple and direct, and does not have any
        performance impact in this case, because calculating texto.length é O(1) (Constant, extremely cheap)

      ■ When we should keep the timeout/debounce

        □ We would only use debounce if

          1. We would fire a request (ex: save in the server, consult suggestion API, etc).
          2. Or the calculus is very heavy and demanding (ex: large texts processing, full regex, AI, etc).

      ■ In summary, for characters counting, do it realtime, no need for the timeout, and for heavy operations, we can
      use debounce with setTimeout or libraries like lodash.debounce 

  
  ● useRef:

    ○ This hook allows us to reference a value or an html element and it is not required for our rendering.

    ○ Difference between useState and useRef

      ■ Even though the two hooks are useful for storing data, but they have many differences between each other:

        □ useState, for example, will return an array with a variable and a function to alter this variable, while useRef
        will return us an object, and this object have a `current` property where we will be able to make updates.

        □ Other big difference is that useRef DOES NOT cause other render when its value changes, we can update the value
        inside the `current` property and it will not implicate in a new rendering.
    
    ○ Overall Explanations

      ■ We can't simply print out the constant where the ref is assigned to, because this is the entire object, while only
      the `current` property is interesting to us, because she is the one that will store the value, which is initially 0

      ■ However, even though reference does not cause a new render, if we do not render it again, it won't change its
      current value on screen — If we have two buttons, one that increment the ref.current, if we click 3 times on it,
      it will remain 0, but if we render the component again, it will now show 3.
        □ Even though the stored value by it, is being updated, and by rendering a state, which causes a new render, we
        then see the updated value
      
        □ Because a change on the ref does not call a new render, the ideal is that we use this hook to store information
        that is not related with the component rendering and don't need to make changes on the display. Data that won't be
        rendered and stay "under the covers" and when we want to want to use data that will displayed, the ideal is that
        they be stored within a state.

      ■ Another interesting thing is that useRef always returns to us the object with the current property, just like in 
      useState we can initialize the current property in any way we want, be it a primitive value, or an object, or an
      array.
        □ By using a simple object as a ref, and console.logging this reference.current, we will see the object logged

    ○ useRef for manipulating DOM nodes

      ■ Let's we have this p tag with some text in it, and we want to, on button click, to erase the text.

        1. First we define a reference and associate it to the DOM element, in this case, the p tag, with p's ref attribute
        2. Define a function, that will be assigned as button onClick, to update the referencia.current value

        □ Therefore, in this example we created a reference, linked it to a DOM node, and its `current` represent that
        reference value

    ○ Making the same as we were doing with the `contagemCaracteres` useEffect, but with ref

      ■ First, remove the useEffect, the texto state, as well as its use on the textarea
      ■ Create two references, one for the textarea, and the other is a `contador` ref where we will store that char
      counting.

      ■ In the useEffect example, we are creating the timer on change useEffect, meaning the timer will be redeclared on
      each `texto` state change.

      ■ Since we are using refs, we are going to create the variable once and manipulate the same variable since useRef
      will always return the same object, different from the effect example.  

      ■ We are now going to associate a timeout to our ref, meaning that anything can be assigned to this property — arrays,
      objects, functions, etc.

      ■ Steps to follow

        1. Inside the timeout, create const `quantidadeCaracteresDigitados` and assign to it, the value of the text reference
        2. With this constant, update the `caracteresRestantes` state with the subtracted value
      ■ These steps are going to lead us to the same problem, that the timeout is always going to add a delay to our counting

      ■ To fix this, on the iniciaContagem function, we are going to clear the timeout, in the beginning of the function.
        □ We are going to clear the timeout, passing the contador.current as the clear timeout argument, since its value
        is the timeout function

  ● Custom hooks

    ○ useToggle

      ■ We defined a custom hook called useToggle, where it receive an active parameter, to tell with the hook is active
      or inactive, created a `toggleAtivo()` function, that will change, wherever the ativo is to true or false

      ■ We then return it, similar to useState with [ativo, setAtivo]

      ■ When destructuring the constants like `const [mostrar, toggleMostrar] = useToggle(false)`, we can choose whatever
      name we would like, and the argument passed to useToggle, is going to be the parameter `ativo` it requires

      ■ In our hook, we return an array with ativo (boolean) and toggleAtivo (function with no parameters that alters
      the state), and this caused an issue inside the onClick

        □ Therefore, the inferred type is [boolean, () => void], and we are using it with [mostrar, toggleMostrar], and
        onClick expects a function that receive an argument `e`, which is the click event. But we are passing the toggleMostrar
        that is a function defined with

          function toggleAtivo() {
          	setAtivo(!ativo);
          }
        which does not receive any parameter

        □ Why typescript complains? 

          . When we type `onClick={toggleMostrar}`, ts checks if toggleMostrar is compatible with (e: any) => void

            - Expected (e: any) => void
            - Received: () => void
             

            - These functions are not compatible because the function passed to onClick should accept one parameter (even
            if unused)    
      
        □ To fix this issue, we can type the exact hook return with: 

          . const r: [boolean, () => void] = [ativo, toggleAtivo];

            return r

          . Now typescript certainly knows that the hook returns an array of that type, with no ambiguous inference
          . It avoid assignments errors

      ○ useStateValidate

        ■ Development

          □ This hook receive an initial value, which will be used to set the state valor, and a validationFunction. Every
          time we update this `valor` we would like to execute this validationFunction. Which could be done through a useEffect
          but the approach of using a setValorValidado state is the approach we choose to update both states at once.

          □ It has a function setValorValidado, which receives a value, set the state value with it, and calls setValidado
          state with the value returned by: setValidado(funcaoValidacao(novoValor))

          □ In the end, it returns the valor state, the validado state and the setValorValidado function, that uses the
          setValidado state, but we are not going to expose it

        ■ Use

          □ The hook will allow us to have a state and this state will also have a validation function that will be fired
          every time we update the value of our state to see if this state is valid or not, according to some criteria.
          Which will be defined in the `funcaoValidacao`

          □ This hook will be used as an example inside "senha.tsx", the validation function passed as argument will check
          if the function passed matches a simple regex of 8 characters

            . Regex returns an array, so this function will validate if `correspondencia[0].length` is going to be equal
            to be equal the length of the `senha` parameter.

            .  `return correspondencia?.[0].length === senha.length` the ? will make the code to avoid errors in case
            correspondencia has no matches

            . destructure the three constants returned by useStateValidado, where the value, in the senha case, will be
            the `valor`, the `senhaEhValida` will the `validado` state and `setSenha`, the `setValorValidado` function.
            e.g. `const [senha, setSenha, senhaEhValida] = useStateValidado("", validaSenha)`;
    
    ● useTamanhoJanela hook

      ○ 1. `getTamanhoDaJanela` function

        ■ The objective of this function is to retrieve the height and width of the browser window.
        ■ The typeof window !== 'undefined' is a protection to avoid SSR (Server Side Rendering) errors, since window
        might not exist in the browser
        ■ It returns the { largura, altura } object, if the client is on the browser, return the true values, otherwise,
        if the  client is on the server, it returns -1

      ○ `tamanhoDaJanela` state

        ■ Creates a state with width and height of the current window
        ■ Initially, getTamanhoJanela() is called to define the initial values, meaning the ts will know the object shape

      ○ useEffect to listen to resizes

        ■ It defines a function named `tamanhoMudou()` that updates the state with the new window size
        ■ Adds an event listener on window resize
        ■ Returns a cleanup function when the component unmounts
        
        ■ As a result, the hook will always know the window size
      
      ○ `entre` function

        ■ This function returns true or false if the current width is inside the [min, max] interval
        ■ Example:
          □ entre(768, 1024) -> true if tamanhoDaJanela.largura is between 768 and 1023px

      ○ `dimensoes` object`

        ■ We are creating an object where each key: (sm. md, lg, xl, 2xl) represents breakpoints, each value is true or
        false depending on the current width passed as argument

          □ Example: sm: entre(640, 768) // true or false

          □ At the end of the day, the dimensions array will turn out to be something as

            {
              sm: false,
              md: false,
              lg: true,
              xl: false,
              2xl: false
            }

            if the width is 1100px, for example.


  ● Object Keys

    ○ Issue with "2xl" and xl2

      ■ Rules

        □ When declaring an object in TS, it must be `const obj = {key: value }`

        □ If the key is a valid JS identifier, we can write it without quotes, Ex: foo, bar, xl2, maxValue

        □ If the key is not a valid identifier, we must use quotes

          . Keys that  start with number -> 2xl, 123, 7days
          . Keys with special characters not allowed in identifiers -> background-color, margin-top

      ■ Summary

        . xl2 works without quotes because it starts with a letter
        . 2xl throws an error without quotes, because it starts with a number
    
    
          
      ○ Filtering the true size

        ■ const tamanhoVerdadeiro = Object.entries(dimensoes).filter((el) => el[1]);

          □ Object.entries(dimensoes) -> transforms the object in a key arrow value:

            ```ts

              [
                ["sm", false],
                ["md", false],
                ["lg", true],
                ["xl", false],
                ["2xl", false],
              ]
            
            ```
          
          ■ .filter((el) => el[1]) -> it will only keep the true valor. e.g. lg

            □ Gets the first filtered value, (lg) and returns just the ("lg") key
            □ If none is true, it returns undefined

        ○ Hook's flow summary

          1. Initializes the state with the current width of the window
          2. Listens to change of sizes with `resize`
          3. `entre` function verifies if the current width belongs to any breakpoint
          4. Defines `dimensions` with all breakpoints and boolean values
          5. Filters only the active breakpoints
          6. Returns the name of the current breakpoint ("sm" | "md" | "lg" | "xl" | "2xl").

  ● When do we need to wrap it in brackets during destructuring? 

    ■ 1. If the function returns only one primitive value, we don't need keys by destructuring it, e.g
      function useTamanho() {
        return "lg"
      } 

      const tamanho = useTamanho();

    ■ 2. Where do curly braces come in? 
    
     □ We use the {} only if the hook return an object. e. g.
      function useTamanho() {
        return { tamanho: "lg }
      }

      const { tamanho } = useTamanho()

    ■ 3. And square brackets []? 

      □ Only if the hook returned an array/tuple. e.g.

        function useTamanho () {
          return ["lg", 1024]
        }

        const [tamanho, largura] = useTamanho();

  ● Borda not defined

    ■ At one time in our code, we defined a variable `borda` but didn't assigned to it a value

      □ Then, we created some ifs to assign some value to borda and used it on our className, but typescript added a red
      squiggly line to the `borda` constant being used in the class because it said that it was being used before it was
      assigned... Why this happened? 
    
    ■ Even though we defined the ifs to assign a value to borda, typescript couldn't be certain that borda has a value



  ● Applying developed hooks

      
    ○ Minified State Control

      ○ To manage the `mini` variable of the `MenuPrincipal` component sections, which was once defaulted to false, we are
      going to make use of the useToggle hook

        ■ useToggle has a state containing the state and its toggler, it "activates" on click, so we are going to use
        `[mini, setMini] = useToggle(false)` since it returns an array with the state value and the setter.

        ■ We are going to start it as false, and now we have `mini`, which is a controlled variable through our useToggle
        hook. 

        ■ The sections are going to have the mini state attached to it, and use a div after the Logo icon component, this
        div will hold the toggleMini function, which will collapse or expand the menu on click
      
      ○ Sections lessons minify

        ■ What defines if the section lessons are expanded or not, is the `aberta` property, so to fix this, we are going
        to, instead of receiving the aberta as props, we are also going to use a useToggle hook to this

        ■ On the MenuPrincipalSecao component, that is rendered on each iteration of the renderizarSecoes component, we are
        going to use the property aberta to manage this useToggle
      
    ○ useTamanhoJanela use

      ■ Inside MenuPrincipal, we define a variable `tamanho`

        □ We are going to use this to automatically define the mini value as true
        □ Since mini is a state within useToggle, we need to be careful and prevent the multiple rerenders, and to it, we
        are going to make use of useEffect

      ■ useEffect to avoid multiple renders

        □ Even though a logic could be simple as `if (tamanho === 'md' || tamanho === 'sm')`, there is a small issue with it.
          . Our useToggle hook, only provides a function to invert the current state, and do not offer us some way for us to
          set the variable as desired and set mini as true

          . This is a problem that we will solve by creating a new useBoolean hook, similar to useToggle hook, this, in turn,
          instead of returning a function that simply inverts the state, it will now return two new functions to set the state
          as true or false

          . Invoke this function to define if mini is true or mini is false on useEffect

  ● useContext

    ○ Theory

      ■ We are going to use the `loja` context as an example, we would simply like to add a new product to the cart, and
      with it, reflect it on the total price. The challenge is basically make the components to talk with each other, and
      exchange information, specially according to the items on the cart

        □ First of all, since our cart is going to be a list of produts, we can think of creating an array to store these
        items on the state

        □ Initially, we would think of the approach of passing the state to child components and update the states through
        it. Because as we already know, a parent component communicates with the children using props and children communicate
        with parents through functions.

          . This approach could work, but it would end up being to complicate and complex when we start increasing the number
          of components that may know about the state. If we were thinking only on a products page, and a cart page, it
          would look simple to us. However, when adding more pages, the cart quantity on the menu bar across all pages, and
          so on. It would end taking too much work to keep it up. 
        
      ■ Example without context

        ```ts
          function Comp1(props) {
            return (
              <Flex gap={4}>
                <AdicionarProduto .../>
                <FinalizarCompra .../>
              </Flex>
            )
          }

          function Comp2(props) {
            <Flex col gap={4}>
              <Comp1 />
              <Carrinho carrinho={props.carrinho} />
            </Flex>
          }

          export default function () {
            const [carrinho, setCarrinho] = useState([]);


            <Comp2 carrinho={carrinho} setCarrinho={setCarrinho} />
          }   
        ```

        □ Now, looking at this example, we would think: Ok, now what should for the state to travel across these comps?

        □ We would need to prop drill this state across every component and function, we could define that Comp2 receive
        `carrinho` and `setCarrinho` properties and we could pass the state to it.
        
        □ Then on Comp2, where we call the `Carrinho` component, send the `carrinho` state which it received as a prop,
        and to the `Comp1` that contains the `AdicionarProduto` component and the `FinalizarCompra` component, would also
        need to receive the properties that `Comp2` received. 

        □ Finally, `Comp1` would also pass the properties it received to the AdicionarProduto and FinalizarCompra components,
        meaning that the state defined in the main component, travelled across, the default component, to the comp2, then
        to the comp1, which would finally send it to `AdicionarProduto` and `FinalizarCompra`

        □ Therefore, when all the states belong only to the component that created them, is not so hard to do, but as the
        application grows, and we start having multiple components, it would increase its complexity, where the default
        component would basically be a 'fill' component which has the only task of centralizing the states and prop drill
        them across the app.

        □ This approach can also lead to another problems, such as if in some moment, we choose to change the way some
        of the components are structured, which would need to do look across all the components, and make changes to fit
        in the new structure we moved to. Which will also increase the complexity and make it difficult to maintain.

        □ Another problem is when the information a child received from its parent, needs also to be shared to this
        component siblings.
          . Let's use <Comp2> component which returns:
            ```ts
              function Comp2(props) {
                <Flex col gap={4}>
                  <Comp1 carrinho={props.carrinho} />
                  <Carrinho carrinho={props.carrinho} />
                </Flex>
              }   
          ```

          . Comp1 could need something defined in the Carrinho, and the Carrinho might also need some state defined in
          Comp1. In this case, we would need to do a workaround of passing information to the parent and having it to
          store information that are not even relevant to it, but are information that will be necessary to allow this
          hypothetical communication, and so on. This is another thing that would complicate the app and add unnecessary
          complexity to it. 
        
        □ Therefore, we should always look for ways to minimize the amount of code we write in, and look for avoiding
        unnecessary code.

        □ And the best solution to fix all of this, is using useContext 
      
      ■ useContext is a hook in react that allows us to provide functionalities across multiple different components.
      Therefore, through useContext, we can make that one component store a list of information, which in turn can be
      a list of variables, functions, and so on.

        □ And we are going to be able to create a Component that will store this information and provide them to other
        components. 

        □ Therefore, on top of our default function, we are going to create a context and assign it to a `Contexto` const.

      □ As the argument, we are going to pass the initial interface that represents this context, we can and should create
      an interface to represent its keys and types, but we are going to initialize it empty with `{} as any`

        . This approach of creating it empty, which is able to receive an object with any keys and values, since by typing it as
        any, typescript turns off the typing system and won't validate anything. Therefore, it's advised to avoid typing
        anything as any and use as many type guards as possible.
    
      □ With the context created and assined to this context, but how are we going to make this context to store our
      `carrinho` and `setCarrinho` created with useState and allow it to be available on other places? 

        . After a context is created we have to provide this context to the other components, and we need to show to
        the other componentes that this context is available and can be accessed.

      □ <ContextName.Provider> component: This component is our is as it name says, the provider of our context, and it
      will encapsulate our Pagina component, which means that it will be used to provide our context, and our context is
      that constand we just assigned createContext to

        . In ContextName.Provider, the ContextName is simply the one we used to assign our createContext() to, so if it
        was Blablabla = createContext, the provider will be named as Blablabla.Provider

        . The provider will make the context state available to all its child components. No matter how inside of the tree
        it its, if it is a child of a child of a child, that is wrapped with the provider, will know its state. The only
        thing we will need to do is to "ask" the provider for these variables

        . The context is there, it is wrapping, but if a component wrapped by it, choose to no call any provided constant,
        it can.

      □ Context.Provider value property

        . We have defined, when creating the context, the shape it should have — in our case, an object with no particular
        keys and types — the value property, needs to fit this initial context structure.

        . Since we have an empty object with no defined structure, we are going to create the carrinho and setCarrinho with
        useState, and provide them by returning them as a value, e. g.

        ```ts
          export const Contexto = createContext({} as any);

          const [carrinho, setCarrinho] = useState([])

          const ctx = { carrinho, setCarrinho }

          return (
            <Contexto.Provider value={obj}>
          )
        ```
        . With all the internal components "aware" of the context state, they can all share the same state

  ● Applying Contexts

    ○ SeletorDeCor component

      ■ This component will have a `cores` array, which multiple tailwind color classes and based on clicks, the color
      will be applied as the default color of our project

      ■ It will have a listaCores constant which will map over all the colors in that array, and return a Button for each
      one of them.

      ■ Define a variable in the `Cabecalho`, assigning to it if the button for SelectorComponent is visible or not

    ○ Context to store the  theme

      ■ Now that we have the SeletorCor component, and its buttons on the Cabecalho, we are going to create the context
      that will store its value

      ■ The context will be named `TemaProvider`, and why not `ContextoTema`? 

        □ The reason is because inside this `data/context` folder we are going to have tsx components, they will share the
        context but will have as their export the context provider allowing it to be directly imported in the main component.

        □ Different from the context we have created for `loja`, instead of in the tsx component, the Provider being returned
        directly as default, we are going to create a `TemaProvider` function

        □ We now create a corDestaque state and initialize it with one of the colors defined in the `SeletorDeCor` comp.

        □ Since the SeletorDeCor component returns multiple buttons with the defined colors. Instead of using this cores
        state inside it, we are going to move it to the TemaProvider context. And we now initialize the corDestaque state
        with the first index of the array

        □ Inside the `TemaProvider` function, we return ContextoTema.Provider, passing the colors and the state as its
        values, so that its children know about the theme.

      ■ Exporting the Contexto as default and not the function

        □ Inside the TemaProvider, we were used to, in contexts, returning an object as default with all the functions and
        values we want. However, in this case, we created the context, and below it, we created at TemaProvider function,
        which we didn't export, with the values, functions, and simply return the ContextoTema.Provider

        □ After the definition of the function, we export the Context as default, and export the provider as a named export

      ■ Why was the strategy different from the loja context? 

         □ Instead of returning a component (provider) with the `children` inside of it, we are returning a component in
         a way it can receive children later

         □ Since the ContextoLoja, in the its default return, it had already established which will be the children of
         that context, on the TemaContexto case, by wrapping a {props.children} with the Provider, will make the code more
         flexible. Being able to be reused across the app, more scalable and with a more separation of concerns.

    ○ useTema hook

      ■ useTema hook will be used for encapsulating the access logic of our context.

      ■ We are going to have a function named useTema which will return the useContext passing the contexto tema as argument
        □ This function will be returned as default. With this custom hook, we are able to extract and minimize our work
        when using the context on the components since this function already encapsulates the useContext logic and importing
        the context.

      ■ So recapping. we have the TemaProvider component, where we create our context and return in a function named
      `TemaProvider` a provider component of the context we created.

        □ This component may receive children, and these children are going to be wrapped with our provider, 

    ○ If only the context is used with useContext, why do we also need to export the provider?

      ■ There is a reason for the Provider to be exported along with the context,  

        □ 1. Context vs Provider — two different roles

          . `Context` (the thing we pass into useContext): When we want to consume the value we use something as
          `const {corDestaque} = useContext(ContextoTema). It is a reader of the context

          . `Provider`: is the writer of the context

          They complement each other

        □ 2. Why export both and not just the context? 

          . We need the provider to wrap our app, usually at the root or around specific features
          . We need the context itself for useContext in our child components

          That's why both are expected

          . Consumers import the context
          . The app root (higher-level) imports the provider.

        □ 3. Why not only export the context?

          . Because then we'd have to write the Provider inline everywhere we want to wrap things. That means repeating
          the state setup (useState, cores, etc.) every time.
          By creating and exporting TemaProvider, we encapsulate all that boilerplate in one place.

    ○ Summary

      ■ We have the TemaProvider component where we create our context and return in a function named TemaProvider a context
      provider component

      ■ This component may receive children, which are going to be wrapped with our provider, and when we call the TemaProvider
      component and pass child components to it, those children will be wrapped by this provider.

      ■ We also created the useTema hook to create the context invocation logic.

      ■ To provide this theme to our application, we move into `_app.tsx` and wrap our Component component with our
      TemaProvider

    ○ Applying `useTema`

      ■ Inside Logo component, import the corDestaque from useTema, and since Logo is going to be a children of ContextoTema,
      we can use the corDestaque, that the context provides to us, and change wherever we have a hardcoded bg-color, change
      this color to the corDestaque returned by the context

      ■ There are other places where this state color should be used, `MenuPrincipalItem` link's color also need to be
      dynamic to the theme color

      ■ setCorDestaque implementation code

        □ SeletorDeCor component has all the colors constant returned by useTema and returns a button for each one of them
        □ SeletorDeCor is used in the `Cabecalho` whenever the user clicks the paint brush
        □ Inside SeletorDeCor, on the button click, implement the method to set the global state with the clicked color

    ○ Contexto Menu

      ■ First of all, we will start by extracting the codes inside MenuPrincipal, which are not concern of the page exactly
      so the useBoolean, useToggle, useMini hooks, are going to be placed inside the context where we will share the state

        □ This is a good example of separation of concerns and reusability of logic, because:

            1. Initial component (MenuPrincipal): It mixed the view logic (what to render) with the state/behavior
            logic (hooks) 

            2. Context creation: By creating a context and moving these hooks inside it, we are:
                 - Centralizing State: The whole state logic and the functions to modify it, live in one place, the Context's
                Provider 

                - Decoupling logic: You remove the direcrt state logic from MenuPrincipal (or other components that used
                it), making it a ¨dumber" componeent or presentional component, focused only on the way that the UI looks
                like

                - Sharing the state: Any component in the tree that is below the context provider, will be able to consume
                the state and the functions, with no need to prop drill or having MenuPrincipal high up in the tree

      ■ Now that we have our ContextoMenu, first we move all the hooks for the context, and we also move the secoes for
      its own context secoes file, which will be imported by the MenuProvider and provided by it.
        □ Since we are not importing the mini and the toggleMini from its respective context, they are now going to be
        centralized and exported by this context

      ■ By extracting those functions from the context, there will be no need for changes on the code, it will continue
      working as it was before.

    ○ Extracting the logic from MenuPrincipalItem

      ■ Inside `MenuPrincipalItem` component, we have a specific logic where we highlight the selected component. This
      is made by the following steps

        □ The components are created by iterating over the itens attributes inside each secao
        □ Each secao has a url attribute, e.g. "/personalizado/modal", and this is the "path" of the route
        □ Inside MenuPrincipalItem component, we define a router, which is equal to useRouter returned by next/router
        and assigning to a ativo constant the comparison of the router.asPath (which holds the current browser path)
        and the url used on this secao item
        □ Then, after defining the ativo constant, inside each returned item, on the Link className we check if ativo
        is true, and assign to it the text color as the one defined by the theme as the highlight color

      ■ One thing we can notice about this logic, is that even we expand a menu, or minify it, by clicking in any other
      item we are going to be resetted to the initial state (e.g., if one `secao` is defined with the aberta property
      as false, by maxizing it, and choosing any item on the sidebar, it will be automatically minimized).
        □ So the examples in the `contexto` and `personalizado` secao they are set to aberta but in the `essenciais`
        section is closed, if we maximize essenciais, and choose any item from any secao, `essenciais` will minimize
        again. This will be solved with the context

      ■ We are now going to move the router logic for the MenuProvider and refactor the logic. Inside the router hook, we
      have the current path for the page we are in, and inside the provider we are going to create this respective logic
        □ 
          ```ts
              function selecionarItens(url: string) {
                const novasSecoes = secoes.map((secao) => {
                  const novosItens = secao.itens.map((item) => {
                    return {
                      ...item,
                      selecionado: item.url === url,
                    };
                    });

                    return novosItens;
                  });

                  return novasSecoes;
                }
            ```

          □  What this logic is doing is, it is creating a selecionarItens which receive the current url on the string,
          the one we are going to pass in, map over the secoes array, and for each sessao being iterated, map over it
          to fetch its items. Then, when iterating over, each item will have its url attribute, which will be checked
          if this url matches the function parameter, then, assign to the object returned by the map, the selecionado
          attr as true or false.

        ■ And finally, we are going to create another useEffect will watch for updates on our url through `router.asPath`
        and everytime the router.asPath change, we will select a new item and update our `secoes`

          □ If we want our `secoes` to be updated, we can't simply import them with ES6 Import statement, we are going to
          need a state that represent our secoes
            . If we are willing to use another name for the secoes, named export as secoes, with other name, we must
            wrap it on curly braces, and use {secoes as desiredName}
            . since secoes is a default export, it won't understand this named import, so we have to, inside the secoes,
            instead of exporting it as default, export it as a named object
            . And the reason for this transformation is simple, we can't alter the constants inside a file that was imported
            from the outside, we need to turn this into a state, so we can manipulate it inside the provider.
        
        ■ Now that we imported secoes with the alias s, and created a state which will hold this value, we are going to
        use it inside our second use effect for when the route is changed
        
          □ Now, we call the setSecoes using the selecionarItem function just created and pass to it the new route
            ** My Note **
              . One thing the code warned me but did not warn the instructor, since she is not using any linter, is the
              fact that selecionarItem should be inside useEffect dependency array, since the linter doesn't know that
              this function will never change.
              However, by adding it to the dependency array, the linter will now say that this function will be rendered
              every time the component re-renders, so to fix this, i used the useCallback function and assigned
              the selecionarItem function to it.

        ■ We are now able to identify which is the selected item, map over it, and return a new object with all the
        existing properties but adding a new selecionado property for it

        ■ Since we are encapsulating the whole app with this MenuProvider, whenever we access any route, this useEffect
        will be fired, and one object will be returned with selecionado being true, and since selecionado is optional
        it will work as expected for the highlighting, and we won't have to do any more code for this.

        ■ We now return to our MenuPrincipal and where we call the MenuPrincipalItem component, we pass the selecionado
        property defined in our model which wasn't being passed until now. And we are also going to update the MenuItemProps
        to add the selecionado property
          

        


    ○ What is the difference between legacy next _app.tsx and the layout.tsx? 

      ■ They are similar in function but with some important differences

      ■ _app.tsx (pages router (legacy))
        □ Controls how every page is rendered
        □ Is placed in /pages/_app.tsx
        □ Used for providers and global CSS 
        □ Does not have suported to nested layouts

      ■ layout.tsx (App router (new))
        □ Partially replaces the role of the _app.tsx
        □ It is inside any route folder inside app/
        □ Define a persistent layout — one that does recreated from scratch every time the user navigates between folders
        and keep mounted on React's component tree while only the internal content changes — for that route
        □ Can be nested — any folder can have its own
        □ Always involves the `page.tsx` from that folder

      ■ The differences are

        □ Placement
          - _app.tsx: Unique, inside pages/
          - layout.tsx: Can have multiple, one for each folder inside app/

        □ Flexibility:
          - _app.tsx: one global layout
          - layout.tsx: nested layouts for specific routes

        □ Rendering:
          - _app.tsx: runs on the client and on the server
          - layout.tsx: by default it is a server component, which is more secure and performatic

      ■ Layout.tsx is the modern evolution of _app.tsx, it became more powerful because there can be one for each section,
      with no need to logic repetition. 
           
  ● Using useContext hook inside child components

    ○ Carrinho component
      ■ For example, in the carrinho component, we simply use `const [carrinho, setCarrinho] = useContext(Contexto)`

      ■ Since we can have multiple Providers wrapping a single component that it would like to share its state, we
      have to inform which context we want through useContext 

      ■ To alter the context state, since we are receiving and using the state provided by it, if we change it, it
      the change will be shared across all components
    
    ○ AddProduct component

      ■ The add product also receives the carrinho and the setCarrinho, the adicionar function will add products with the
      id based on the carrinho.length

      ■ The quantidade and preco inputs, are going to have within the onInput function, a + before the e.target.value so
      they are immediately converted for numerical values


  ● Arrays, when we want them to be exactly as the state, which returns an array, we simple use the spread operator, so if
  the state carrinho is an array and we want to replicate this state, we use [...carrinho]     

  ● Calculating cart total

    ○ Total was once being calculated on the Carrinho component, but now we are going to move it to the context file.

      ■ Once inside `loja.tsx`, we are going to add a new property to the ctx that will be returned as a value, where it
      is a function that will run a reduce over the `carrinho` state, which holds the cart items, and sum all prices.

  ● console.table inside arrays

    ○ We used console.table when creating inside the `adicionar` function, and what is difference between console.log and
    console.table? 

      ■ console.table(carrinho) get the current value of the carrinho state and by the time this function runs.
      ■ Since `carrinho` is an array of products, console.table will show this array in the shape of a table

        □ With each line of the table corresponding to an index of the array
        □ Each column corresponmd to the key/properties inside the array (ex: nome, preço, quantidade, etc)
      
      ■ If the elements are only primitive values like 1, 2, 3, the table will have a column named Values
      ■ If they are objects, the table will have columns for each object property, which eases the reading comparing to
      console.log

    ○ Why on the first submit on the add product to cart function, this console.error shown an empty value?

      ■ The simple reason is because when the console.error was displayed, since the console.table is part of the same rendering,
      when the carrinho state caused a new render on the page, the console was already displayed

      ■ As soon as we create a useEffect, the will run on every `carrinho` change, if we console.table inside this useEffect
      we are going to be able to see it updating
  








        
          






        




          



      
          











    




    



  







