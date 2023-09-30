import { Subject, debounceTime, filter, fromEvent, groupBy, interval, map, merge, mergeMap, of, scan, switchMap, tap } from "rxjs";
import { INPUT_DEBOUNCE, portfolio } from "../constants";
import { getStocks, getStocksByQuery, updateStock } from "../controllers/stockMarket.controller";
import { BoughtStock } from "../models/BoughtStock";
import { Stock } from "../models/Stock";
import { drawPortfolioStock, removePortfolioStock, updatePortfolioBalance, updatePortfolioStock } from "../views/portfolioView";
import { clearStocks, drawStock, refreshStock, updateStockPrice } from "../views/stockView";
import { calculateStocksBalance } from "./portfolioLogic";
import { getRandomNum } from "../common";
import { StockActivity, stockAction } from "../models/StockActivity";

export const stockActivitySubject = new Subject<StockActivity>();

export const loadStocks = (): void => {
  getStocks().subscribe((stocks) => {

    monitorAndSuggest(stocks);
    stocks.forEach((stock) => {
      drawStock(stock);
      //updateStockPrice(stock);
      /* checkIfAdded(stock); */
    })
  }
  );
};

export const handleSearch = (): void => {
  const searchInput: HTMLInputElement = document.querySelector(".search-input");
  fromEvent(searchInput, "input")
    .pipe(
      debounceTime(INPUT_DEBOUNCE),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((query: string) => {
        if (query.length > 1) return true;

        clearStocks();
        loadStocks();
      }),
      switchMap((query) => getStocksByQuery(query))
    )
    .subscribe((stocks) => handleSearchResults(stocks));
};

const handleSearchResults = (stocks: Stock[]): void => {
  clearStocks();

  stocks.forEach((stock) => {
    drawStock(stock);
    //checkIfAdded(stock);
  });
};

export const buyStock = (stock: Stock, quantity: number): Stock => {

  stock.index += stock.index * quantity / 10 ^ 3.14;
  const newPrice = stock.price + (1 + Number(stock.index.toFixed(2)));
  stock.change = newPrice - stock.price;
  stock.percentChange = Number((stock.change / stock.price * 100).toFixed(2));
  stock.price = newPrice;

  //const updatedStock = updateStock(stock);
  return stock;
}

export const userBuyStock = (stock: Stock, quantity: number): void => {

  if (quantity < 1 || isNaN(quantity)) {
    alert("Please select valid quantity to buy!");
    return;

  } else if (portfolio.userBalance < stock.price * quantity) {
    alert("Insufficient funds!")
    return;

  } else {
    const foundObject = portfolio.stocks.find((boughtStock) => boughtStock.stock.id === stock.id);
    portfolio.userBalance -= stock.price * quantity;
    let updatedStock;
    if (!!foundObject) {
      foundObject.boughtFor = (foundObject.boughtFor * foundObject.quantity + stock.price * quantity)
        / (foundObject.quantity + quantity);
      foundObject.quantity += quantity;
      portfolio.stocksBalance = calculateStocksBalance();
      updatedStock = buyStock(stock, quantity)
      updatePortfolioStock(foundObject);
    } else {
      updatedStock = buyStock(stock, quantity)
      const boughtStock: BoughtStock = { stock: updatedStock, boughtFor: stock.price - stock.change, quantity: quantity };
      portfolio.stocks.push(boughtStock);
      portfolio.stocksBalance = calculateStocksBalance();
      drawPortfolioStock(boughtStock)
    }
  }
}

export const sellStock = (stock: Stock, quantity: number): Stock => {
  if (stock.price === 0)
    return;
  stock.index -= (stock.price + quantity * stock.index) / stock.price * stock.index;
  let newPrice = stock.price - stock.index * (0.3 * stock.price + stock.change) / stock.price;
  newPrice = newPrice >= 0 ? newPrice : 0;
  stock.change = stock.price - newPrice;
  stock.percentChange = Number((stock.change / stock.price * 100).toFixed(2));
  stock.price = newPrice;
  refreshStock(stock);
  return stock;
}

export const userSellStock = (stock: Stock, quantity: number): void => {
  const updatedStock = sellStock(stock, quantity);
  //updateStock(updatedStock); 
  portfolio.userBalance += stock.price * quantity;
  const updatedBoughtStocks = portfolio.stocks.filter((portfolioStock) => portfolioStock.stock.id !== stock.id);
  portfolio.stocks = updatedBoughtStocks;
  portfolio.stocksBalance = calculateStocksBalance();
  removePortfolioStock(stock.id);
}

export const simulateStockActivity = (stock: Stock) => {

  return interval(getRandomNum(10500, 22500)).pipe(
    mergeMap(() => {
      const randomStockQuantity = getRandomNum(1, 20);
      const randomAction = getRandomNum(0, 2) >= 1 ? stockAction.SELL : stockAction.BUY;

      if (randomAction === stockAction.BUY) {
        const updatedStock = buyStock(stock, randomStockQuantity);
        console.log(`Bought ${randomStockQuantity} shares of ${stock.id}`);
        stockActivitySubject.next({ stock: updatedStock, action: stockAction.BUY, quantity: randomStockQuantity });
      } else {
        const updatedStock = sellStock(stock, randomStockQuantity);
        console.log(`Sold ${randomStockQuantity} shares of ${stock.id}`);
        stockActivitySubject.next({ stock: updatedStock, action: stockAction.SELL, quantity: randomStockQuantity });
      }

      return of({ stock, action: randomAction, quantity: randomStockQuantity });
    })
  );
}

export const monitorAndSuggest = (stocks: Stock[]): void => {
  const observables = stocks.map((stock) => simulateStockActivity(stock));

  const combinedObservables = merge(...observables);

  combinedObservables
    .pipe(
      groupBy((data) => data.stock.name),
      mergeMap((group$) =>
        group$.pipe(
          scan(
            (acc, curr) => {
              if (curr.action === stockAction.BUY) {
                acc.buyCount += 1;
                acc.totalBuyQuantity += curr.quantity;
              } else {
                acc.sellCount += 1;
                acc.totalSellQuantity += curr.quantity;
              }
              return acc;
            },
            { stockName: group$.key, buyCount: 0, sellCount: 0, totalBuyQuantity: 0, totalSellQuantity: 0 }
          )
        )
      ),
      scan((acc, stock) => {
        const existingStockIndex = acc.findIndex((item) => item.stockName === stock.stockName);

        if (existingStockIndex !== -1) {
          acc[existingStockIndex] = {
            ...acc[existingStockIndex],
            buyCount: stock.buyCount,
            sellCount: stock.sellCount,
            totalBuyQuantity: stock.totalBuyQuantity,
            totalSellQuantity: stock.totalSellQuantity,
          };
        } else {
          acc.push(stock);
        }
        return acc;
      }, []),
      map((results) => {
        console.log(results);
        return results.map((result) => {
          const buyToSellRatio =
            result.totalSellQuantity === 0 ? Infinity : result.totalBuyQuantity / result.totalSellQuantity;
          return { stockName: result.stockName, buyToSellRatio };
        });
      }),
      tap((buyToSellRatios) => {
        const sortedRatios = [...buyToSellRatios].sort((a, b) => a.buyToSellRatio - b.buyToSellRatio);
        const HOT = sortedRatios[sortedRatios.length - 1];
        const COLD = sortedRatios[0];

        console.log(`HOT Stock: ${HOT.stockName} (Buy-to-Sell Ratio: ${HOT.buyToSellRatio})`);
        console.log(`COLD Stock: ${COLD.stockName} (Buy-to-Sell Ratio: ${COLD.buyToSellRatio})`);
      }),
    ).subscribe();
};
