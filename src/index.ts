import { handleSearch, loadStocks } from "./logic/stocksLogic";
import { drawStockMarket } from "./views/stockView";

drawStockMarket(document.body);

loadStocks();
//simulateMarket();
handleSearch();
//loadPortfolio();
//buyStock("AAPL", 10);
