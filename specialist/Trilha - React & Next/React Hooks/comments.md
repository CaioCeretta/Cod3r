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

        
        
          






        




          



      
          











    




    



  







