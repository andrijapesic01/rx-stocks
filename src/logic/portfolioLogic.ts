import { getPortfolio } from "../controllers/stockMarket.controller";
import { Portfolio } from "../models/Portfolio";
import { drawPortfolio } from "../views/portfolioView"

export const loadPortfolio = (): void => {
    getPortfolio().subscribe((portfolio) => {
        drawPortfolio(portfolio);
    })
};

export const calculateProfit = (portfolio: Portfolio): number => {
    let totalProfit = 0;

    portfolio.stocks.forEach((boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        //const currentValue = stock.price * quantity;
        //const profit = currentValue - (boughtFor * quantity);
        //totalProfit += profit;
        totalProfit += (stock.price - boughtFor) * quantity;        
    });

    return totalProfit;
}