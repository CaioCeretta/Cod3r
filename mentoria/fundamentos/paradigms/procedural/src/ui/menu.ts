import products from "../data/products";
import { addItem, getItems, getTotal } from "../store/Cart";
import { renderMenu, success, waitForEnter } from "./terminal";

export async function menu() {
  const answer = await renderMenu("My Store", ["Add", "View Cart", "Exit"]);

  if (answer.selectedIndex === 0) {
    const items = products.map(
      (product) => `${product.name} - $ ${product.price}`
    );

    const { selectedIndex } = await renderMenu("Registered Products", items);

    const selectedProduct = products[selectedIndex];

    addItem(selectedProduct, 1);

    success("\nProduct added to cart!\n");

    await waitForEnter();
  } else if (answer.selectedIndex === 1) {
    const items = getItems().forEach((item) => {
      success(
        `${item.product.name} - $${item.price.toFixed(2)} x${item.quantity}\n`
      );
    });
    success(`Total amount: $${getTotal()}`);
    await waitForEnter();
  } else if (answer.selectedIndex === 2) {
    process.exit(0);
  }

  await menu();
}
