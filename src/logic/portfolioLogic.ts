import { portfolio } from "../constants";
import { updatePortfolioStockInfo } from "../views/portfolioView";
import { stockActivitySubject } from "./stocksLogic";

export const calculateProfit = (): number => {
    return portfolio.stocks.reduce((totalProfit, boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        return totalProfit + Number(((stock.price - boughtFor) * quantity).toFixed(2));
    }, 0);
}

export const calculateStocksBalance = () : number => {
    return portfolio.stocks.reduce((stocksBalance, boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        return stocksBalance + stock.price*quantity;
    }, 0);
}

