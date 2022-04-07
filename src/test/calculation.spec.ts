import { Calculation } from '../lib/calculation.class';
import { CurrencyValue } from 'dist/currency';
import { Amount } from '../lib/amount.class';

typeof Calculation;

typeof Amount;

const amount = 100299.68;
const expensesAmount = 73299.36;
const remainingAmount = 27000.32;
const margin = 26.919647201267242;
const markup = 36.835683149211675;

const pass = { amount, margin };

const c = new Calculation({
  // amount,
  // expensesAmount,
  // remainingAmount,
  // margin: 25,
  // markup
}, 'GBP');

c
  .setAmount(10000)
  .setExpensesAmount(3500)
  // .setRemainingAmount(remainingAmount)
  // .lockAmount()
  // .setRemainingAmount(37000.32)
  ;

console.log(`expensesAmount: `, c.expensesAmount);
console.log(`margin: `, c.margin);
console.log(`markup: `, c.markup);
console.log(`amount: `, c.amount);
console.log(`remainingAmount: `, c.remainingAmount);

// --
// c.setRemainingAmount(remainingAmount).setExpensesAmount(expensesAmount);
// c.setExpensesAmount(expensesAmount).setRemainingAmount(remainingAmount);
// --


// --
// c.setMarkup(markup).setAmount(amount);
// c.setAmount(amount).setMarkup(markup);
// --

// --
// c.setMarkup(markup).setExpensesAmount(expensesAmount);
// c.setExpensesAmount(expensesAmount).setMarkup(markup);
// --

// --
// c.setMarkup(markup).setRemainingAmount(remainingAmount);
// c.setRemainingAmount(remainingAmount).setMarkup(markup);
// --

// c.setAmount(120000);

// --
// c.setRemainingAmount(remainingAmount).setMargin(margin);
// c.setMargin(margin).setRemainingAmount(remainingAmount);
// --

// --
// c.setMargin(margin).setExpensesAmount(expensesAmount);
// c.setExpensesAmount(expensesAmount).setMargin(margin);
// --

// --
// c.setAmount(amount).setMargin(margin);
// c.setMargin(margin).setAmount(amount);
// --

// --
// c.setAmount(amount).setExpensesAmount(expensesAmount);
// c.setExpensesAmount(expensesAmount).setAmount(amount);
// --

// --
// c.setAmount(amount).setRemainingAmount(remainingAmount);
// c.setRemainingAmount(remainingAmount).setAmount(amount);
// --

// c.setExpensesAmount(expensesAmount).setMarkup();


// const calculate = () => {
//   margin = (remainingAmount / amount) * 100;
//   markup = (remainingAmount / expenses) * 100;

//   console.log(`expenses:`, expenses);
//   console.log(`margin:`, margin);
//   console.log(`markup:`, markup);
//   console.log(`amount:`, amount);
//   console.log(`remainingAmount:`, remainingAmount);
// }
/*
  Expenses
*/
// if (expenses > 0 && amount > 0) {
//   remainingAmount = amount - expenses;
// }


// if (expenses > 0 && margin > 0) {
//   amount = expenses / (1 - margin / 100);
//   remainingAmount = amount - expenses;
// }
// if (expenses > 0 && remainingAmount > 0) {
//   amount = remainingAmount + expenses;
// }

/*
  Amount
*/
// if (amount > 0 && margin > 0) {
//   remainingAmount = amount * (margin / 100);
//   expenses = amount - remainingAmount;
// }
// if (amount > 0 && remainingAmount > 0) {
//   expenses = amount - remainingAmount;
// }
// if (amount > 0 && expenses > 0) {
//   remainingAmount = amount - expenses;
// }

/*
  remainingAmount
*/
// if (remainingAmount > 0 && margin > 0) {
//   amount = (remainingAmount / margin) * 100;
//   expenses = amount - remainingAmount;
// }



// console.log(new Amount(100299.60, 'PLN'));


// const c = new Calculation(100000, 0, 'GBP');
// c.addExpense('Laptop 1', 78000.32);
// // .addExpense('Laptop 2', 3503.76, 6)
// // .addExpense('Laptop 3', 43200.23);
// // c.addExpense('Rayban glasses', 100);
// // c.addExpense('Something more i need', 320);

// // c.deleteExpense('Laptop');
// // c.restoreExpense('Laptop');

// // console.log(`Expenses amount: `, c);

// c
//   .increaseAmount(4500)
//   .decreaseAmount(3500)
//   .decreaseAmount(27000.3);

// c
//   .setAmount(200299.35)
//   .setAmount(100299.23)
//   .setAmount(250000.27)
//   .setAmount(100)
//   .decreaseAmount(200)
//   .increaseAmount(83500);


// console.log(c.markupInPercent);
// console.log(c.expensesAmount);
// console.log(c.itemsInExpenses);
