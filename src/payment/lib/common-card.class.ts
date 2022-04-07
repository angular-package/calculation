// Type.
import { NetworkPayment } from '../type/network-payment.type';
import { CardNumber } from '../type/card-number.type';
import { ValidThru } from '../type/valid-thru.type';
// Currency.
import { Currencies, CurrencyValue } from 'dist/currency';
// Enum.
import { CardStatus } from '../enum/card-status.enum';
/**
 *
 */
export abstract class CommonCard<
  First extends string,
  Second extends string,
  Third extends string,
  Fourth extends string,
  ValidMonth extends string,
  ValidYear extends string,
  Network extends string,
  Currency extends string
> extends String {
  /**
   *
   */
  public get card(): {
    networkPayment: NetworkPayment<Network>;
    number: CardNumber<First, Second, Third, Fourth>;
    validThru: ValidThru<ValidMonth, ValidYear>;
  } {
    return {
      networkPayment: this.#networkPayment,
      number: this.number,
      validThru: this.validThru,
    };
  }

  public get cardStatus(): CardStatus {
    return this.#status;
  }

  public get first(): First {
    return this.#first;
  }

  public get fourth(): Fourth {
    return this.#fourth;
  }

  public get number(): CardNumber<First, Second, Third, Fourth> {
    return `${this.#first} ${this.#second} ${this.#third} ${this.#fourth}`;
  }

  public get networkPayment(): NetworkPayment<Network> {
    return this.#networkPayment;
  }

  public get second(): Second {
    return this.#second;
  }

  public get terminated(): boolean {
    return this.#terminated;
  }

  public get third(): Third {
    return this.#third;
  }

  /**
   *
   */
  public get validThru(): ValidThru<ValidMonth, ValidYear> {
    return `${this.#validMonth}/${this.#validYear}`;
  }

  // Card number.
  #first: First;
  #second: Second;
  #fourth: Fourth;
  #third: Third;

  // Valid thru.
  #validMonth: ValidMonth;
  #validYear: ValidYear;

  // Network.
  #networkPayment: NetworkPayment<Network>;

  // Status.
  #status: CardStatus = CardStatus.Active;
  #frozen = false;

  // Terminated.
  #terminated = false;

  // Currency.
  #currency: Set<Currencies<Currency>> = new Set();

  /**
   *
   * @param networkPayment
   * @param cardNumber
   * @param validThru
   * @param currencies
   * @angularpackage
   */
  constructor(
    networkPayment: NetworkPayment<Network>,
    cardNumber: [First, Second, Third, Fourth],
    validThru: [ValidMonth, ValidYear],
    ...currencies: Currencies<Currency>[]
  ) {
    super(
      `${cardNumber[0]} ${cardNumber[1]} ${cardNumber[2]} ${cardNumber[3]}`
    );
    // Card number.
    this.#first = cardNumber[0];
    this.#second = cardNumber[1];
    this.#third = cardNumber[2];
    this.#fourth = cardNumber[3];
    // Valid thru.
    this.#validMonth = validThru[0];
    this.#validYear = validThru[1];
    // Network payment.
    this.#networkPayment = networkPayment;
    // Currencies.
    currencies.forEach((currency) => this.#currency.add(currency));
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public freeze(): this {
    (this.#frozen = true) && this.setStatus(CardStatus.Frozen);
    return this;
  }

  /**
   *
   * @param status
   * @returns
   * @angularpackage
   */
  public setStatus(status: CardStatus): this {
    this.#status = status;
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public terminate(): this {
    (this.#terminated = true) && this.setStatus(CardStatus.Terminated);
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public toggleFreeze(): this {
    this.#frozen = this.#frozen === false ? true : false;
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public unfreeze(): this {
    (this.#frozen = false) && this.setStatus(CardStatus.Active);
    return this;
  }
}
