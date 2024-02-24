/*
Strategy Pattern
- In essence, having different strategies to do something and able to choose which strategies to use
- Changing the strategy during runtime allows for dynamically adapting its behaviour (without being tightly coupled to a particular strategy) via setTaxStrategy method as demonstrated below 
*/

interface TaxStrategy {
  calculateTax(amount: number): number;
}

class Order {
  private taxStrategy: TaxStrategy;

  constructor(taxStrategy: TaxStrategy) {
    this.taxStrategy = taxStrategy;
  }

  public setTaxStrategy(taxStrategy: TaxStrategy): void {
    this.taxStrategy = taxStrategy;
  }

  public calculateTotalWithTax(amount: number): number {
    return amount + this.taxStrategy.calculateTax(amount);
  }
}

class StrategyA implements TaxStrategy {
  private TAX_RATE = 0.2;

  calculateTax(amount: number): number {
    return amount * this.TAX_RATE;
  }
}

class StrategyB implements TaxStrategy {
  private TAX_RATE = 0.4;

  calculateTax(amount: number): number {
    return amount * this.TAX_RATE;
  }
}

const orderWithStrategyA = new Order(new StrategyA());
const totalOrderWithStrategyA = orderWithStrategyA.calculateTotalWithTax(1000);

console.log(
  `(StrategyA) Total order with tax inclusive: ${totalOrderWithStrategyA}`
);

// Altering strategy
orderWithStrategyA.setTaxStrategy(new StrategyB());
const totalMarsOrderWithTaxB = orderWithStrategyA.calculateTotalWithTax(1000);

console.log(
  `(StrategyB) Total order with tax inclusive: ${totalMarsOrderWithTaxB}`
);
