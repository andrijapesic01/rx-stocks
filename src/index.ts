import { PORTFOLIO_NAME, USER_BALANCE } from "./constants";
import { handleSearch, handleStockChange, loadStocks, stockActivitySubject, stockSuggestionSubject } from "./logic/stocksLogic";
import { Portfolio } from "./models/Portfolio";
import { drawPortfolio } from "./views/portfolioView";
import { drawStockMarket, updateStockMarkers } from "./views/stockView";

const portfolio: Portfolio = {
    name: PORTFOLIO_NAME,
    stocks: [],
    userBalance: USER_BALANCE,
    stocksBalance: 0,
}

drawStockMarket(document.body);
loadStocks(portfolio);
drawPortfolio(portfolio);
handleSearch(portfolio);

stockActivitySubject.subscribe((stockActivity) => handleStockChange(stockActivity, portfolio));
stockSuggestionSubject.subscribe((stockSuggestion) => updateStockMarkers(stockSuggestion));

