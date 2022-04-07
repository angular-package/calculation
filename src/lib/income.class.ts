// Class.
import { CurrencyValue, CryptoCurrencies, FiatCurrencies } from 'dist/currency';
/**
 *
 */
export class Income<
  IncomeValue extends number,
  Curriencies extends CryptoCurrencies | FiatCurrencies
> extends CurrencyValue<
  IncomeValue,
  Curriencies,
  CryptoCurrencies | FiatCurrencies
> {}
