import { getStocks } from "./controllers/stocks.controller";
import { loadStocks } from "./logic/stocksLogic";
import { drawStockMarket } from "./views/stockView";

drawStockMarket(document.body);

//getStocks().subscribe((stocks) => console.log(stocks));

loadStocks();