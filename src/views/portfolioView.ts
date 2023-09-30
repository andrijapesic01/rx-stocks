import { createDiv, createLabel } from "../common"
import { calculateProfit } from "../logic/portfolioLogic";
import { BoughtStock } from "../models/BoughtStock";
import { Portfolio } from "../models/Portfolio";
import { Stock } from "../models/Stock";
import { portfolio } from "../constants";
import { userSellStock } from "../logic/stocksLogic";

export const drawPortfolio = (): void => {

    const portfolioDiv: HTMLElement = document.querySelector(".portfolio-section");

    const portfolioHeadline: HTMLElement = createDiv(portfolioDiv, "sub-header");
    const headline = document.createElement("h2");
    headline.textContent = "PORTFOLIO";
    headline.className = "stocks-hedline";
    portfolioHeadline.appendChild(headline);

    const portStocksDiv = createDiv(portfolioDiv, "portfolio-stocks-section");

    const bottomDiv = createDiv(portfolioDiv, "portfolio-bottom-section");

    //drawPortfolioStocks();
    drawPortfolioBalance(bottomDiv);

}

export const drawPortfolioBalance = (host: HTMLElement): void => {
    const topRowDiv = createDiv(host, "portfolio-bottom-row");

    const trdColumn1 = createDiv(topRowDiv, "portfolio-bottom-row-colum");
    const stocksBalanceLabel = createLabel(trdColumn1, "balance-label");
    stocksBalanceLabel.innerHTML = "Stocks balance: $";
    const stocksBalanceValue = createLabel(trdColumn1, "stocks-value");
    stocksBalanceValue.innerHTML = `${portfolio.stocksBalance}`;

    const trdColumn2 = createDiv(topRowDiv, "portfolio-bottom-row-colum");
    const totalProfitLbl = createLabel(trdColumn2, "balance-label");
    totalProfitLbl.innerHTML = "Total profit: $";
    const totalProfitValue = createLabel(trdColumn2, "total-profit-value");
    totalProfitValue.innerHTML = `${0}`;

    const btmRowDiv = createDiv(host, "portfolio-bottom-row");

    const brdColumn1 = createDiv(btmRowDiv, "portfolio-bottom-row-column");
    const balanceLabel = createLabel(brdColumn1, "balance-label");
    balanceLabel.innerHTML = "Balance: $";
    const balaceValue = createLabel(brdColumn1, "balance-value");
    balaceValue.innerHTML = `${portfolio.userBalance}`;

    const brdColumn2 = createDiv(btmRowDiv, "portfolio-bottom-row-column");
    const totalLabel = createLabel(brdColumn2, "balance-label");
    totalLabel.innerHTML = "Total balance: $";
    const totalValue = createLabel(brdColumn2, "portfolio-total-value");
    totalValue.innerHTML = `${portfolio.userBalance + portfolio.stocksBalance}`;
}

export const drawPortfolioStocks = (portfolio: Portfolio): void => {
    portfolio.stocks.forEach((stock) => drawPortfolioStock(stock));
}

export const drawPortfolioStock = (boughtStock: BoughtStock): void => {

    const { boughtFor, quantity, stock } = boughtStock;

    const host: HTMLElement = document.querySelector(".portfolio-stocks-section");

    const stockDiv = createDiv(host, "portfolio-stock");
    stockDiv.id = `portfolio-stock-${stock.id}`;
    const stockRowTop = createDiv(stockDiv, "portfolio-stock-row");
    const stockCompanyName = createLabel(stockRowTop, "label");
    stockCompanyName.innerHTML = `${stock.id} (${stock.name}) - ${quantity} stocks`;

    const stockRowBottom = createDiv(stockDiv, "portfolio-stock-row");

    const boughtForColumn = createDiv(stockRowBottom, "portfolio-stock-column");
    const boughtForLbl = createLabel(boughtForColumn, "label");
    boughtForLbl.innerHTML = "Bought for: $";
    const boughtForValue = createLabel(boughtForColumn, "bought-for-value");
    boughtForValue.innerHTML = `${boughtFor.toFixed(2)}`;

    const currentPriceColumn = createDiv(stockRowBottom, "portfolio-stock-column");
    const currentPrice = createLabel(currentPriceColumn, "label");
    currentPrice.innerHTML = "Current price: $";
    const currentPriceValue = createLabel(currentPriceColumn, "current-value");
    currentPriceValue.innerHTML = `${stock.price.toFixed(2)}`;

    const profitColumn = createDiv(stockRowBottom, "portfolio-stock-column");
    const profit = createLabel(profitColumn, "label");
    profit.innerHTML = "Profit: $";
    const profitValue = createLabel(profitColumn, "portfolio-stock-profit-value");
    profitValue.innerHTML = `${(stock.price - boughtFor).toFixed(2)}`;

    const sellColumn = createDiv(stockRowBottom, "portfolio-sell");
    const inputQuantity: HTMLInputElement = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("min", "0");
    inputQuantity.setAttribute("max", quantity.toString());
    inputQuantity.setAttribute("value", quantity.toString());
    inputQuantity.className = "quantity-input";
    sellColumn.appendChild(inputQuantity);

    const sellButton: HTMLElement = document.createElement("button");
    sellButton.innerHTML = "Sell";
    sellButton.className = "buy-button";
    sellButton.onclick = () => userSellStock(stock, parseInt(inputQuantity.value, 10));
    sellColumn.appendChild(sellButton);

    updatePortfolioBalance()
}

export const updatePortfolioBalance = (): void => {

    const stocksBalanceValue = document.querySelector(".stocks-value");
    stocksBalanceValue.innerHTML = `${portfolio.stocksBalance.toFixed(2)}`;

    const totalProfit = calculateProfit();
    const totalProfitValue = document.querySelector(".total-profit-value");
    totalProfitValue.innerHTML = `${totalProfit.toFixed(2)}`;

    const balaceValue = document.querySelector(".balance-value");
    balaceValue.innerHTML = `${portfolio.userBalance.toFixed(2)}`;

    const totalValue = document.querySelector(".portfolio-total-value");
    totalValue.innerHTML = `${(portfolio.userBalance + portfolio.stocksBalance).toFixed(2)}`;
}

export const removePortfolioStock = (stockId: string): void => {

    const stockDivToRemove : HTMLElement | null = document.getElementById(`portfolio-stock-${stockId}`);
    if (stockDivToRemove !== null) {
        stockDivToRemove.remove();
        updatePortfolioBalance();
    }
}

/* export const updatePortfolioStock = (portfolioStock: BoughtStock): void => {
    const { boughtFor, quantity, stock } = portfolioStock;

    removePortfolioStock(stock.id);
    drawPortfolioStock(portfolioStock);
    updatePortfolioBalance()
} */

export const updatePortfolioStock = (portfolioStock: BoughtStock): void => {

    const { boughtFor, quantity, stock } = portfolioStock;

    const stockDiv: HTMLElement | null = document.getElementById(`portfolio-stock-${stock.id}`);
    if (stockDiv) {

        if (quantity !== undefined) {
            const quantityLabel: HTMLElement | null = stockDiv.querySelector(".label");
            if (quantityLabel) {
                quantityLabel.innerHTML = `${stock.id} (${stock.name}) - ${quantity} stocks`;
            }
        }

        if (boughtFor !== undefined) {
            const boughtForValue: HTMLElement | null = stockDiv.querySelector(".bought-for-value");
            if (boughtForValue) {
                boughtForValue.innerHTML = `${boughtFor.toFixed(2)}`;
            }
        }

        updatePortfolioStockInfo(stock);
        //supdatePortfolioBalance();
    }
}

export const updatePortfolioStockInfo = (stock: Stock): void => {

    const stockDiv: HTMLElement | null = document.getElementById(`portfolio-stock-${stock.id}`);

    if(stockDiv === null) return;
    
    if (stock !== undefined) {
        const currentPriceLabel: HTMLElement | null = stockDiv.querySelector(".curent-value");
        if (currentPriceLabel) {
            currentPriceLabel.innerHTML = `${stock.price.toFixed(2)}`;
        }

        const stockProfitLabel: HTMLElement | null = stockDiv.querySelector(".portfolio-stock-profit-value");
        const boughtFor : number = Number(stockDiv.querySelector(".bought-for-value").innerHTML);
        stockProfitLabel.innerHTML = `${(stock.price - boughtFor).toFixed(2)}`;
    }

    updatePortfolioBalance();

};