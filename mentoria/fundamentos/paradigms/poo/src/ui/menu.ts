import products from "../data/products";
import { cart } from "../store/Cart";
import { renderMenu, success, waitForEnter } from "./terminal";

export async function menu() {
  const answer = await renderMenu("My Store", ["Add", "View Cart", "Exit"]);

  if (answer.selectedIndex === 0) {
    const items = products.map(
      (product) => `${product.name} - $ ${product.price}`
    );

    const { selectedIndex } = await renderMenu("Registered Products", items);

    const selectedProduct = products[selectedIndex];

    cart.add(selectedProduct, 1);

    success("\nProduct added to cart!\n");

    await waitForEnter();
  } else if (answer.selectedIndex === 1) {
    const items = cart.getItems().forEach((item) => {
      success(
        `${item.product.name} - $${item.price.toFixed(2)} x${item.quantity}\n`
      );
    });
    success(`Total amount: $${cart.total}`);
    await waitForEnter();
  } else if (answer.selectedIndex === 2) {
    process.exit(0);
  }

  await menu();
}
