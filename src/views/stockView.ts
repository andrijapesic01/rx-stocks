import { createDiv } from "../common"
import { userBuyStock } from "../logic/stocksLogic";
import { Stock } from "../models/Stock";
import { drawPortfolio, drawPortfolioStock } from "./portfolioView";

export const drawStockMarket = (host: HTMLElement): void => {
    const mainCont: HTMLElement = createDiv(host, "main-container");

    const titleDiv: HTMLElement = createDiv(mainCont, "top-section");
    titleDiv.innerHTML = "STOCKS MARKET";

    const marketCont: HTMLElement = createDiv(mainCont, "bottom-section");

    const stocksCont: HTMLElement = createDiv(marketCont, "stocks-section");
    const portfolioCont: HTMLElement = createDiv(marketCont, "portfolio-section")

    const stocksHeadline: HTMLElement = createDiv(stocksCont, "sub-header");
    const headline = document.createElement("h2");
    headline.textContent = "STOCKS";
    headline.className = "stocks-hedline";
    stocksHeadline.appendChild(headline);

    const searchInput: HTMLInputElement = document.createElement("input");
    searchInput.className = "search-input";
    searchInput.setAttribute("placeholder", "Search stocks");
    stocksCont.appendChild(searchInput);

    drawPortfolio();
}

export const drawStock = (stock: Stock): void => {
    const host: HTMLElement = document.querySelector(".stocks-section");

    const stockDiv: HTMLElement = createDiv(host, "stock");

    const imageDiv: HTMLElement = createDiv(stockDiv, "stock-image");
    let img = document.createElement("img");
    img.className = "img";
    img.src = `./logos/${stock.id}.png`;
    imageDiv.appendChild(img);

    const stockInfoDiv: HTMLElement = createDiv(stockDiv, "stock-info");

    const topRowDiv: HTMLElement = createDiv(stockInfoDiv, "stock-info-row");
    const topText = document.createElement("p");
    topText.textContent = `(${stock.id}) ${stock.name}`;
    topRowDiv.appendChild(topText);

    const bottomRowDiv: HTMLElement = createDiv(stockInfoDiv, "stock-info-row");
    const bottomText = document.createElement("p");
    const label1: HTMLElement = document.createElement("label");
    label1.innerHTML = `$${stock.price} `;
    const label2: HTMLElement = document.createElement("label");
    label2.innerHTML = stock.change >= 0 ? `+$${stock.change} (+${stock.percentChange}%)`
        : `-$${Math.abs(stock.change)} (${stock.percentChange}%)`;
    label2.style.color = stock.change >= 0 ? "green" : "red";
    label1.appendChild(label2);
    bottomText.innerHTML = label1.innerHTML;
    bottomText.id = `stock-info-${stock.id}`;
    bottomRowDiv.appendChild(bottomText);

    const buyDiv: HTMLElement = createDiv(stockDiv, "buy-stock");
    const stockQuantity: HTMLInputElement = document.createElement("input");
    stockQuantity.ariaPlaceholder = "Quantity";
    stockQuantity.className = "quantity-input";
    stockQuantity.setAttribute("min", "0"); //= "quantity-input";
    buyDiv.appendChild(stockQuantity);
    const buyBtn: HTMLElement = document.createElement("button");
    buyBtn.innerHTML = "Buy";
    buyBtn.className = "buy-button";
    buyBtn.onclick = () => userBuyStock(stock, parseInt(stockQuantity.value, 10));
    buyDiv.appendChild(buyBtn);
}

export const updateStockPrice = (stock: Stock): void => {
    const oldStockInfo = document.getElementById(`stock-info-${stock.id}`);

    const label1: HTMLElement = document.createElement("label");
    label1.innerHTML = `$${stock.price} `;

    const label2: HTMLElement = document.createElement("label");
    label2.innerHTML = stock.change >= 0 ? `+$${stock.change} (+${stock.percentChange}%)`
        : `-$${Math.abs(stock.change)} (${stock.percentChange}%)`;
    label2.style.color = stock.change >= 0 ? "green" : "red";

    label1.appendChild(label2);
    oldStockInfo.innerHTML = label1.innerHTML;
}

export const clearStocks = (): void => {
    const stocksContainer: HTMLElement = document.querySelector(".stocks-section");
    while (stocksContainer.children.length > 2) {
        stocksContainer.removeChild(stocksContainer.lastChild);
    }
};

export const refreshStock = (stock: Stock) : void => {
    const stockInfo = document.getElementById(`stock-info-${stock.id}`);
    const label1: HTMLElement = document.createElement("label");
    label1.innerHTML = `$${stock.price.toFixed(2)} `;
    const label2: HTMLElement = document.createElement("label");
    label2.innerHTML = stock.change >= 0 ? `+$${stock.change.toFixed(2)} (+${stock.percentChange.toFixed(2)}%)`
        : `-$${Math.abs(stock.change).toFixed(2)} (${stock.percentChange.toFixed(2)}%)`;
    label2.style.color = stock.change >= 0 ? "green" : "red";
    label1.appendChild(label2);
    stockInfo.innerHTML = label1.innerHTML;
}
