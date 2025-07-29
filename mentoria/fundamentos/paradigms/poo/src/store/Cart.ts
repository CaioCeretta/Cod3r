import { Item } from "./Item";
import type { Product } from "./Product";

class Cart {
	items: Item[] = [];

	add(product: Product, quantity: number) {
		const exist = this.items.some((item) => {
			return item.product.id === product.id
		});

		if (exist) {
			this.items = this.items.map((item) =>
        item.product.id === product.id
				? item.merge(new Item(product, product.price, quantity))
        : item
			);
		} else {
			this.items.push(new Item(product, product.price, quantity));
		}
	}

	get total() {
		return this.items.reduce(
			(acc: number, item: Item) => acc + item.price * item.quantity,
			0,
		);
	}

	get formattedTotal() {
		return `R$ ${this.total.toFixed(2)}`;
	}

	getItems() {
		return [...this.items];
	}
}

const cart = new Cart();

export { cart };
