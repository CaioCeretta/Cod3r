class Data {
  constructor(
    public dia: number
  ) {}

  formatted(): string {
    return `${this.dia}/01/2030`
  }
}

const birth = new Data(3);

const marriage = new Data(29)

console.log(birth.dia, marriage.formatted())