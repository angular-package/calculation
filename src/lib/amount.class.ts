import { CurrencyValue, ValueInCurrency } from 'dist/currency';

export class Amount<
  Value extends number,
  Currency extends string
> extends CurrencyValue<Value, Currency> {
  // public get valueInCurrency(): ValueInCurrency<Value, Currency> {
  //   return this.format(this.#value as any, this.currency);
  // }

  /**
   *
   */
  // public get decreasedAmount(): Set<number> {
  //   return this.#decreasedAmount;
  // }

  /**
   *
   */
  // public get increasedAmount(): Set<number> {
  //   return this.#increasedAmount;
  // }

  #value: Value;
  // #increasedAmount: Set<number> = new Set();
  // #decreasedAmount: Set<number> = new Set();

  constructor(value: Value, currency: Currency) {
    super(value, currency);
    // Set amount.
    this.#value = value;

  }

  // public decreaseAmount(value: number): this {
  //   this.#decreasedAmount.add(value);
  //   return this;
  // }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  // public increaseAmount(value: number): this {
  //   this.#increasedAmount.add(value);
  //   return this;
  // }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  // public setAmount(value: number): this {
  //   value > this.amount
  //     ? this.increaseAmount(value - this.amount)
  //     : value < this.amount && this.decreaseAmount(this.amount - value);
  //   return this;
  // }
}
