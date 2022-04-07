// Function.
import { parseFloat } from './parse-float.function';
// Type.
import { CurrencyValue, AllCurrencies, ValueInCurrency } from 'dist/currency';
/**
 *
 */
export class Expense<
  ExpenseValue extends number = number,
  Currency extends string = string
> extends CurrencyValue<ExpenseValue, Currency, AllCurrencies<Currency>> {
  public get deleted(): boolean {
    return this.#deleted;
  }

  public get quantity(): number {
    return this.#quantity;
  }

  public get totalValue(): number {
    return this.#quantity * this.valueOf();
  }

  public get totalValueInCurrency(): ValueInCurrency<number, Currency> {
    return new CurrencyValue(this.totalValue, this.currency).valueInCurrency;
  }

  public get unitMeasure(): string {
    return this.#unitMeasure;
  }

  #deleted = false;
  #quantity: number;
  #unitMeasure = `pcs`;

  constructor(
    value: ExpenseValue,
    currency: Currency,
    quantity = 1,
    unitMeasure?: string
  ) {
    super(value, currency);
    // Set quantity.
    this.#quantity = quantity;
    // Set unit of measure.
    typeof unitMeasure === 'string' && (this.#unitMeasure = unitMeasure);
  }

  public decreaseQuantity(quantity = 1): this {
    this.#quantity - quantity >= 0 &&
      (this.#quantity = this.#quantity - quantity);
    return this;
  }

  public delete(): this {
    this.#deleted = true;
    return this;
  }

  public increaseQuantity(quantity = 1): this {
    this.#quantity + quantity >= 0 &&
      (this.#quantity = this.#quantity + quantity);
    return this;
  }

  public restore(): this {
    this.#deleted = false;
    return this;
  }

  public setQuantity(value: number): this {
    this.#quantity = value;
    return this;
  }
}
