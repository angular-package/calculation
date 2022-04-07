// Currency.
import {
  AllCurrencies,
  Currencies,
  ValueInCurrency,
  CurrencyValue,
} from 'dist/currency';
// Class.
import { Expense } from './expense.class';
import { Income } from './income.class';
// Function.
import { parseFloat } from '../lib/parse-float.function';
// Type.
import { ValueInPercent } from '../type/value-in-percent.type';

/**
 *
 */
export class Expenses<
  MainCurrency extends string,
  AdditionalCurrency extends string = MainCurrency
> {
  /**
   *
   */
  public get amount(): number {
    let amount = 0;
    this.#expenses.forEach((expense) => (amount += expense.totalValue));
    return amount;
  }

  /**
   *
   */
  public get amountInCurrency(): ValueInCurrency<number, MainCurrency> {
    return new CurrencyValue(this.amount, this.#mainCurrency).valueInCurrency;
  }

  /**
   *
   */
  public get currencies(): Currencies<AdditionalCurrency | MainCurrency> {
    return this.#currencies;
  }

  /**
   *
   */
  public get expenses(): Map<
    string,
    Expense<number, MainCurrency | AdditionalCurrency>
  > {
    return this.#expenses;
  }

  /**
   *
   */
  public get items(): number {
    let items = 0;
    Array.from(this.#expenses.values()).every(
      (expense) => (items += expense.quantity)
    );
    return items;
  }

  /**
   *
   */
  public get mainCurrency(): MainCurrency {
    return this.#mainCurrency;
  }

  /**
   *
   */
  public get quantity(): number {
    return this.#expenses.size;
  }

  /**
   *
   */
  #currencies: Currencies<AdditionalCurrency | MainCurrency> = new Currencies();

  /**
   *
   */
  #expenses: Map<string, Expense<number, MainCurrency | AdditionalCurrency>> =
    new Map();

  /**
   *
   */
  #mainCurrency: MainCurrency;

  /**
   *
   * @param amount
   * @param mainCurrency
   * @param currencies
   * @angularpackage
   */
  constructor(
    mainCurrency: AllCurrencies<MainCurrency>,
    ...currencies: AllCurrencies<AdditionalCurrency>[]
  ) {
    // Set main currency.
    this.#mainCurrency = mainCurrency as MainCurrency;
    // Set additional currencies.
    this.#currencies.add(...currencies);
  }

  /**
   *
   * @param name
   * @param value
   * @param quantity
   * @param currency
   * @returns
   * @angularpackage
   */
  public addExpense<ExpenseCurrency extends AdditionalCurrency | MainCurrency>(
    name: string,
    value: number,
    quantity: number = 1,
    currency: ExpenseCurrency = this.#mainCurrency as ExpenseCurrency
  ): this {
    this.#expenses.has(name) === false &&
      (this.#currencies.has(currency) || currency === this.#mainCurrency) &&
      quantity > 0 &&
      this.#expenses.set(name, new Expense(value, currency, quantity));
    return this;
  }

  public delete(name: string): this {
    this.#expenses.get(name)?.delete();
    return this;
  }

  public get(
    name: string
  ): Expense<number, MainCurrency | AdditionalCurrency> | undefined {
    return this.#expenses.get(name);
  }

  public has(name: string): boolean {
    return this.#expenses.has(name);
  }

  public restore(name: string): this {
    this.#expenses.get(name)?.restore();
    return this;
  }
}
