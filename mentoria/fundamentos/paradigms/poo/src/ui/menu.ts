import products from "../data/products";
import { cart } from "../store/Cart";
import Terminal from "./terminal";

export default class Menu {

  async render() {
    const answer = await Terminal.renderMenu("My Store", ["Add", "View Cart", "Exit"]);

    if (answer.selectedIndex === 0) {
      const items = products.map(
        (product) => `${product.name} - $ ${product.price}`
      );

      const { selectedIndex } = await Terminal.renderMenu("Registered Products", items);

      const selectedProduct = products[selectedIndex];

      cart.add(selectedProduct, 1);

      Terminal.success("\nProduct added to cart!\n");

      await Terminal.waitForEnter();
    } else if (answer.selectedIndex === 1) {
        cart.getItems().forEach((item) => {
          Terminal.success(
            `\n${item.formatted}`
          );
        });
      Terminal.success(`\nTotal amount: ${cart.formattedTotal}`);
      await Terminal.waitForEnter();
    } else if (answer.selectedIndex === 2) {
      process.exit(0);
    }

    await this.render()

  }


}
