export class CardSecurity {
  public get atmWithdrawals(): boolean {
    return this.#atmWithdrawals;
  }

  public get contactlessPayments(): boolean {
    return this.#contactlessPayments;
  }

  public get locationBaseSecurity(): boolean {
    return this.#locationBaseSecurity;
  }

  public get onlineTransactions(): boolean {
    return this.#onlineTransactions;
  }

  public get swipePayments(): boolean {
    return this.#swipePayments;
  }

  #atmWithdrawals = false;
  #contactlessPayments = false;
  #locationBaseSecurity = false;
  #onlineTransactions = false;
  #swipePayments = false;

  // Security.
  /**
   *
   */
  #cvv?: number;

  /**
   *
   */
  #pin?: number;

  /**
   *
   */
  #cvvBlocked = false;

  /**
   *
   */
  #pinBlocked = false;


  public activateAtmWithdrawals(): this {
    return this;
  }

  public activateContactlessPayments(): this {
    return this;
  }

  public activatelocationBaseSecurity(): this {
    return this;
  }

  public activateOnlineTransactions(): this {
    this.#onlineTransactions = true;
    return this;
  }

  public activateSwipePayments(): this {
    return this;
  }

  public deactivateAtmWithdrawals(): this {
    this.#atmWithdrawals = false;
    return this;
  }

  public deactivateContactlessPayments(): this {
    this.#contactlessPayments = false;
    return this;
  }

  public deactivatelocationBaseSecurity(): this {
    this.#locationBaseSecurity = false;
    return this;
  }

  public deactivateOnlineTransactions(): this {
    this.#onlineTransactions = false;
    return this;
  }

  public deactivateSwipePayments(): this {
    this.#swipePayments = false;
    return this;
  }
}
