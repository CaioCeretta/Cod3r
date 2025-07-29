import type { Product } from "./Product";

export class Item {
  constructor(
    readonly product: Product,
    readonly price: number,
    readonly quantity: number
  ) {}

  get formatted(): string {
     return `${this.product.formatted} - [x${this.quantity}]`
  }

merge(item: Item): Item {
  if (this.product.id !== item.product.id) {
    return this;
  }

  return new Item(this.product, this.price, this.quantity + item.quantity);
}
};
