# Overall Comments, both of the lessons as well as eventual questions

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
      
    ○ useTamanhoJanela

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

  ● useReducer

    ○ What it is
      ■ `useReducer` is a more advanced version of `useState`. It’s useful when managing multiple related state variables
      or complex update logic.  

    ○ Why use it?
      ■ Helps organize state updates that are spread across multiple `useState` hooks.  
      ■ Combines all state and update logic into a single reducer function.  

    ○ TypeScript Note
      ■ We should always type your reducer, which has the following syntax: `useReducer<State, Action>()`.  
      ■ Group all state types in one object and use it as the first generic parameter.

      ■ For the actions, it is also a good practice to type them, and here how it should be

        □ Actions

          . Typing the actions is the crucial point: each action can (ot not) have a payload. We can use discriminated
          unions, that typescript understands perfectly

            type Acao = 
              | { type: "ALTERA_N1"; payload: number} 
              | { type: "ALTERA_N2"; payload: number} 
              | { type: "SOMA";} 

          . This way, ts knows:
            - That the payload only exists on the first two cases
            - That SOMA does not need a payload
            - That dispatch can only accept these typexs

        □ State  

          . As a first step, we need to type the state, exactly how it is on the second parameter of useReducer, which is
          the initial state.
        
          □ Now we can explicitly type the reducer with these two types.
            . on the mudaDados, which is the function that holds the actions, we can use `(estadoAtual: Estado, acao: Acao): Estado`
            . Since mudaDados function is typed, on the useReducer itself we can remove the generic <>, because ts automatically
            infers everything after the mudaDados function 

          □ We can also optionally create an auxiliar action objects (optional, but practical)

            . if we would like the calls to be cleaner and easier to maintain, we can create an actions "factory" function

            ```ts
            . const actions = { 
              alteraN1: (valor: number): Acao => ({type: "ALTERA_N1", payload: valor}),
              alteraN2: (valor: number): Acao => ({type: "ALTERA_N2", payload: valor}),
              soma: (): Acao => ({type: "SOMA"})
            }
            ```

            . And then call it like this: `dispatch(actions.alteraN1(+e.currentTarget.value))`

        □ Questions

          1. Discriminated Union vs Common Union

            □ The common union is when we say that a variable can be of any of the listed types, such as:
              type Resultado = { erro: string } | {dado | any }  

              . function processa(res: Resultado) {
                // Typescript knows that res is whether { erro: string}  or { data: any }
                // Problem is he doesn't know which of the properties exist.
                // If we try to access res.erro or res.dado directly we would have to verify the existence of the properties.

                if('erro' in res) {
                  console.log(res.erro) // Now he knows that res is equal to {erro: string}
                } else if ('dado' in res) {
                  console.log(res.dado) // He knows that res is equal to {dado: any}
                }
              }

              . Normal union is useful, but the type narrowing can be less intuitive, requiring checks like if ('prop' in obj)
         
          2. Discriminated Union

            □ A discriminated union is a special type of union where every members of the union share a property in common,
            and the value of this property (the discriminator) is different and literal on each member

              ```ts
                type Acao =
                  // Discriminator: ALTERA_N1
                  {type: "ALTERA_N1", payload: number} |
                  // Discriminator: ALTERA_N2
                  {type: "ALTERA_N2", payload: number} |
                  // Discriminator: SOMA
                  {type: "SOMA"} // no payload
              ```
                
            □ Benefits:

              1. Automatic and safe type narrowing
                . By verifying the value of the discriminatory propertry (ex: in `switch` or `if/else`), TypeScript automatically
                knows which is the exact format of the object

                  . In our `reducer`

                  ```ts
                    switch(acao.type)  {
                      case: "ALTERA_N1"
                      // Here typescript KNOWS that the action is { type: "ALTERA_N1", payload: number }
                      // because of this, 'acao.payload' has the type number guaranteed
                      return { /* ... */ n1: acao.payload  }

                      case: "SOMA"
                      // Here typescript KNOWS that 'action' is {type: "SOMA"} 
                      // If we try to access acao.payload, he will throw a compiling error
                      // This is safety
                      return { /* ... */  }
                    }
                  ```

                2. It ensures each action type has the correct information. We don't  run the risk of passing a payload to
                a function that shouldn´t have, or try to accesss a payload that doesn´t exist.

              

          3. Action creator return

            ● alterarN1: (valor: number): Acao => ({type: "ALTERA_N1, payload: valor}): Does this mean that the action type
            will be equal to one of the acao object?

              ○ Yes, exactly. If we we break down the function declaration on Action Creator:

                ```ts
                  alteraN1: (valor: number): Acao => ({
                    type: "ALTERA_N1",
                    payload: alor
                  })
                ```
                ■ valor is the function param, and the :Acao is the promised return type. We are telling ts "This function
                will always return an object that fits my `Acao` type.

                ■ And => ({...}) is the returned object

                ■ Therefore: 

                ```ts
                  alteraN1: (valor: number): Acao => ({
                    type: "ALTERA_N1",
                    payload: alor
                  })
                ```

                  □ When typescript checks this objkect being returned, he compares to the object returned with the type
                  Acao

                    . Is { type: "ALTERA_N1, payload: 5 } a member of an object containing { type: "ALTERA_N1"; payload: number}?
                      or
                    . Is { type: "SOMA" } is a member of the object { type: "SOMA"; }? 

                  □ If we, by mistake, sent an object with type "ALTERA_N1", but omitted the payload, typescript would throw
                  an error, because no member of the Acao union, have this type with no payload.

                  □ So as a conclusion, the `:Acao` declaration ensures, that in the time of compiling, the object we are
                  dispatching is correctly formatted for its reducer.

        . So as a quick summary, the term "discriminator" refers to that common property used to differentiate members.
          In our code, the type property is the discriminator

          - What makes the union "discriminated":

            1. Shared property, every tipes in the Union have a type property, so they shoud all have the property
            type 
            2. Unique literal values: Value of the discriminated type must be a literal union and different of each
            type of the union 

           - Typescript uses these literal values to discriminate which specific object is being used at the moment.

            When using the switch in the reducer. we are "asking" ts: What is the type discriminator? 

  ■ useId

    1. Use No1

      □ useId is one of the easiest hooks, we can simply use it to generate unique ids for our components. We can assign the
      useId() call to a constant 
      
      □ One common use case is to assign this generated id to some input and link this input with the label through the id
      property

      □ We can also use the same id to add unique ids to our component.
        . We can on the htmlFor, define the id with: e.g. htmlFor={`nome-${id}`} and on the other input htmlFor={`sobrenome-${id}`}
        . And if we save and go into the dev tools, we will see now that their id will be something like: `nome-:Rm:`
      
      □  useId will always generate a string and will have the `:` character, because the colon is a character that is not
      recognized as a CSS selector nor as a JS selector. Adding the colons to the id we can be sure that this id won't be
      used to something it is not intended for.

      □ Even though this is the most basic use of this hook, since it doesn't add any different complexity to deal with
      data, it ends up being interesting for the fact that it helps the accessibility of the apps and allow the grouping
      of these elements that belong to the same component

    2. use No2

      □ For this useCase we will create a custom component for each input.
        . Within this component, we are going to define an id constant with the value of "8"

      □ Then inside the page component, we define one of this recently created component with the label as "nome" and other
      one with the label of "sobrenome"
        . Even though the input ids are the same, when we click on the second input, it will focus on the first one, because
        HTML always focus on the first place this id appear
        . To solve this we can utilize the useId hook instead of hardcoding an id
        . Now, we don't have to do the same thing as before of using `nome-${id}`, because the id generated on each component
        will be different,  so we can just use {id} on the htmlFor and on the input id
      □ One alternative would be to pass the id on the props, but since we have these hooks on React, we can also use make
      use of them.
      



         
            


            
            



          


    ○ Key difference from useState
      ■ `useState` can store any type of data.  
      ■ `useReducer` typically works with objects and handles multiple state updates in one place.  

    ○ Parameters

      ■ Reducer function (`mudaDados`)  
        □ Receives current state and an `action` object.  
        □ Uses `action.type` to decide what to do.  
        □ Can use `action.payload` to update state values.  

      ■ State object
        □ Contains all state variables previously managed with `useState`.  

      ○ Example

      ```ts
      function mudaDados(estadoAtual, acao) {
        switch (acao.type) {
          case "ALTERA_N1":
            window.alert("N1");
            return {
              ...estadoAtual,
              n1: acao.payload,
              validadeN1: acao.payload > 0 // payload is the attribute we sent on the action call.
            };
          default:
            return estadoAtual;
        }
      }


      // usage in JSX
      <InputFormatadoSemLabel
        semLabel={true}
        tipo="number"
        valor={dados.n1}
        onChange={(e) =>
          dispatch({ type: "ALTERA_N1", payload: +e.currentTarget.value })
        }
      />
      ```

      ○ sum action

        ■ inside the mudaDados function we are also going to define one for the sum
        ■ This action will first check the `validadeN1` and `validadeN2` states and then it will return an object with
        everything on the currentState, and the soma state will be overwritten with estadoAtual.n1 + estadoAtual.n2.
          □ In case of failure in the validity check, simply return the current state
    
      ○ Summary

      ○ If we look now, from the moment we switch from useState to useReducer, all the state variables are now grouped
      in one object, and the logic of how these updates in our data happen is everything inside the mudaDados function,
      which take care of all the actions. While on the previous example it weas "spreaded" all over the file.
        ■ Which ends up being interesting if we have a set of data where we have multiple rules to be followed, and grouping          these possible updates we are able to easily maintain the code and identify what is happening across      all actions.
          □ Example: We know that when we click on the sum button, we know, with the dispatch type, that a sum will happen
          and with the action types we are able to add some sort of coherence, and make the code cleaner.
        
        ■ Implementing the useReducer may be a little complicated at first glance, mainly because this whole dispatch
        function is not directly utilized to alter the data, and yet, to call one of these actions.

        ■ Many times useReducer is used along useContext, since useContext is used to store our information and these
        updates is done using useReducer. 
          □ Instead of having multiple states as we were working on the contexts until now, we would have only one useReducer
          and we use useReducer to handle the interface between acrtions and the state updates.  

  ● useId

    


      





  


    




 
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

        ■ And how does the selecionarItem function works?

          □ This function receive a url as argument and runs through an existing data strucuture (which is the `secoes`).
          The reult is a new `secoes` array, where the item with the corresponding url is marked with the property
          selecionado: true.

          □ Line to line detialing

            3. Mapping The Sections

              . Creates a new variable `novasSecoes`
              . Utilizes the method .map in the secoes array
              . map iterates over each array section and returns a NEW array (novasSecoes)  with the transformed sections.
              This ensures that the original structure secoes is not modified (imutability)
            
            4. Mapping the data inside each secao

              . const novosItens = secao.itens.map((item: any)) => {...}
              . inside each `secao`, is created  a new array called new itens
              . the map iterates over each item inside the current secao, creating a transformed version of the itens
              array

            5. Selection Logic
              . return {...item, ...}  this is the main part. it spreads the item to copy all properties inside of it to
              a new object
              . selecionado: item.url === url is added or overriten in the new object
                . true if the url is equal to the url property
            
            6. Returning the updated section
              . return { ...secao, itens: novosItens}
              . original section is copied, and the itens array inside of it, is replaced with the newItens recently
              created, which contain the applied logic.
            
            7. Outside all the mappings, return the newArray
             
        □ Basically, the functionality is as follows: 

          The array returned by the outer map (the one creating novasSecoes) is made up of new section objects. Each
          section contains a new variable called novosItens, which is created by another map inside it. In that inner loop,
          each item gets a new property called selecionado. Then, each section is returned as a spread copy of the original,
          but with its itens property replaced by this new novosItens array. As a result, the novasSecoes array
          represents all the updated sections after this transformation.

    ○ Extracting the logic from MenuPrincipalSecao

      ■ We also need to fix the problem in our app, that is our MenuItems state being resetted every time we change examples.
      And for this we are going to extract this state internal logic, to say if it is open or not from our components state
      to our context.

      ■ Inside MenuSecao, we have this [aberta, toggleAberta] state that is toggled on click. And we are going to move this
      state to our MenuProvider context 
      
      ■ Since our `secoes` are objects very similar to our items, and now we are going to modify the secao `aberta` prop.

      ■ The logic for this, is going to be similar as the one to select an item. This alternarSecao is going to receive the
      sessao as parameter, iterate through the `secoes` and find the right place to update
        □ After finding it, we return a new object, destructuring the current sessao but modifying the aberta property
        to the opposite of the current value

      ■ After exporting this new function, go back to the MenuPrincpal, and utilize this function inside the 
      MenuPrincipalSecao component onClick prop

      ■ Inside MenuSecao component, where we used to have the toggleAberta, where we were manipulating the state inside each
      component, we replace it by props.onClick, which will update the context state
      
      ■ We are now receiving an error that the secaoSelecionada, which we pass in the MenuProvider function is undefined.
        □ We may think, ok, so this function needs to receive with is the secao, but MenuSecao does not have access to the
        secao, should i pass it as prop?
          . The answer is no, when we pass the onClick alternarSecao from the MenuPrincipal to the MenuPrincipalSecao
          component as onClick, we can pass it already with the parameter, so when we call, on the child, the alternarSecao(secao)
          this component will already call the function with this parameter with no need for us to inform it.
      
      ■ Now, since there is no state being updated within each component, when we open a minified secao, and click on any
      item, it won't reset to the initial state and will keep expanded.

      ■ And why was this problem happening? 

        □ What was happening is a classical problem about where the state is stored and how it is updated related to the
        components lifecycle

        □ the main problem was in the fact that the menu state (if a section is open or closed) was being controlled locally
        by each section using useToggle

        □ After changing the state control for a centralized place, this problem was fixed. But why?

          . Before change:  
          
            - With the local state problem, the state was mounted with the useToggle as false, which was the current value
            of aberta.
            - When clicking on the component´s useToggle, it changed the local aberta state to true, but this would result
            in a reset, since it would invoke a route or a change in the app's global state
            - This change would force the parent component to re-render
            - When a parent re-renders, he re-renders all the <MenuPrincipalSecao>   
              - If React decided that the compoennt was the same, useToggle wouild keep the state as true
              - BUT if the re-rendering made that the component was unmounted and remounted (which can happen for multiple
              - reasons, such as key change or component tree restructuring), in other words, if the parent's re-rendering
               was too "agressive" it would be re-initialized
            - By being re-reinitialized, it would go back to the initial value

            - In summary: The aberto state was living inside each secao. Anything that makes the component to be re-mounted
            or re-initialized would force it to go back to the default value

          . What happened after the change (Centralized State)

            - The solution worked perfectly when we applied the "Lifting State Up" pattern

              1. Source of truth: All the secoes state now reside in the context, where we define the setSecoes
              2. Controlled Update: the alternarSecao function is the only point where we can alter the aberta status. And
              it does it immutably (creating a novasSecoes array).
              3. Dumb Components: Menu Sections don't use anymore the useToggle. They simply receive the property aberta
              as a prop from the parent and use it to render (turning out to be just a presentation component).

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

  ● Other Hooks

    ○ Memoization

      ■ We will start looking at the other hooks using the useMemo hook, the memoization concept consist of a computacional
      technique for us to improve the performance of our applications when we have very "expensive"/"complex" calculus, that
      take too long to be executred

      ■ useMemo hook

        □ For this example, we define four states of n1...n4, create a constant which will be n1 to the power of n2 and
        create a div whjjich will display the value of n1, n2 and the potencia constant. Finally, an input for defining the
        value of n1, and another one for the value of n2

        □ Duplicate the same div, with the two inputs, but this time, for n3 and n4. Different from the powered calculus,
        here we will execute a sum between both.
        
        □ Now that we have our structure we are going to make modifications to exemplify use cases for useMemo

          1. Turn the potencia constant, to use a more complex calculus
            . Instead of just `const potencia = n1 ** n2;` we are going to create a function to calculate the power.
              - Within this function, we are going to define a constant `future` equal to Date.now() + 3000, and create a
              while loop that checks if the current time is bigger than the future variable (when we don't want further
              processing of a while loop, instead of open and closing brackets, we can simply use semi colon). After this
              time is passed and Date.now() is bigger than future, we return n1 to the power of                

          2. With time out, our "longer" calculus are going to execute whenever we change the input value and we will have
          this timeout every single time. However, we are going to notice, that if we try to change the n3 or n4 states
          that are not even related to the values used by the function potencia, they are also going to have the same
          delay to execute. Why is it?

          3. When we increment a value and change the state, we are forcing a new render to the page, and this new render
          also include the potencia function which calls the setTimeOut, and here is where the memoization enter

          4. Memoization is a technique which give us the ability to improve the performance of the apps and through it
          we are able to always return the same result a given time we receive the same parameters in a function, which
          we won't have to make this same calculus over and over again. useMemo allow us to memoize this potencia function
          so its result, that its complex, don't need to be calculated if n1 or n2 didn't change 

          5. To fix this, we create a new variable potencia with the memoized value, which is going to be a callback
          function that does exactly what the function did, but it is now wrapper in a useMemo with the states n1, n2 as
          dependencies.

          6. Now, when we update n3, the longer function won't trigger and it will happen with no delay

      ■ Memo function

         □ React.memo(Component) wraps a functional component and prevents it to re-render when the received props stays
         the same (shallow comparing, uses === for each prop).
            In other words, if the parent component re-renders, the memoized child only re-renders if a prop change its
         reference/value

         □ Our code

          . Before useCallback, when the parent component re-rendered, for ex, when setQuantidade(0) was executed, React
          recreatred the whole function finalizar

          . Each time time the parent component is executed, the function finalizar was created

          . This means that finalizar has a new memory reference at each render. Even if the function ode is the same,
          for React, is a different function

          . And even if we used React.memo on the button, it receives the onClick, and when react compares the old and
          new props, it notices that
            - `onClick (before) != onClick (now)`
            - And the result is that it renders again even with React.memo

          . When we changed the finalizar function to utilize useCallback, React memoizes the reference of this function.
          So while the dependency array don't change, finalizar continues being the same object in memory between renders.

          . So by the time React compares the props of the memoized button

            - onClick (before) === onClick (now)

          . As a result React.memo notices that no prop changed and skips the button re-rendering

        □ The role of each one

          . React.memo -> prevents re-render if props don't change
          . useCallback -> Keeps the reference between rendering

          . This means that useCallback by itself doesn't prevent rerenders, he just ensures that the reference do not change.
          Who really prevents the render is the React.memo in the child

        □ Important observation!

          . In our case, the dependency array is empty, which means that
            - finalizar never changes reference
            - but also freezes the state `quantidade` value inside the function because it is not recreated.
            - 
          □ If we want to utilize the update value of quantidade inside the function and still keep the button stable, the
          trick is using a useRef.

        □ Final summary

          React.memo without useCallback -> Button still rerenders, since the props and reference change
          useCallback with no React.memo -> Function is stable, but button re-renders
          React.memo + useCallback -> Button does not re render since the props and reference are identical.



          
           
      ■ useCallback hook

        □ For this hook, we are going to store products inside a state
        □ We create a state to store the quantity of product, and an input to update this state
        □ Apparently everything is working, the input updates the state onChange, the button click calls a function that
        alerts that the purchase was made, set the quantity back to 0, and in the beginning it prevents a reload. But

        □ There is a small problem inside this example that is not very obvious, but it is the problem that will be solved
        with useCallback.
          . The problem is that our button is being defined in the component, receiving a property texto and a click func
          . If we go into our Button component and place a log saying to inform that the component render we are going to
          notice that this component does not render only on the click, but everytime we type change the input, which
          will cause a new render to the input and this new render, renders the Button again
          . Which means that, even if we are not updating what we are passing to the button, the button is built multiple
          times as we click on the increase or decrease arrow of the input number.
          
        □ We know that a component in react will be rendered when we change its state, or when some property it receives
        changes. But we may think: "Ok, but i don't have a state in our button, nor changing any property inside of it".
        And indeed, we as developers are not altering these variables, but react is altering on his own, and by this, we
        mean that when we alter the input, we modifyy the state and render the component again. After this change, we have
        recreate this function `finalizar` and in each time we are going to have a new version of this function. 

          . We know the function is the same and it do the same thing, but React does not know it, he only knows that the
          finalizar function it receives, is not exactly the same function, in the same memory address that he had previously.
          So by this, react understands that we have a different function, thinks that we changed the parameters, and renders
          our button again.

          . The button will be rendered again having a function insie of it, or not, since the component is inside the
          input that changes the state, but the point is the optimization, the function finalizar, which will be recreated
          everytime, may be very expensive, and this is what we need to prevent. Just a small component would cause a negligible
          lost of performance.

        □ And how we can prevent this? 

          . Using the useCallback hook

            - With useCallback, the syntax is very similar to the useMemo's one, we do basically the same thing, but while
            useMemo memoize the result of a function, useCallback memoizes the entire function itself so it is not rebuilt
            over and over again.

            - In the dependency array, we specify the dependencies that will make our function to re-render. Since in this
             case we don't want it to be computed, we simply pass an empty [], which mean that this callback will only
             execute when the component is rendered for the first time

            - By doing this, our function is memoized, but this is not everything for us to fix our problem.
              - To fix the problem, in addition to memoize our function, we have to memoize the `Botao`
              - First, we duplicate the Botao component, and create a BotaoMemoizado (this name does not make any difference,
              it is just for educational purposes).
              - The button will be practically the same, with the only difference being that instead of default exporting
              the component Botao, we now, in the end of file, export default a React.memo(Botao) and the whole component
              will be now memoized

            - Now, with the BotaoMemoizado created, we go back to the memoizandoFuncoes component, and instead of using
            the Botao component, we modify it for the new one

            - By going back to the browser, and changing the input value, the button is not being re-rendered

            - However, there are going to be cases when we can't memoize this function, for example:
              . If we would like to print the quantidade state, instead of "finalizado"
              . If we do this, go back to the browser, change the quantity to 5, and click on the button, even by saying
              `window.alert(`${quantidade} produtos`)` the message will be 0 produtos, why is that? 
                - Because at the moment the function was memoized, the value of the state quantidade was 0 and it simply
                kept this value. And if we need this function to interact with new values, maybe useCallback is not the
                best option. But in cases where it does not need to deal with data that will be updated, we can use it
                to improve our component performance

                - However, when a function is complex and expensive (e.g. it does a complex calculus) and need a dinamic
                state, we are required to include it in the dependency array. The function changes every time the state
                change. But the optimization useCallback provides (maintaining the reference) is canceled in each state
                change
                  . What we win: The function is not recreated when other states or props (that are not quantidade) from
                  the parent change. This is still a performance gain
                  . What we lose?: Function is recreated every time quantidade change, which is inevitable
                
                  . But yet, if we have multiple states in the component, and these components may change at a higher
                  frequency than the ones that cause the function to rerender, it will reinforce the idea of using
                  useCallback to improve performance

      ■ Differences legacy forwardRef to modern typed approach

        □ Legacy: When using forwardRef, the ref is not passed as a common prop, it comes separate via second parameter
        of forwardRef
          . The ref type should be something like React.Ref<HTMLInputElement>
          . We could extend the native attributes of <input>, which would allow us to add `<input {...rest}>
            This ensures that the component would accept any valid input prop (such as placeholder, onBlur, disabled, etc.)\
        
        □ Modern and correctly typed:

          ```ts
            import { forwardRef, useId } from "react";
            import React from "react";

            interface InputFormatadoProps extends React.InputHTMLAttributes<HTMLInputElement> {
              label?: string;
              tipo: string;
              valor: string | number;
            }

            const InputComReferencia = forwardRef<HTMLInputElement, InputFormatadoProps>(
              ({ label, tipo, valor, className, ...rest }, ref) => {
                const id = useId();

                return (
                  <>
                      {label && <label htmlFor={id} className="m-1">{label}</label>}
                      <input
                        id={id}
                        ref={ref}
                        type={tipo}
                        value={valor}
                        className={`
                          text-gray-600 px-2 
                          w-40 h-11 rounded-md
                          ${className ?? ""}
                        `}
                        {...rest} // ← permite passar qualquer outra prop de input
                      />
                    </>
                  );
                }
              );

              export default InputComReferencia;
          ```

          
          

            2. forwardRef is a React function that transforms our component so it accept refs passed from outside and 
            passes it down to an internal DOM element (or other component that accept refs)

            
            
          .  In this example, forwardRef<HTMLInputElement, InputFormatadoProps>
          Defines the ref type (to point to the real <input>) and the prop types
          .  extends React.InputHTMLAttributes<HTMLInputElement>
            Makes the interface inherit every native prop of an <input>
          . ...rest
            spread all the additional properties a user may pass
          . We do not need to declare ref inside the interface


      ■ useImperativeHandle 

        □ This hook allow us to change our reference on a child component.

          . For this example, we are going to use a custom input component that do not specify it receives the property ref

          . We defined a ref and for us to pass it for this input, since we are not able to do so by the ref property, and
          React has its own ways of passing a reference for a custom component. 

          . We are going to duplicate the InputFormatado component, rename it to InputComReferencia and inform it needs to
          receive a new property ref

          . And for us to receive this reference accordilingy, we are going to need to wrap this function inside another
          function. And instead of exporting the component, we export a `forwardRef(InputComReferencia)`

          ** Linter was complaining that the label do not have an input linked to it, the approach i took was to define
          an id constant being equal to React's useId(), used it in the label's htmlFor and in the input id **

          .First of all to avoid utilizing any and having linter errors warning because of it, we type legacy forwardRefs
          with ref: React.Forwarded<HTMLInputElement>. While new forwardRef components have the
          InputHTMLAttributes<HTMLInputElement>
           
          . Now that we exported the component with the forwardRef, we can now make this custom input, to be able to
          receive a reference as a parameter, since this reference is going to be "forwarded" to the input

          . Back to our formularioImperativeHandler page component, after adding thhe reference to the input component, we
          defined a reference with useRef<HTMLInputElement> and passed it down to the `InputComReferencia`

          . Now, that we can pass a reference as a parameter to this component, which will "forward" it to the input.

          . As soon as we type something on the new page input, we are going to see that it is blocked, this happens
          because of the "valor" prop the input is receiving, because as soon as we pass a value to an input, we also
          need to pass an onChange function for this value.

          (Explanation further down)

          . We are going to remove the value and the onInput since we are not using them.

          . Now, in our example, until now we hhave a parent component that   

        □ Now that we have our a component where the parent pass a reference to a child component and we are using that reference
        Inside the input. But what is idea of the useImperativeHandle? how can we use it?

          . The idea of this hook is that when we have a parent component, passing information to a child component. We can,
          inside the child, customize some behaviors in the reference. 
            - This is a hook that will only be used on very specific cases, and most of the times, it won't be the best solution
            for the problem we're willing to fix (that is said even on the documentation itself).
          
          . For us to change the reference we're receiving as parameter, inside the component we will need to create an
          interval reference. This reference will be a function that will contain the updates we wan't to do on our reference.
          Which means that we wan't to add functionalities in our reference, and these changes must be defined within a
          function.

            - The function to be created will be called novasFuncionalidades and this function will return an object where
            we specify which actions we want to add to our reference. and on our functions, we need to use the internalReference
            we have just created and not the one received from the parent.

            - The function `novasFuncionalidades` will simply return an object with two functions, `apagar`, that erase the
            content of this internal reference, and other one called `textoPadrao`, that simply changes the internalReference
            current value
          
          . Now we are going to make this reference received to also have these funcionalities, and for this, we will make use
          of the `useImperativeHandle`.
            - This hook receive three arguments: reference we received as param, the functionalities we want to apply to this
            reference. We also have as a third parameter, a list of dependencies.
          
          . With this being made, we are able to alter our reference and make these functionalities we've defined inside the
          child component, is accessible through the parent component
            - The last touch is to replace the ref we pass inside the input for the `referenciaInterna` instead of the one
            we have received as parameter

          . So in summary, what we've done was:
            - We received a reference as prop
            - Created a second reference to be internal inside the component
            - Created some functionalities we would like to expose to the parent component
            - Used the hook `useImperativeHandle` to apply in the reference we received as parameter the functionalities we
            would like to expose

          . This is a good strategy in case we have to implement different behaviors in some components. We could have multiple
          different inputs and through this hook, using this strategy, implement multiple inputs and each input could have
          an apagar function and a textoPadrao function that would do different things.
            - So, multiple inputs with different internal behaviors, but that we had to use these behaviors in the parent
            component.
        
        □ Using these new information inside the parent component

          . Back to the formularioImperativeHandle component, inside the InputComReferencia, create two buttons, on named
          apagar and the other padrao.   
          . Now, we must define the functions to trigger when these buttons are clicked. First, insde the apagar function,
          we are going to execute what we have defined in the input component's `novasFuncionalidades`.
            - To do this, we will use the referencia we are passing as prop to the child, e. g.
                `function apagar() {inputRef.current.apagar() }`
            - The same will be done to the padrao
          . This mean that the behavior we defined in the child component can now be accessed through the parent

          . Summary

            - We are creating the referenciaInterna, inside the input, to access the input's DOM
            - ref - is passed via forwardRef to the parent component
            - We always have to change input's ref to use the internal reference to correctly point to the HTMLInputElement

      ■ useLayoutEffect

        □ First, let's use useEffect as an example
          . Let's say we have a `texto` state, it has the value of "Texto Secreto", but in the same component it has a useEffect
          that modifies this state when the component is mounted
            - However, if we type f5 we are going to see the "Texto Secreto"  blinking on the screen, and then it gets replaced
            by 'Ciao' from the useEffect setter. There's not much we can do about this, and this Texto Secreto will also show
            when we enter the page.
            - The reason for the page to blink with the initial value has to do with the way useEffect works, the actions
            made inside the component will happen as soon as the component is placed on the screen. Therefore, it first inserts
            the paragraph with the {text} content, but soon after, in miliseconds, the useEffect fires and change its content
            . If we think that our interface is a kind of "painting canvas¨, first we have to make the "sketch" of this
            drawing and afterwards, paint over it in places where it is necessary.

        □ useLayoutEffect

          . This hook basically works the same way, it also receives a cb function as well as a dependency array, but what
          is the main difference between them?
          
          . On the example of a painting canvas, where we would have to first draw the sketch and then make the "patches".
             - While useEffect first make the sketch, paint the screen, and then it sees that what it has done has to change
            - useLayoutEffect makes the sketch, corrects what needs to be corrected in the sketch, and then paint the final
             version of it
          
          . Therefore, if in our example, we change to useLayoutEffect hook, we will be able to see that the screen does
          not blink anymore with the old content. 

          . However, if we refresh the page with f5, we still see the old content, why?

        
        □ Why do we, with F5, still see the old content?

          . First, let's make one thing clear:
            - 1. In useEffect, after the rendering and the paint, the screen was already shown to the user, so it sees the
              result withoput changes by a millisecond
            - 2. In useLayout, after rendering, but before the painting (before the browser show something on the screen).
              the user does not see the intermediate result, he already sees the updated layput

          . So why does with a refresh (F5), we still see the old content?

            - This happens because the first render (SSR or Initial React) is not controlled by effects — neither useEffect
              nor useLayoutEffect

          . Here's what actually happens:

            1. React renders the component with the initial state (e.g. const [text, setText] = useState("Loading..."))
            2. The browser paints the HTML on that screen
            3. Only after React's JS is loaded and the page is hydrated, the useLayoutEffect and all effects run

            - So what we are seeing during F5 is the pre-hydration HTML, not a delay from the hook itself


        □ In summary, this hook is interesting when dealing with slower connections. So it's important to consider
        using this hook when we need to do updates on the layout of our page.

        

          

      
        

        


        

        

            
  ● Controlled Inputs and Uncontrolled

    ○ In React an <input>  can work in two modes:

     ■ Uncontrolled: The browser itself, and the input will manage its own state
     ■ Controlled: React (via useState or props), React decides what value of the input is shown

    ■ When we pass down a new value, like `<input value={someValue}>
      - We are telling React: "This input's value is fully controlled by me (React)  — the browser cannot change
      on its own
    
    ■ This means: the only way the input value can change is if we update {someValue} and it comes from the parent
      - Did the parent update the value?
      - If not -> React keeps rendering the same old value

      □ As a result, the input looks frozen (if we type, nothing happens)  

      □ This is why we need an onChange. to make it editable again, we must tell React what to do when the user types, and updates the state that controls the value

      ```ts 
        function Parent() {
          const [text, setText] = useState("");

          return (
            <input
              value={text}                // controlled value
              onChange={(e) => setText(e.target.value)} // updates the value
            />
          );
        }
      ```
      - Now when the user types, onChange fires and we update the text using the setText
     
  ○ When the user pass the values to a child component, if we write

    ```ts
      <ChildInput value={text} />

      function ChildInput({value}: { value: string }) {
        return <input value={value} />
      }
    ```

    ■ We are still in a controlled scenario — the child's input depends on a value controlled by the parent

      □ If the child doesn't have an onChange that calls back to update the parent, the input becomes read-only. The DOM
      tries to change it, but React keeps forcing it back to the old value.
        . That's why React will even warn you:

          "You provided a value prop to a form field without an onChange handler"


  ● Challenges

    ○ Challenge 1 - Gerador de Cor

      ■ This test will be done using the useLayoutEffect
      ■ The function has two buttons, a display with some text and a div. Inside this component it will also have a function
      with a constant named cor which will be equal to Math.Random x 0xffffff — this value is the numerical representation
      of the color white in hexadecimal, it is the samue as if we write #FFFFFF in CSS. The 0x prefix indicates that the
      number is in hexadecimal base 16, and each pair represent a color channel (red, green, blue)
        □ In JS we can represent colors as numbers, e.g. red would be 0xFF0000.
        □ Which will then be converted to string with the base 10 as arg
      
      ■ The challenge will consist of
        □ 1 - Showing the div conditionally, and we want the div to show when we click on the button 'Sortear cor' and vanish
        when the button 'Apagar cor' is clicked
        □ 2 - Display a text in the Display tag, saying any of these two options
          - Click on the button sortear
          - Show a random color
        □ 3 - Alter the div color according to the random color defined by the function

      ■ My Approach

        □ Created a state of the randomColor, on the function to generate a random color, i followed the same approach as
        before, but i created a `corHex` constant that was equal to `#${randomNumber.toString(16).padStart(6, "0")}
          . the padStart has the following signature: padStart(targetLenght, padString)
          . It is a string method that adds characters to the beginning of a string until it react the specified length
          . In our example, targetLength will be 6, that is the value of a hexCode, and in case this number have less then
          6 cases, we are filling it with 0s

        □ Then, by transforming into toString(16), we get the corresponding hexadecimal, and by adding # before this number
        we are going to get a valid CSS color

        □ Then, since tailwind does not recognize dynamic colors, because it only runs in runtime, we attach the style prop
        backgroundColor equal to this color

        □ For the dynamic color name, i chose an effect for when the color changed to also change the text

      ■ Problems with my approach

        □ The color generating was correct. However, the text display wasn't.

        □ I was using useLayoutEffect to define the initial text, and the problem with this is that useLayoutEffect is
        executed synchronously after React's DOM layout calculation, but before the browser "paint" the screen.
          . It is ideal for DOM layout measurements. To define a initial state that do not depend on layout measurings,
          useEffect or simply the useState initialization would be more appropriare.
          . Furthermore, the way i was calling setText inside useLayoutEffect was incorrect
          . For defining the dynamic text 

      ■ Instructor´s approach

        □ She used the useBoolean hook, that receive a `valor` as parameter, if not, it declares valor as false, and assign
        to a ativo state the value of valor
          □ A toggleAtivo that toggles the value of the state, a ativoTrue, that turns ativo as true, ativoFalse that do the
          opposite.
          □ We return an array with the value of ativo, the toggleAtivo, and the setters to true or false
          □ the useBoolean hook will be `const [mostrar, toggleMostrar, mostrarTrue, mostrarFalse] = useBoolean();`
        □ When clicking on the sortearCor it will execute mostrarTrue, and when we click on the apagarCor button
          we will execute the mostrarFalse
        □ Where i used the randomColor state to check if it exists, and used it as a ternary for showing the div with the
        randomColor state, or with the default color, the instructor preferred to simple use it as simpler ternary:
          . {mostrar ? <div className={`h-32 w-32 bg-red-300`} /> : "" />}

        □ As the second challenge, she created another state with the desired text and altered the Display text
        □ She used the useLayoutEffect to render display the dynamic text on the Display.
          . This function will verify is true and setTexto to the gerarCorAleatoria function, and if it is false, the text
          will be clique in sortear.
        
        □ Defined a useLayoutEffect that verify if the mostrar is true, if yes, setTheText equal to the result of
        geraCorAleatoria, if no, set the text as "Clique em sortear"

        □ Created a ref and associated it with the div and used the useLayoutEffect to change the style.current value of the
        according to the function return

    ○ Challenge 2 - soma com useState

      ■ Challenges:

        □ 1 - Create two states that will store number 1 and number 2
        □ 2 - Link these two states with our inputs
        □ 3 - Sum both numbers with the criteria of the number being that the number is valid if it is > 0
        □ 4 - Sum clicking on the buttom if the numbers are valid, in case they're not we return a result such as -999

      ■ My Approach

        1 - Created 3 states, one for n1, other for n2, other for the sum, i chose to type these states as a string and
        parse them as float afterwards, just to remove the 0 from the input value
        2 - Linked both numbers to the inputs, and created a new method on the input of onChange for them, since onInput
        fires on every key stroke, and onChange is only after the input blurs
        2 - Created a somaEstados function, that created two new constants of num1 and num2 equal to their respective values
        parsed as float.
        3 - I didn't create a areNumberValids state to check if the numbers are greater than 0. Since that when React
        calls the setAreNumbersValid(true), this do not immediately updates its value. So when verifying if that state
        is true, its value may still be the old one, not the updated one. And this will make the conditional block to
        always work the wrong way

      ■ Instructor's Approach

        1 - Created 2 states, one for n1 an one for n2, both states initialized with 0, and linked them to the inputs
        2 - Used the onInput to set the + e.target.value of the input
        3 - Create 2 more states, one `validadeN1` and `validadeN2`
        4 - Defined two useEffects, one to check the validity of n1 when it changes and other when the n2 changes
          □ My Comment: I thought defining separate useEffects for each number state didn't have a reason, and defining
          only one effect to check the numbers validity would have the same result since if any value on the dependency
          array change, it will trigger a new render. However the approach she took deals with the `Single Responsibility
          Principle`, whiich in turn make the code cleaner and easier to understand in isolation. Because if in the future,
          we have to change the validation logic of one of them, without altering the logic of the other number, we would
          know exactly where to change. And when we render in one effect, we would even have a small loss of performance,
          since that it only needs to check one state at a time
        5 - Created a function `fazSoma()` to sum both numbers in case they are valid and associate it to the button
        that will execute this function onClick
        


  ● When should i wrap the ` sign around {} ? 

    ○ 1. In plain JS (outside JSX)

      ■ You DON´T NEED {}.
        □ We are in the JS mode, so we can simply use the template string with backtick: setText(`#${generateRandomColor()}`)

    ○ Inside JSX (React's HTML)
      ■ Now we need to wrap it in {}, since JSX is not JS — It is a language similar to HTML

      ■ The {} are used to "enter" the JS mode inside JSX

          ``` return (
            <h1>{`#${generateRandomColor()}}</h1>
          )

           {} around indicate that the content is JS
           ${} inside the template string is used to interpolate js variables inside the string

    ○ Dynamic classes example

      ■ `<label className={`${props.semLabel ? 'hidden' : 'inline'}  m-1`}>{props.label}</label>`

        □ What is happening here is:

          . We enter the JS mode with {} allowing us to use JS code between the braces
          . We then interpolate strings and variables with template strings `${}`
            - In this case we are inside a className (but this woul work in any property that expect a string), and we
            wanted to mix variables/expressions with text. In this case, we need to use template strings
              - `fixed-text ${variableOrExpression}  more-text`
          . In our case, m-1 was the fixed text and we wanted to insert a expression to check if props.semLabel was true.
            - Then, we added the ternary inside the template string 

    ○ In summary {...} enter the JS mode inside JSX and  `${}` inserts dynamic values inside a JS string. ${} creates a
    template string, used for variables/expressions inside {``}
      ■ In JSX template strings are always inside the javascript mode: className={`${}`} not className=`${}`.
        □ This is valid JS, but not valid JSX.
      ■ Everytime we want to use javascript inside JSX (such as in classNames, styles, onClick, etc)  we must use {}
        □ And if inside of it we want to create a string with variables, then we uise template strings.

  ● Possible hydration errors

    ○ 1 - MenuProvider

      ■ The hydration error may be caused by the useTamanhoJanela hook. Since in the beginning of the component we check if
      window is true or undefined, when JS first executes the code in the server, window will be undefined and the values of
      largura and altura are going to be -1. Therefore, tamanhoVerdadeiro is undefined

      ■ In the client, as soon as the page loads, the hook runs again with window.innerWidth and finds out if the window
      is "md" or "lg" — And the tamanho state changes. Which on the MenuProvider, will trigger the effect of checking if
      the tamanho is md or smaller, that the mini is set to true, otherwise, false.
        □ As a result, server renders mini = false and the client, after mounting, renders mini = true
        □ Then the SSR's HTML (wide) will not match the client (narrow)

      ■ Possible solutions

        □ 1. To render only on the client

          . This makes that the menu is rendered only after the client mounts, using a state hydrated

          ```ts
            //In MenuPrincipal
            // imports and useMenu call
            useEffect(() => {
              setHydrated(true)
            }, []);

            if(!hydrated) {
              // while the client hasn't mounted, doesn´t render anything
              return null;
            }

            // rest of code
          ```

          . This will delay the rendering until the client mounts, avoiding anyu difference between SSR and client-side
      
        □ 2. Ideal Solution (consistent SSR)

          . This more refined approach will be to ensure that euseTamanhoJanela return a fixed value on the server, such as
          "lg", and only update it after the mounting on the client

          ```ts
            function getTamanhoJanela() {
              if (typeof window !== "undefined") {
                const { innerWidth: largura, innerHeight: altura } = window;
                return { largura, altura };
              } else {
                // SSR: returns a neutral and predictble size
                return { largura: 1280, altura: 720 }; // "lg" by default
              }
            }
          ```

    ○ MenuSecao - button inside button

      ■ If we look into the MenuSecao, we have a snippet where we have an external button that involves everything
        □ And inside of it, when mini is false, we render another internal button for the icons +/-
      
      ■ This is an invalid HTML, since a button can't contain another button and this generated React's hydration mismatch,
      because the rendered HTML in the servver is different from what the client expects.

      ■ How to fix this? 

        □ We need to, in this case, look forward to place the clickable button only on the outer part

          ```ts
             <Flex col gap={4} className={`${mini && "items-center"}`}>
                {/* 1. We use the tag button for the clickable area */}
                <button
                    type="button"
                    className={buttonClasses}
                    onClick={props.onClick} // We pass the onClick to the main button
                    aria-expanded={aberta} // Accessibility property to indicate that the section is expanded
                >
                    {/* 2. Button content, icon and title */}
                    {mini ? (
                        titulo
                    ) : (
                        <>
                            {/* Title */}
                            <span>{titulo}</span>

                            {/* Icons (button visual) */}
                            {aberta ? <IconMinus size={15} /> : <IconPlus size={15} />}
                        </>
                    )}
                </button>

                {/* Rest of content */}
                {aberta && (
                    <Flex col gap={1.5}>
                        {props.children}
                    </Flex>
                )}
            </Flex>
          ```

  ● Component's State Control

    ○ This question arose when in the memoization text, i used the input's value as a state, and inside its onChange, i
    modified the same state, and i was not sure if i was allowed to do so, if it would block the input or something
    
    ○ When input's value is a state

      ■ In our example, we are controlling the value of <InputFormatado /> with the n1 state via useState. This means that
      the input is "controlled" by React. The value of the input is always in sync with the state, and any input alteration
      will update the state, since the state reflects in the input value

    ○ The issue i'm mentioning

      ■ In cases like this, there is no rule that forbids changing the state of a controlled input. In fact, it is expected
      that React's state be the "single source of truth".
      ■ In the n1 example, where we have the value property equal to the state and the onChange a setter for the same state,
      the input will reflect n1, and because we have the setter, everytime we type, the input value is updated by the state,
      and this is normal React way of creating controlled inputs

      ■ But there is one thing we must be careful
        □ e.target.value always come as string, even if the input the type is numer, so if we want n1 to be a number, we
        have to prefix e.target.value with a + sign or cast it  with Number(e.target.value).

      ■ The problem of "blocking" the input and nothing can be typed  iun it, happen if the parent pass the state via prop
      and we try to update the input locally without updating the parent state correctly

        □ function Child({value, setValue}) { return <input value={value} onChange={e => setValue(e.target.value)} />}

          . Here, setValor updates the parent state. But if we try to "override" it locally without updating the parent,
          or if the value stays the same because the parent didn't change, input will look "blocked"

        □ Other common case

          function Child({value}) {
            const [local, setLocal] = useState(value)

            return <input type="text" value={value} onChange={(e) => setLocal(e.target.value)} />
          }

          . Here the input does not change because value come from the prop value, and we arer updating only the local,
          which is not used in the value
          . Even typing, React always puts back the prop value as the value
        
        □ In summary, the blocked input usually gaooeb wgeb tge value comes from the prop and we are not updating this
        prop correctly.

      
    ○ What is single source of truth?
      ■ When controlling an input with a React state, this means that: 
        □ The input value is not inside the HTML element itself, but yet, on the state of the React component
        □ Which means that the input shows the value stored in the state
        □ Any change the user makes (typing, deleting, etc) triggers a function (usually via onChange) that updates the
        state, and then the input reflects the new value

        □ This is what we call "source of truth" - the actual value of the input lives in the state

      ■ Example: 

        ```ts
          import { useState } from 'react';

          function MyComponent() {
            const [name, setName] = useState('');

            function handleChange(e) {
              setName(e.target.value);
            }

            return (
              <div>
                <input value={name} onChange={handleChange} />
                <p>You typed: {name}</p>
              </div>
            );
          }
        ```

        □ `name` is the state -> the only source of truth
        □ The `input` displays the value from name
        □ When we type iun the input, onChange changes the state
        □ The <p> also uses the state to display what was typed

        So the input value can be used elsewhere (like in the `<p>` above) — And that's exactly the power of having the value
        centralized in the state

      ■ What this does not mean:

        □ It does not mean the input's value can only be used in the input itself.
        □ It also doesn't mean the value can't be changed from somewhere else.
          . We can update the state in many ways, and the input will reflect the updated value automatically

      ■ In Summary:

        □ When we say that the input's value lives in React state , we mean that the state is only reliable source of that
        data. The input just reflects what's in the state. And any other part of the app can also use that value — because
        it is centralized.

      ■ But if it can be altered in more places than one, and also can be used in more places, why is it called single
      source? 

        □ In the web dev context, it means:
          . The main and reliable place where a data lives.
          . All the other parts of the app read this value from this source and do not keep independent copies what can
          be "out dated"

        □ Applying this to React: 
          . When we say the state is the only source of truth of a controlled input, we are saying that:
            - The real valie is only in the state
            - The input does not keep its value internally (such as a normal HTML input would do) 
            - The input only reflects the value of the state
            - If any part of the app wants to read or change the value of the input, it needs to interact with the state,
             even if it is not directly

             Even if multiple parts may use or update the value, they all are dealing with the same centralized place, the
             state. This is why it is still the "only souce of truth"
        
        □ Example outside of react: 

          We can think of a system where multiple people          

    ○ Where a function should be declared? 

      ■ The rule about where to declare functions in React (and in modular JS) is crucial for performanceand correct data
      manipulation. With this said, where should we declare it?

      ■ The decision of where to declare a function should be based in "Who needs to access this function?" and if it
      depends on the state or component properties

        □ 1. Inside the component (Recommended most of the times)

          . Local: Inside the body of the function component (before the return)

          ```ts
          export default function MyComponent() {
          const [counter, setCounter] = useState(0);

          //  This function is created from scratch on each render
          function calcularNovoValor(valor) {
            return value * 2 + counter; // 👈 Depends on the counter state
          }

          // ...
          }
          ```

          . When to use it? 
            - When the function needs to access the state (counter) or setters (setCounter)
            - When the function needs to access the props the component receives
            - When the function is a simple event handler (ex. handleClick)

          . Cost/Risk: The function is re-created (new reference) on each render. This is normal and accetable for most
          cases. However, if the function is passed as prop for a child component that is optimized with React.memo, the
          recreation nullifies the optimization, with the need of useCallback use
        
        □ 2. Outside of the component (Module level)

          . Local: On the top of the file, outside of any component function

          ```ts
            // This function is created just once when the module is loaded
            function formatCurrency(value) {
              return `$ ${value.toFixed(2)}`; // 👈 Does not depend on state or component prop
            }

            export default function MyComponent() {
              // ...
            }
          ```

          . When to use it? 

            - When the function is a pure function that do not need access to the state, prop or component setters
            - Example: utility functions (such as formatCurrency), generic validations, or constant data transformation

          . Benefits: The function is created just once and has the same memory reference in every render. This is the
          optimal practice for utility functions, since it saves CP time.
        
        □ 3. Using useCallback (for optimization)

          Local: Wrapping a function declared inside the component

          ```ts
            export default function MyComponent() {
              const [data, setData] = useState({});

              //  Ensure the reference do not change between renders.
              const fetchData = useCallback(() => {
                // ... fetch logic ...
                setData(newData);
              }, [setData]); // 👈 Dependencies ensure that the function only change if the setter change

              // ...
              return <OptimizedButton onClick={fetchData} />;
            }
          ```

          . When to use it? 

            - When we have a function declared inside the component (which uses state/props) and need to pass it as prop
             for an optimized child

            - When the function is expensive and complex, and we need to avoid its unnecessary re-render

    ○ Breaking down Next.js until version 12 structure

      ■ 1. pages/index.tsx

        □ This is the initial page.
        On the old routes system, the name of the file inside the folder /pages defines the route. Which means that
        `pages/index.tsx` -> /
        `pages/about.tsx` -> /about
        `pages/products/[id].tsx` -> products/:id

        □ This file by default exports a component React, that Next renders automatically when the user accesses that
        route

          ```ts
            export default function Home() {
              return (
                <Pagina>
                  <Logo grande col subtitulo="Todo o poder do React em componentes funcionais" />
                </Pagina>
              )
            }
          ```
        
      ■ 2: _app.tsx

        □ App's global entry point, everything rendered here involves all the pages

        □ In old react, it is used for initializing the context, providers and global styling.

          ```ts
            export default function App({Component, pageProps}: AppProps) {
              return (
                <TemaProvider>
                  <MenuProvider>
                    <Component {...pageProps}>{/* content of every page (index, about, etc.) */}=
                  </MenuProvider>
                </TemaProvider>
              )
              
            }
          ```
        □ Component is the current page, such as index.tsx and pageProps is the props next injects, such as SSR, etc.

      ■ 3. _document.tsx

        □ This is the base HTML of the app, it is equivalent to the index.html file in pure projects. It defines the dynamic
        structure of the document.

        ```ts
          export default function Document() {
            return (
              <Html lang="pt-br">
                <Head />           {/* Metadados and global links */}
                <body>
                  <Main />         {/* Here next inects the react content */}
                  <NextScript />   {/* Necessary scripts for Next */}
                </body>
              </Html>
            )
          }
        ```

        □ This file is usually used for
          . adding google fonts
          . global meta tags
          . analytics script etc.

          . This means that the legacy app have the _document.tsx equivalent to index.html of a traditional React project
          (Like the ones created by create react app) 

      ■ Comparing the old pages router to the new app router

        □ A quick summary would be

          Concept           | Pages Router                          | App Router

          Route             | Structure pages/ based on files       | app/ with folder architecture
          Global Layout     | _app.tsx                              | app/layout.tsx
          Base HTML         | _document.tsx                         | implicit inside layout
          Context providers | inside app_tsx                        | inside layout.tsx
          Data fetching     | getStaticProps or getServerSideProps  | fetch, async, server components

  ● Difference from a normal functional component and using a function that accepts refs passed from the outside to internal
  components

    ○ In the example of forwardRef, when i asked the modern and typed way to do so, another approach was introduced
    
       ■ Why is that approach different from a normal component?

        ```ts
          const inputRef = useRef<HTMLInputElement>(null);

          const MyInput(props: MyInputProps) => {
            return <input type="text" value={props.valor}>
          } 

          <MyInput ref={inputRef} />
        ```
        ?

        □ This won't work, since React does not allow us to directly pass a ref for a common functional component, because
        it doesn't know which internal element must receive the reference, and ref is not a common prop

      ■ What forwardRef does?

        □ forwardRef is a function from React  that transforms our component so it accept passed down from the outside and
       to pass them down internally for any DOM element or any component that accepts refs. The syntax would be

        □

          ```ts

            const myInput = forwardRef<HTMLInputElement, MyInputProps>(
              (props, ref) => {
                return <input ref={ref} type="text" value={props.valor} />
              }

              // and when using

              const inputRef = useRef<HTMLInputElement>(null);
              <MyInput ref={inputRef}>
            )

          ```

          The ref is passed down to the component and is passed to the internal <input>, this way input.current is what
          points to the HTML element.

      ■ And why does the format seems different? 

        □ When using forwardRef, React does not pass the ref inside props, he pass it as the second parameter of the function
        and that's why the signature changes from

          `const MyInput = (props: MeuInputProps) => {...}`

          to

          `const MyInput = (props: MeuInputProps, ref: React.ref<HTMLInputElement>) => {...}`

          however, React needs to "encapsulate" this — and this where the forwardRef enters

            `const MyInput = forwardRef<HTMLInputElement, MeuInputProps>(
              props, ref) => {...}`

            . Without forwardRef, React would´nt call the component with (props, ref) — it would only call props

            . In this case we might think, why is the ref as the second parameter and not the first one?
              - The answer is be because react defines the structure of the forwardRef as (render: (props, ref) => ReactNode)
              - Therefore, it always call our component with (props, ref)



        □ So in summary the common component does not accept ref while the component with forwardRef yes
            
  ● useImperativeHandle hook
    
    ○ What is it for?

      ■ React hook that allow customizing what will be exposed by a ref when using forwardRef
      ■ This means that instead of the parent directly accessing the DOM (inputRef.current.value), we can give to the parent
      a controlled set of methods or properties, such as inputRef.current.apagar() or inputRef.current.textoPadrao()

    ○ Why does it seem discouraging?

      ■ Because it breaks a little the core idea of React, that is
        □ "Data flow from up to down by props", and the DOM updates itself in this state, not the other way around.

      ■ useImperativeHandle goes against that
        □ It exposes internal behaviors for the parent component, what increases the coupling between them.
        □ It normally is imperative, which means, "do it know", different from the declarative style that React encourages.

  ● How should i call a function?

    ○ 1. {functionName} - passing the function reference

      ■ This is thye most performant way to call a function when it takes no arguiments (or only takes the (event object))

      ■ Common Example:

        ```ts
          <button onClick={handleClick}>Click me</button>
        ```
      
      ■ When to use: When your function does not need any arguments besides the event object that React automatically passes
      to it. React's event systerm handles calling the function when the event happens. Therefore, only use it for simple
      event handlers without arguments.



    ○ 2. Direct call (Immediate execution)

      ■ `functionName(argument1, ...)`

        This is how you call a function immediately when the component renders

      ■ Syntax: 

        `<div>{functionName()}</div>

        □ When to use: When you want the function to run once during the render cycle, and you want to display the value it
        returns

        □ Example:

          ```ts
            const getGreeting = (name) => `Hello ${name}`

            function MyComponent() {
              // the function runs immediately and the returned string is displayed
              return <h1>{getGreeting("Caio")}</h1>
            }
          ```

        □ Danger: Never use this syntax directly inside an event handler like (onClick) unless we want it to return immediately
        upon rendering, as it will cause an infinite loop or unexpected behavior
    
    ○ 3. Event Handler Call (Delayed execution)

      ■ {() => functionName(argument1, ...)}

        This is the standard and safest way to call a funciton later, usually in responde to user action (like a click)

        □ Syntax:

          `<button onClick={() => functionName()}> Click Me </button>`

          or if the function takes an event as argument

          `<button onClick={(e) => functionName(e, otherArg)}> Click Me </button>`

      ■ When to use: When you want the function to be called only wen the specific event (e.g onClick, onMouseOver, onChange)
      occurs. This passes a reference to an anonymous function that, when executed by React's event system, will then call
      your actual function.

      ■ Your options:

        □ ✅ { () => functionName() }: Use this when your function needs to take arguments or when you are unsure if it will.
        This is the most flexible approach.

        □ ❌ { () => functionName }: This is syntactically incorrect/redundant. You're defining a new function that just
        returns a reference to another function, which isn't what you want for an event.
    
      
  ● Deadlock (Infinite Loop) when updating a state

    ○ Let's think of trhis scenario

      ```ts
        const [texto, setTexto] = useState('')

        useEffect(() => {
          setTexto('Secret text not available')
        }, [texto]) // Dependency that causes the error

      ```

      ■ The sequence of events that cause the error are

        1. Initial rendering, component is rendered for the first time with the defined state
        2. useEffect is executed, since the dependency array [texto] is evaluated, and this is the first render, useEffect
        simply executes the function
        3. State update, the function inside the useEffect calls setTexto with a new value
        4. Re-render, calling setTexto informs react that the state change, causing a re-render, texto is now the new value
        5. useEffect executes again 
        6. Re-renders again, but with the texto continuing to be the one chosen
        7. New Re-render
        8. forever...

      ■ This create an uninterrupted cycle, consuming resources and eventually, making React to xstop the processing and show
      in the console, something as "Maximum update depth exceeded. This can happen when a component repeatedly calls setState
      inside useEffect or useLayoutEffect"

  ● Tailwind does not have access to dynamic colors on build time only on runtime

    ○ What does build time and run time mean?

      ■ Build Time:
        □ It mean that the code is analyzed and converted into something that the browser may understand (ex: Vite packagiing
        , Webpack, etc).
        □ It executes before the app runs in the browser

      ■ Runtime

        □ It's when the code is already being executed on the browser (React is mounting the component, useState change values
        , etc.).
        □ It executes while the app is running on the browser
    
    ○ Where does tailwind enters? 

      ■ During the build, it reads our source code and searches for all the classes that appear as static texs, such as bg-red-500
      , text-lg, etc
      ■ It generates the corresponding CSS only for these classes

      ■ Example:
        ```ts
          <div className="bg-blue-500 text-white">Ciao</div>
        ```

        . Tailwind sees the strings bg-blue-500 and text-white
        . Generates their CSS on the final file
        . When the app runs, the browser applies this css

    ○ But what goes wrong with dynamic values such as bg-${randomColor}-500

      ■ Look at the code: 

        <div className={`bg-${randomColor}-200`}/>

      □ During the build tailwind only sees "bg-" + variable + "-200"

      □ He does not have how to know if this color is "red", "blue", "123456" or any other value — because this will only be
      known in runtime, this is, when the app is already running in the browser

        . As a result

          - Tailwind does not generate any tailwind class called bg-????-200
          - When the component tries applying bg-123456-200, this class does not exist
          - so, no style is applyed
    
    ○ Possible Solutions

      ■ 1. Using inline style (the simplest and most correct way for dynamic colors) 

        □ <div style={{ backgroundColor: randomColor}}></div>
      
      ■ 2. Using known conditional classes

        <div className={`
          ${color === "red" ? "bg-red-500" : ""}
          ${color === "blue" ? "bg-blue-500" : ""}
        `}></div>

        □ That way, tailwind does see bg-red-500 and bg-blue-500 at build time, and generates CSS for them.

    ○ Quick final summary:

      Stage	       Tailwind can process it?	   Example
      Build time 	 Yes, static known classes	"bg-red-500"
      Runtime      No, dynamic expressions	  `bg-${randomColor}-200`    

  ● How do the toString method work

    ○ In programming, numbers can be represented in different numerical base (or radix).
      The base determines how many unique digits are used to express numbers

      ■ Common bases:

        Base: 10 | Name: Decimal     | Digites used: 0 - 0           | Example: 255
        Base: 2  | Name: Binary      | Digites used: 0 - 1           | Example: 11111111
        Base: 8  | Name: Octal       | Digites used: 0 - 7           | Example: 377
        Base: 16 | Name: Hexadecimal | Digites used: 0 - 9 and A - F | Example: FF

    ○ So, in JS

      ■ const num = 255; would be

        num.toString(10); //  "255" -> decimal
        num.toString(2); //   "11111111" -> binary
        num.toString(10); //  "377" -> octal
        num.toString(10); //  "ff" -> hexadecimal

        Each of these is the same number 255, just written in different bases.
    
    ○ Why we use base 16 for colors?

      ■ CSS colors use hexadecimal (base 16) because it maps nicely to the 8-bit RGB color system:

        □ Each pair (RR, GG, BB) is a two digit hexadecimal value between 00 (0 in decimal) and ff (255 in decimal).

        □ So for example:
          . 0 in decimal, equals to 00 in hex meaning no color
          . 255 in decimal, equals to FF full intensity
        
    ○ Example

      const num = 2938122;
      console.log(num.toString(16)); // "2cd5ca"

      That's the hexadecimal representation of 2938122, by adding # in front — #2cd5ca — it becomes a valid CSS color.

  ● Classic behavior for when the initial state is 0 and the input is controlled by that state

    ○ What happen

      ■ We have a controlled input, such as
        ` const [n1, setN1] = useState<number>(0)
          <input type="number" value={n1} onChange={(e) => setN1(+e.target.value)}>

      ■ This means that

        □ The value shown in the input comes from the state (n1)
        □ Every time the user types something, React calls setN1
        □ The new value renders the input again
      
    ○ The problem

      ■ If we try erasing the value, such as the number 0, e.target.value becomes an empty string `""` and our code does
        ` setN1(+e.target.value) `
      ■ but +"" is equal to 0

      ■ As a result, React updates the state to 0 again
    
    ○ Possible solutions: 

      ■ Option 1 - allowing empty field (better UX)

        const [n1, setN1] = useState<string>("")
        <input value={n1} type="number" onChange={(e) => setN1(e.target.value)}>

        and on the sum

        function somaEstados() {
          const num1 = parseFloat(n1) || 0
          const num2 = parseFloat(n2) || 0
          return num1 + num2
        }
      
      ■ Option 2 - Continue with the number type, but treating thee number 0

        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value
          setN1(value === "" ? 0 : +value)
        }}






