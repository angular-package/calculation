// Currency.
import { AllCurrencies, ValueInCurrency, CurrencyValue } from 'dist/currency';
// Class.
import { Calculation } from './calculation.class';
import { CalculationValues } from '../type/calculation-values.type';
/**
 *
 */
export class Calculations<Name extends string, MainCurrency extends string> {
  public get amount(): number {
    let amount = 0;
    this.#calculations.forEach((calculation) => (amount += calculation.amount));
    return amount;
  }

  public get amountInCurrency(): ValueInCurrency<number, MainCurrency> {
    return new CurrencyValue(this.amount, this.#mainCurrency).valueInCurrency;
  }

  public get amountLeft(): number {
    let amountLeft = 0;
    this.#calculations.forEach(
      (calculation) => (amountLeft += calculation.remainingAmount)
    );
    return amountLeft;
  }

  public get amountLeftInCurrency(): ValueInCurrency<number, MainCurrency> {
    return new CurrencyValue(this.amountLeft, this.#mainCurrency).valueInCurrency;
  }

  public get calculations(): Map<
    Name,
    Calculation<AllCurrencies<MainCurrency>>
  > {
    return this.#calculations;
  }

  public get expensesAmount(): number {
    let expensesAmount = 0;
    this.#calculations.forEach(
      (calculation) => (expensesAmount += calculation.expensesAmount)
    );
    return expensesAmount;
  }

  public get expensesAmountInCurrency(): ValueInCurrency<number, MainCurrency> {
    return new CurrencyValue(this.expensesAmount, this.#mainCurrency).valueInCurrency;
  }

  public get mainCurrency(): MainCurrency {
    return this.#mainCurrency;
  }

  /**
   *
   */
  #calculations: Map<Name, Calculation<AllCurrencies<MainCurrency>>> =
    new Map();

  /**
   *
   */
  #mainCurrency: MainCurrency;

  /**
   *
   * @param mainCurrency
   * @param names
   * @angularpackage
   */
  constructor(mainCurrency: AllCurrencies<MainCurrency>, names?: Name[]) {
    this.#mainCurrency = mainCurrency as MainCurrency;
  }

  /**
   *
   * @param name
   * @param values
   * @param additionalCurrencies
   * @returns
   * @angularpackage
   */
  public setCalculation<CalculationName extends Name>(
    name: CalculationName,
    values: CalculationValues,
    ...additionalCurrencies: AllCurrencies<MainCurrency>[]
  ): this {
    this.#calculations.set(
      name,
      new Calculation(values, this.#mainCurrency, ...additionalCurrencies)
    );
    return this;
  }

  /**
   *
   * @param calculationName
   * @param name
   * @param value
   * @param currency
   * @returns
   * @angularpackage
   */
  public addExpense<CalculationName extends Name>(
    calculationName: CalculationName,
    name: string,
    value: number,
    quantity: number,
    currency: AllCurrencies<MainCurrency> = this.#mainCurrency as any
  ): this {
    // this.#calculations
    //   .get(calculationName)
    //   ?.addExpense(name, value, quantity, currency);
    return this;
  }

  /**
   *
   * @param name
   * @param calculation
   * @returns
   * @angularpackage
   */
  public assignCalculation(
    name: Name,
    calculation: Calculation<MainCurrency>
  ): this {
    this.#calculations.set(name, calculation);
    return this;
  }
}
