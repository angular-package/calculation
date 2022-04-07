// Class.
import { CommonCard } from './common-card.class';
// Type.
import { Currencies } from 'dist/currency';
// Type.
import { NetworkPayment } from '../type/network-payment.type';
import { CardLimit } from './card-limit.class';
import { CardPin } from './card-pin.class';
import { CardStatus } from '../enum/card-status.enum';

export class CreditCard<
  First extends string,
  Second extends string,
  Third extends string,
  Fourth extends string,
  ValidMonth extends string,
  ValidYear extends string,
  Network extends string,
  Currency extends string
> extends CommonCard<
  First,
  Second,
  Third,
  Fourth,
  ValidMonth,
  ValidYear,
  Network,
  Currency
> {
  /**
   *
   */
  public get limit(): CardLimit<Currency> {
    return this.#limit;
  }

  /**
   *
   */
  #limit: CardLimit<Currency>;

  /**
   *
   */
  #pin = new CardPin();

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
    super(networkPayment, cardNumber, validThru, ...currencies);
    this.#limit = new CardLimit(...currencies);
  }

  public setCardLimit(
    callback: (cardLimit: CardLimit<Currency>) => void
  ): this {
    typeof callback === 'function' && callback(this.#limit);
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public blockCVV(): this {
    this.#pin.blockCVV() && this.setStatus(CardStatus.CVVBlocked);
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public blockPIN(): this {
    this.#pin.blockPIN() && this.setStatus(CardStatus.PINBlocked);
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public unblockCVV(): this {
    this.#pin.unblockCVV() && super.setStatus(CardStatus.Active);
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public unblockPIN(): this {
    this.#pin.unblockPIN() && this.setStatus(CardStatus.Active);
    return this;
  }
}

// const cc = new CreditCard(
//   'Discover',
//   [`5273`, `4670`, `0305`, `2420`],
//   ['03', '26'],
//   'ADP',
//   'ADP'
// );

// console.log(cc);
