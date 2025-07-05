## In this folder, we are going to create an e-commerce using Structured / Procedural programming

● E-commerce Development Comments

  ○ Create product, item and cart type, and created a function to add new item and calculate the total value

  ○ We are making use of a library called Terminal Kit
    ■ Terminal kit library is a node.js library that allows developers to create interactive command-line interfaces (CLIs).
    It provides features like colored output, tables, progress bars, input fields, full-screen apps, and mouse support — all
    within the terminal

    ■ Basic Concepts

      1. echo on terminal.inputField controls whether the user's input is displayed(echoed) on the terminal as they type
        . echo: true (default): characters typed are shown on screen
        . echo: false: nothing appears on the screen when the user types — useful for password inputs or hidden entries
      
      2. promise in terminal kit functions often use a callback-based API , but they also return an object with a .promise
      property for promise-based usage (like async  await)
  
      So this: 

      ```ts
        await terminal.inputField({echo: false}).promise
        // Is just the promise-based way to wait for the input result, we could alternatively do:

        terminal.inputField({echo: false}, (error, input) => {
          // handle input here
        })

        // But using .promise makes it easier to write clean, async code
      ```

      therefore, .promise lets you use await instead of a callback

    ■ Add product to cart

      1. renderMenu function
        - Receives a title (ex. Registered Products) and a list of options
        - Shows the title in terminal, and shows the options like an interactive menu
        - Returns a Promise that resolves when the user chooses an option. The result is an object with the selected
          option index

      2. Usage of the function
        - Verifies if the index is 1 or 0 to determine if the terminal should close
        - When the option is 0, it means that the menu of the 'Registered Products' was selected
          - Creates a string list with the formatted products names (e.g. Pencil - R$5.00)
        - const { selectedIndex } = await renderMenu, passes the title and the products list, waits for the user to select
        an item and assigns to selectedIndex the index of the option selected by the user.


      