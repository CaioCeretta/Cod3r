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

    




    



  







