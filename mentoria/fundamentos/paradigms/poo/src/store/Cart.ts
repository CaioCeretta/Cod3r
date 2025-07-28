import type { Item } from "./Item";
import type { Product } from "./Product";

class Cart {

  items: Item[] = [];


  add(product: Product, quantity: number) {
    this.items.push({
      product,
      quantity,
      price: product.price,
    });
  }
  
  
  get total() {
    return this.items.reduce(
      (acc: number, item: Item) => acc + item.price * item.quantity,
      0
    );
  }
  
  getItems() {
    return [...this.items];
  }
}

const cart = new Cart()

export { cart }