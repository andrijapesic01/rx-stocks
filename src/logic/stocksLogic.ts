import { getStocks } from "../controllers/stockMarket.controller";
import { drawStock } from "../views/stockView";

export const loadStocks = (): void => {
    getStocks().subscribe((stocks) =>
      stocks.forEach((stock) => {
        drawStock(stock);
        /* checkIfAdded(stock); */
      })
    );
};