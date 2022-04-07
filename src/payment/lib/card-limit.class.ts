import { CurrencyValue, Currencies } from 'dist/currency';
/**
 *
 */
export class CardLimit<Currency extends string> {
  // Limits
  #cardLimit: Map<Currency, CurrencyValue<number, Currency>> = new Map();
  #contactlessLimit: Map<Currency, CurrencyValue<number, Currency>> = new Map();
  #spendingLimit: Map<Currency, CurrencyValue<number, Currency>> = new Map();
  // Currency.
  #currency: Set<Currencies<Currency>> = new Set();

  /**
   *
   * @param currencies
   * @angularpackage
   */
  constructor(...currencies: Currencies<Currency>[]) {
    currencies.forEach((currency) => this.#currency.add(currency));
  }

  /**
   *
   * @param limit
   * @param currency
   * @returns
   * @angularpackage
   */
  public setCardLimit(limit: number, currency: Currency): this {
    this.#cardLimit.set(currency, new CurrencyValue(limit, currency));
    return this;
  }

  /**
   *
   * @param limit
   * @param currency
   * @returns
   * @angularpackage
   */
  public setContactlessLimit(limit: number, currency: Currency): this {
    this.#contactlessLimit.set(currency, new CurrencyValue(limit, currency));
    return this;
  }

  /**
   *
   * @param limit
   * @param currency
   * @returns
   * @angularpackage
   */
  public setSpendingLimit(limit: number, currency: Currency): this {
    this.#spendingLimit.set(currency, new CurrencyValue(limit, currency));
    return this;
  }

  /**
   *
   * @param currency
   * @returns
   * @angularpackage
   */
  public getCardLimit<PickCurrency extends Currency>(
    currency: Currency
  ): CurrencyValue<number, PickCurrency> | undefined {
    return this.#cardLimit.get(currency) as any;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public getContactlessLimit<PickCurrency extends Currency>(
    currency: Currency
  ): CurrencyValue<number, PickCurrency> | undefined {
    return this.#contactlessLimit.get(currency) as any;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public getSpendingLimit<PickCurrency extends Currency>(
    currency: Currency
  ): CurrencyValue<number, PickCurrency> | undefined {
    return this.#spendingLimit.get(currency) as any;
  }
}
