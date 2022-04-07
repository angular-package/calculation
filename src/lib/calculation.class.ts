// Currency.
import {
  AllCurrencies,
  Currencies,
  ValueInCurrency,
  CurrencyValue,
} from 'dist/currency';
// Class.
import { Expense } from './expense.class';
import { Expenses } from './expenses.class';
import { Income } from './income.class';
// Function.
import { parseFloat } from './parse-float.function';
// Type.
import { ValueInPercent } from '../type/value-in-percent.type';
import { Amount } from './amount.class';
import { Calculator } from './calculator.class';
import { CalculationValues } from '../type/calculation-values.type';
/**
 *
 */
export class Calculation<
  MainCurrency extends string,
  AdditionalCurrency extends string = MainCurrency
> {
  /**
   *
   */
  public get amount(): number {
    return this.#amount.valueOf();
  }

  /**
   *
   */
  public get formattedAmount(): string {
    return this.#amount.value;
  }

  /**
   *
   */
  public get amountInCurrency(): ValueInCurrency<number, MainCurrency> {
    return this.#amount.valueInCurrency;
  }

  /**
   *
   */
  public get remainingAmount(): number {
    return this.#remainingAmount.valueOf();
  }


  public get formattedRemainingAmount(): string {
    return this.#remainingAmount.value;
  }

  /**
   *
   */
  public get remainingAmountInCurrency(): ValueInCurrency<
    number,
    MainCurrency
  > {
    return this.#remainingAmount.valueInCurrency;
  }

  /**
   *
   */
  public get currencies(): Currencies<AdditionalCurrency | MainCurrency> {
    return this.#expenses.currencies;
  }

  /**
   *
   */
  public get expenses(): Expenses<MainCurrency, AdditionalCurrency> {
    return this.#expenses;
  }

  /**
   *
   */
  public get expensesAmount(): number {
    return this.#expensesAmount.valueOf();
  }

  public get formattedExpensesAmount(): string {
    return this.#expensesAmount.value;
  }

  /**
   *
   */
  public get expensesAmountInCurrency(): ValueInCurrency<number, MainCurrency> {
    return this.#expensesAmount.valueInCurrency;
  }

  /**
   *
   */
  // public get totalExpensesAmount(): number {
  //   return this.#expensesAmount.valueOf() + this.#expenses.amount;
  // }

  /**
   *
   */
  public get mainCurrency(): MainCurrency {
    return this.#expenses.mainCurrency;
  }

  /**
   *
   */
  public get margin(): number {
    return this.#margin;
  }

  /**
   *
   */
  public get marginInPercent(): ValueInPercent<number> {
    return `${this.margin.toFixed(2) as any}%`;
  }

  /**
   *
   */
  public get markup(): number {
    return this.#markup;
  }

  /**
   *
   */
  public get markupInPercent(): ValueInPercent<number> {
    return `${this.markup.toFixed(2) as any}%`;
  }


  /**
   *
   */
  #amount!: Amount<number, MainCurrency>;

  /**
   *
   */
  #expenses: Expenses<MainCurrency, AdditionalCurrency>;

  /**
   *
   */
  #expensesAmount!: Amount<number, MainCurrency>;

  /**
   *
   */
  // #incomesAmount = 0;

  // #amountLocked = false;

  /**
   *
   */
  #margin = 0;

  /**
   *
   */
  #markup = 0;

  /**
   *
   */
  #remainingAmount: Amount<number, MainCurrency> = new Amount(0, 'GBP' as any);

  /**
   *
   * @param values
   * @param mainCurrency
   * @param currencies
   * @angularpackage
   */
  constructor(
    values: CalculationValues,
    mainCurrency: AllCurrencies<MainCurrency>,
    ...currencies: AllCurrencies<AdditionalCurrency>[]
  ) {
    // Set expenses.
    this.#expenses = new Expenses(mainCurrency, ...currencies);
    //
    this.initialValues(values);
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
  public addExpense(
    name: string,
    value: number,
    quantity = 1,
    currency: AdditionalCurrency | MainCurrency = this.#expenses.mainCurrency
  ): this {
    this.#expenses.addExpense(name, value, quantity, currency);
    // this.#expensesAmount -= this.#expenses.get(name)!.totalValue;
    return this;
  }

  public clear(): this {
    this.#amount = this.defineAmount(0);
    this.#expensesAmount = this.defineAmount(0);
    this.#margin = 0;
    this.#markup = 0;
    this.#remainingAmount = this.defineAmount(0);
    return this;
  }

  /**
   *
   * @param name
   * @returns
   * @angularpackage
   */
  public deleteExpense(name: string): this {
    this.#expenses.get(name)?.delete();
    // this.#expensesAmount += this.#expenses.get(name)!.totalValue;
    return this;
  }

  /**
   *
   * @param name
   * @returns
   * @angularpackage
   */
  public hasExpense(name: string): boolean {
    return this.#expenses.has(name);
  }

  // public lockAmount(): this {
  //   this.#amountLocked = true;
  //   return this;
  // }

  // public unlockAmount(): this {
  //   this.#amountLocked = false;
  //   return this;
  // }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public increaseExpensesAmount(value: number): this {
    // this.#expensesAmount += value;
    return this;
  }

  /**
   *
   * @param name
   * @returns
   * @angularpackage
   */
  public restoreExpense(name: string): this {
    this.#expenses.get(name)?.restore();
    return this;
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public setAmount(value: number): this {
    this.#amount = this.defineAmount(value);
    return this;
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public setExpensesAmount(value: number): this {
    this.#expensesAmount = this.defineAmount(value);
    return this;
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public setRemainingAmount(value: number, increaseAmount = true): this {
    this.#remainingAmount = this.defineAmount(value);
    return this;
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public setMargin(value: number): this {
    this.#margin = value;
    return this;
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public setMarkup(value: number): this {
    this.#markup = value;
    return this;
  }

  //#region private instance methods.
  private defineAmount(value: number): Amount<number, MainCurrency> {
    return new Amount(value, this.mainCurrency);
  }

  private initialValues(values: CalculationValues): this {
    if (typeof values === 'object') {
      typeof values.amount === 'number' &&
        (this.#amount = this.defineAmount(values.amount));
      typeof values.expensesAmount === 'number' &&
        (this.#expensesAmount = this.defineAmount(values.expensesAmount));
      typeof values.remainingAmount === 'number' &&
        (this.#remainingAmount = this.defineAmount(values.remainingAmount));
      typeof values.margin === 'number' && (this.#margin = values.margin);
      typeof values.markup === 'number' && (this.#markup = values.markup);
    }
    return this;
  }
  //#endregion private instance methods.
}
