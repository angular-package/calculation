// Class.
import { Expense } from './expense.class';
import { Income } from './income.class';
import {
  // Class.
  CurrencyValue,
  // Type.
  CryptoCurrencies,
  FiatCurrencies
} from 'dist/currency';
/**
 *
 */
export class Profit<
  IncomeValue extends number,
  ExpenseValue extends number,
  Currency extends CryptoCurrencies | FiatCurrencies
> extends CurrencyValue<number, Currency, CryptoCurrencies | FiatCurrencies> {
  constructor(
    income: IncomeValue | Income<IncomeValue, Currency>,
    expense: ExpenseValue | Expense<ExpenseValue, Currency>,
    currency: Currency
  ) {
    super(income.valueOf() - expense.valueOf(), currency);
  }
}
