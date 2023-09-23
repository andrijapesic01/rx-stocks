import { getStocks } from "./controllers/stockMarket.controller";
import { loadPortfolio } from "./logic/portfolioLogic";
import { loadStocks } from "./logic/stocksLogic";
import { drawStockMarket } from "./views/stockView";

drawStockMarket(document.body);

loadStocks();
loadPortfolio();
