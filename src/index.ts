import { handleSearch, loadStocks, stockActivitySubject, stockSuggestionSubject } from "./logic/stocksLogic";
import { updatePortfolioStock, updatePortfolioStockInfo } from "./views/portfolioView";
import { drawStockMarket, updateStockMarkers } from "./views/stockView";

drawStockMarket(document.body);

loadStocks();
//simulateMarket();
handleSearch();
//loadPortfolio();
stockActivitySubject.subscribe((stockActivity) => updatePortfolioStockInfo(stockActivity.stock));
//stockSuggestionSubject.subscribe((stockSuggestion) => handleStockSuggestion(stockSuggestion));
stockSuggestionSubject.subscribe((stockSuggestion) => updateStockMarkers(stockSuggestion));

