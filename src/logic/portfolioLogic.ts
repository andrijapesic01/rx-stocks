import { Portfolio } from "../models/Portfolio";

export const calculateProfit = (portfolio: Portfolio): number => {
    return portfolio.stocks.reduce((totalProfit, boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        return totalProfit + Number(((stock.price - boughtFor) * quantity).toFixed(2));
    }, 0);
}

export const calculateStocksBalance = (portfolio: Portfolio) : number => {
    return portfolio.stocks.reduce((stocksBalance, boughtStock) => {
        const { stock, boughtFor, quantity } = boughtStock;
        return stocksBalance + stock.price * quantity;
    }, 0);
}

