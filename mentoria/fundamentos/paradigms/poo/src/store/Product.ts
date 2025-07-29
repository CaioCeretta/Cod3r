export class Product {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number) 
    {}

  get formatted(): string {
    return `${this.name} - $${this.price.toFixed(2)}`
  }
};
