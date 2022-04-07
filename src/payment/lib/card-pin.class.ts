/**
 *
 */
export class CardPin {
  public get cvv(): number | undefined {
    return this.#cvv;
  }

  public get cvvBlocked(): boolean {
    return this.#cvvBlocked;
  }

  public get pin(): number | undefined {
    return this.#pin;
  }

  public get pinBlocked(): boolean {
    return this.#pinBlocked;
  }

  // Security.
  /**
   *
   */
  #cvv?: number;

  /**
   *
   */
  #cvvBlocked = false;

  /**
   *
   */
  #pin?: number;

  /**
   *
   */
  #pinBlocked = false;

  /**
   *
   * @returns
   * @angularpackage
   */
  public blockCVV(): this {
    this.#cvvBlocked = true;
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public blockPIN(): this {
    this.#pinBlocked = true;
    return this;
  }

  /**
   *
   * @param cvv
   * @returns
   * @angularpackage
   */
  public setCVV(cvv: number): this {
    this.#cvv = cvv;
    return this;
  }

  /**
   *
   * @param pin
   * @returns
   * @angularpackage
   */
  public setPIN(pin: number): this {
    this.#pin = pin;
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public unblockCVV(): this {
    this.#cvvBlocked = false;
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public unblockPIN(): this {
    this.#pinBlocked = false;
    return this;
  }
}
