
import { portfolio } from "../constants";

/* export const loadPortfolio = (): void => {
    getPortfolio().subscribe((portfolio) => {
        drawPortfolio(portfolio);
    })
}; */

/* export const calculateProfit = (): number => {
    let totalProfit = 0;
    console.log(portfolio.stocks);
    portfolio.stocks.forEach((boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        totalProfit += (stock.price - boughtFor) * quantity;        
    });

    return totalProfit;
} */

export const calculateProfit = (): number => {
    return portfolio.stocks.reduce((totalProfit, boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        return totalProfit + Number(((stock.price - boughtFor) * quantity).toFixed(2));
    }, 0);
}

export const calculateStocksBalance = () : number => {
    return portfolio.stocks.reduce((stocksBalance, boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        return stocksBalance + stock.price;
    }, 0);
}