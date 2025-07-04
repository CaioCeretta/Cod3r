import type { Item } from "./Item";
import type { Product } from "./Product";

const items: Item[] = [];

export function addItem(product: Product, quantity: number) {
  items.push({
    product,
    quantity,
    price: product.price,
  });
}

export function getTotal() {
  return items.reduce(
    (acc: number, item: Item) => acc + item.price * item.quantity,
    0
  );
}
