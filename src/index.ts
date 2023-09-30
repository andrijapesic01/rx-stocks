import { handleSearch, loadStocks, stockActivitySubject } from "./logic/stocksLogic";
import { updatePortfolioStock, updatePortfolioStockInfo } from "./views/portfolioView";
import { drawStockMarket } from "./views/stockView";

drawStockMarket(document.body);

loadStocks();
//simulateMarket();
handleSearch();
//loadPortfolio();
//buyStock("AAPL", 10);

stockActivitySubject.subscribe((stockActivity) => updatePortfolioStockInfo(stockActivity.stock));