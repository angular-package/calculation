// Type.
import { CalculatorParam } from '../type/calculator-param.type';
/**
 *
 */
export class Calculator {
  /**
   * Before last.
   */
  public get beforeLastParam(): CalculatorParam {
    return this.#beforeLastParam;
  }

  /**
   * Cost.
   */
  public get cost(): number {
    return this.#cost;
  }
  public set cost(value: number) {
    this.#cost = value;

    // Calculate other parameters if the last changed parameter was margin.
    if (
      this.lastParam === 'margin' ||
      (this.lastParam === 'cost' && this.beforeLastParam === 'margin')
    ) {
      // margin and markup constant.
      this.#revenue = this.getRevenueByCostMargin(value, this.margin);
      this.#profit = this.getProfitByCostMargin(value, this.margin);
    }

    // Calculate other parameters if the last changed parameter was markup.
    if (
      this.lastParam === 'markup' ||
      (this.lastParam === 'cost' && this.beforeLastParam === 'markup')
    ) {
      // markup and margin constant.
      this.#revenue = this.getRevenueByCostMarkup(value, this.markup);
      this.#profit = this.getProfitByCostMarkup(value, this.markup);
    }

    // Calculate other parameters if the last changed parameter was profit.
    if (
      this.lastParam === 'profit' ||
      (this.lastParam === 'cost' && this.beforeLastParam === 'profit')
    ) {
      // profit constant.
      this.#revenue = this.getRevenueByProfitCost(this.profit, value);
      this.#margin = this.getMarginByProfitRevenue(this.profit, this.revenue);
      this.#markup = this.getMarkupByMargin(this.margin);
    }

    // Calculate other parameters if the last changed parameter was revenue.
    if (
      this.lastParam === 'revenue' ||
      (this.lastParam === 'cost' && this.beforeLastParam === 'revenue')
    ) {
      // revenue constant.
      this.#profit = this.getProfitByRevenueCost(this.revenue, value);
      this.#margin = this.getMarginByProfitRevenue(this.profit, this.revenue);
      this.#markup = this.getMarkupByMargin(this.margin);
    }

    this.lastParam !== 'cost' && (this.#beforeLastParam = this.lastParam);
    this.setLast('cost');
  }

  /**
   * Last.
   */
  public get lastParam(): CalculatorParam {
    return this.#lastParam;
  }

  /**
   * Margin.
   */
  public get margin(): number {
    return this.#margin;
  }
  public set margin(value: number) {
    this.#margin = value;
    this.#markup = this.getMarkupByMargin(value);

    // Calculate other parameters if the last changed parameter was cost.
    if (
      this.lastParam === 'cost' ||
      (this.lastParam === 'margin' && this.beforeLastParam === 'cost')
    ) {
      // cost constant.
      this.#revenue = this.getRevenueByCostMargin(this.cost, value);
      this.#profit = this.getProfitByCostMargin(this.cost, value);
    }

    // Calculate other parameters if the last changed parameter was markup.
    if (
      this.lastParam === 'markup' ||
      (this.lastParam === 'margin' && this.beforeLastParam === 'markup')
    ) {
      // this.markup = this.getMarkupByMargin(value); TODO: Remove
      // Update revenue.
      this.cost > 0 && this.lock === 'cost'
        ? ((this.#revenue = this.getRevenueByCostMargin(this.cost, value)),
          (this.#profit = this.getProfitByRevenueMargin(
            this.revenue,
            this.margin
          )))
        : // Update cost.
        this.revenue > 0 && this.lock === 'revenue'
        ? ((this.#cost = this.getCostByRevenueMargin(this.revenue, value)),
          (this.#profit = this.getProfitByRevenueCost(this.revenue, this.cost)))
        : // Update profit.
          this.profit > 0 &&
          ((this.#revenue = this.getRevenueByProfitMarkup(
            this.profit,
            this.markup
          )),
          (this.#cost = this.getCostByProfitMarkup(this.profit, this.markup)));
    }

    // Calculate other parameters if the last changed parameter was profit.
    if (
      this.lastParam === 'profit' ||
      (this.lastParam === 'margin' && this.beforeLastParam === 'profit')
    ) {
      // profit constant.
      // Set the revenue based on constant profit and given margin.
      this.#revenue = this.getTevenueByProfitMargin(this.profit, value);

      // Set the cost based on the constant profit and calculated markup.
      this.#cost = this.getCostByProfitMargin(this.profit, value);
    }

    // Calculate other parameters if the last changed parameter was revenue.
    if (
      this.lastParam === 'revenue' ||
      (this.lastParam === 'margin' && this.beforeLastParam === 'revenue')
    ) {
      // revenue constant.
      this.#profit = this.getProfitByRevenueMargin(this.revenue, value);
      this.#cost = this.getCostByRevenueMargin(this.revenue, value);
    }

    this.lastParam !== 'margin' && (this.#beforeLastParam = this.lastParam);
    this.setLast('margin');
  }

  /**
   * Markup.
   */
  public get markup(): number {
    return this.#markup;
  }

  public set markup(value: number) {
    this.#markup = value;
    this.#margin = this.getMarginByMarkup(value);

    // Calculate other parameters if the last changed parameter was cost.
    if (
      this.lastParam === 'cost' ||
      (this.lastParam === 'markup' && this.beforeLastParam === 'cost')
    ) {
      // cost constant.
      this.#revenue = this.getRevenueByCostMarkup(this.cost, value);
      this.#profit = this.getProfitByCostMarkup(this.cost, value);
    }

    // Calculate other parameters if the last changed parameter was margin.
    if (
      this.lastParam === 'margin' ||
      (this.lastParam === 'markup' && this.beforeLastParam === 'margin')
    ) {
      // Update revenue.
      this.cost > 0 && this.lock === 'cost'
        ? // ? this.revenue = this.getrRevenueByCostMarkup(this.cost, value)
          ((this.#revenue = this.getRevenueByCostMarkup(this.cost, value)),
          (this.#profit = this.getProfitByRevenueMargin(
            this.revenue,
            this.margin
          )))
        : // Update cost.
        this.revenue > 0 && this.lock === 'revenue'
        ? ((this.#cost = this.getCostByRevenueMarkup(this.revenue, value)),
          (this.#profit = this.getProfitByRevenueMargin(
            this.revenue,
            this.margin
          )))
        : // Update profit.
          this.profit > 0 &&
          ((this.#revenue = this.getRevenueByProfitMarkup(this.profit, value)),
          (this.#cost = this.getCostByRevenueMarkup(this.revenue, value)));
    }

    // Calculate other parameters if the last changed parameter was profit.
    if (
      this.lastParam === 'profit' ||
      (this.lastParam === 'markup' && this.beforeLastParam === 'profit')
    ) {
      // markup, margin and profit constant.
      this.#revenue = this.getRevenueByProfitMarkup(this.profit, value);
      this.#cost = this.getCostByProfitMarkup(this.profit, value);
    }

    // Calculate other parameters if the last changed parameter was revenue.
    if (
      this.lastParam === 'revenue' ||
      (this.lastParam === 'markup' && this.beforeLastParam === 'revenue')
    ) {
      // Set the cost based on the constant revenue and given markup.
      this.#cost = this.getCostByRevenueMarkup(this.revenue, value);
      // Set the profit based on the calculated cost and constant revenue.
      this.#profit = this.getProfitByRevenueCost(this.revenue, this.cost);
    }

    this.lastParam !== 'markup' && (this.#beforeLastParam = this.lastParam);
    this.setLast('markup');
  }

  /**
   * Profit.
   */
  public get profit(): number {
    return this.#profit;
  }
  public set profit(value: number) {
    this.#profit = value;

    // Calculate other parameters if the last parameter was cost.
    if (
      this.lastParam === 'cost' ||
      (this.lastParam === 'profit' && this.beforeLastParam === 'cost')
    ) {
      this.#revenue = this.getRevenueByProfitCost(value, this.cost);
      this.#margin = this.getMarginByProfitRevenue(value, this.revenue);
      this.#markup = this.getMarkupByProfitCost(value, this.cost);
    }

    // Calculate other parameters if the last parameter was margin.
    if (
      this.lastParam === 'margin' ||
      (this.lastParam === 'profit' && this.beforeLastParam === 'margin')
    ) {
      this.#revenue = this.getTevenueByProfitMargin(value, this.margin);
      this.#cost = this.getCostByRevenueProfit(this.revenue, value);
    }

    if (
      this.lastParam === 'markup' ||
      (this.lastParam === 'profit' && this.beforeLastParam === 'markup')
    ) {
      // constant markup and margin.
      this.#revenue = this.getRevenueByProfitMarkup(value, this.markup);
      this.#cost = this.getCostByProfitMarkup(value, this.markup);
    }

    // Calculate other parameters if the last parameter was revenue.
    if (
      this.lastParam === 'revenue' ||
      (this.lastParam === 'profit' && this.beforeLastParam === 'revenue')
    ) {
      this.#cost = this.getCostByRevenueProfit(this.revenue, value);
      this.#margin = this.getMarginByProfitRevenue(value, this.revenue);
      this.#markup = this.getMarkupByProfitCost(value, this.cost);
    }

    this.lastParam !== 'profit' && (this.#beforeLastParam = this.lastParam);
    this.setLast('profit');
  }

  /**
   * Revenue.
   */
  public get revenue(): number {
    return this.#revenue;
  }
  public set revenue(value: number) {
    this.#revenue = value;

    // Calculate other parameters if the last changed parameter was cost.
    if (
      this.lastParam === 'cost' ||
      (this.lastParam === 'revenue' && this.beforeLastParam === 'cost')
    ) {
      // Change the profit based on revenue and cost.
      this.#profit = this.getProfitByRevenueCost(value, this.cost);
      // Set the margin based on updated profit.
      this.#margin = this.getMarginByProfitRevenue(this.profit, value);
      // Set the markup based on updated profit.
      this.#markup = this.getMarkupByMargin(this.margin);
    }

    // Calculate other parameters if the last changed parameter was margin.
    if (
      this.lastParam === 'margin' ||
      (this.lastParam === 'revenue' && this.beforeLastParam === 'margin')
    ) {
      // constant margin and markup.
      // Set the profit based on the given revenue and last constant margin.
      this.#profit = this.getProfitByRevenueMargin(value, this.margin);
      // Set the cost based on the given revenue and last constant margin.
      this.#cost = this.getCostByRevenueMargin(value, this.margin);
    }

    // Calculate other parameters if the last changed parameter was markup.
    if (
      this.lastParam === 'markup' ||
      (this.lastParam === 'revenue' && this.beforeLastParam === 'markup')
    ) {
      // constant margin and markup.
      this.#cost = this.getCostByRevenueMargin(value, this.margin);
      this.#profit = this.getProfitByRevenueMargin(value, this.margin);
    }

    // Calculate other parameters if the last changed parameter was profit.
    if (
      this.lastParam === 'profit' ||
      (this.lastParam === 'revenue' && this.beforeLastParam === 'profit')
    ) {
      this.#cost = this.getCostByRevenueProfit(value, this.profit);
      this.#margin = this.getMarginByProfitRevenue(this.profit, value);
      this.#markup = this.getMarkupByMargin(this.margin);
    }

    this.lastParam !== 'revenue' && (this.#beforeLastParam = this.lastParam);
    this.setLast('revenue');
  }

  //#region instance public properties.
  public costBy = {
    profit: {
      markup: this.getCostByProfitMarkup,
    },
    revenue: {
      markup: this.getCostByRevenueMarkup,
      profit: this.getCostByRevenueProfit,
    },
  };

  public profitBy = {
    revenue: {
      cost: this.getProfitByRevenueCost,
      margin: this.getProfitByRevenueMargin,
    },
  };

  public revenueBy = {
    profit: {
      cost: this.getRevenueByProfitCost,
      margin: this.getTevenueByProfitMargin,
      markup: this.getRevenueByProfitMarkup,
    },
    cost: {
      margin: this.getRevenueByCostMargin,
      markup: this.getRevenueByCostMarkup,
    },
  };

  /*
    Calculation parameters.
  */
  public lock = 'cost';

  //#endregion instance public properties.

  //#region instance private properties.
  #beforeLastParam: CalculatorParam = '';
  #cost = 0;
  #lastParam: CalculatorParam = '';
  #margin = 0;
  #markup = 0;
  #profit = 0;
  #revenue = 0;
  //#endregion instance private properties.

  //#region instance public methods.
  /*
    Calculate parameters.
  */
  //#region cost.
  public getCostByProfitMarkup(profit: number, markup: number): number {
    return (profit / markup) * 100;
  }

  public getCostByProfitMargin(profit: number, margin: number): number {
    return (profit / (margin / (1 - margin / 100))) * 100;
  }

  public getCostByRevenueMarkup(revenue: number, markup: number): number {
    return revenue / (1 + markup / 100);
  }

  public getCostByRevenueMargin(revenue: number, margin: number): number {
    return revenue - revenue * (margin / 100);
  }

  public getCostByRevenueProfit(revenue: number, profit: number): number {
    return revenue - profit;
  }
  //#region cost.

  //#region margin.
  public getMarginByProfitRevenue(profit: number, revenue: number): number {
    return (profit / revenue) * 100;
  }

  public getMarginByMarkup(markup: number): number {
    return markup / (1 + markup / 100);
  }
  //#endregion margin.

  //#region markup.
  public getMarkupByProfitCost(profit: number, cost: number): number {
    return (profit / cost) * 100;
  }
  public getMarkupByMargin(margin: number): number {
    // ((1 / (1 - (margin / 100))) - 1) * 100; Different approach.
    return margin / (1 - margin / 100);
  }

  /**
   *
   * @param margin
   * @param profit
   * @returns
   * @angularpackage
   */
  public getMarkupByMarginProfit(margin: number, profit: number): number {
    return (profit / ((profit / margin) * 100 - profit)) * 100;
  }
  //#endregion markup.

  //#region profit.
  public getProfitByCostMarkup(cost: number, markup: number): number {
    return cost * (1 + markup / 100) - cost;
  }

  public getProfitByCostMargin(cost: number, margin: number): number {
    return cost / (1 - margin / 100) - cost;
  }

  public getProfitByRevenueCost(revenue: number, cost: number): number {
    return revenue - cost;
  }

  public getProfitByRevenueMargin(revenue: number, margin: number): number {
    return revenue * (margin / 100);
  }
  //#endregion profit.

  //#region revenue.
  public getRevenueByCostMargin(cost: number, margin: number): number {
    return cost / (1 - margin / 100);
  }

  public getRevenueByCostMarkup(cost: number, markup: number): number {
    return cost * (1 + markup / 100);
  }

  public getRevenueByProfitCost(profit: number, cost: number): number {
    return profit + cost;
  }

  public getTevenueByProfitMargin(profit: number, margin: number): number {
    return (profit / margin) * 100;
  }

  public getRevenueByProfitMarkup(profit: number, markup: number): number {
    return (profit / markup) * 100 + profit;
  }
  //#endregion revenue.

  /**
   *
   * @param last
   * @returns
   * @angularpackage
   */
  private setLast(last: CalculatorParam): this {
    this.#lastParam = last;
    return this;
  }
}

// const c = new Calculator();

// c.revenue = 20000;
// c.cost = 2700;
// c.margin = 10;
// c.profit = 500;
// c.markup = 120;
// c.margin = 60;
// c.margin = 50;
// c.markup = 200;
// c.revenue = 500;
// c.cost = 300;

// console.log(`cost: `, c.cost);
// console.log(`margin: `, c.margin);
// console.log(`markup: `, c.markup);
// console.log(`revenue: `, c.revenue);
// console.log(`profit: `, c.profit);
// console.log(`last: `, c.last);
// console.log(`beforeLast: `, c.beforeLast);
// console.log(`-----`);
