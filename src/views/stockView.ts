import { createDiv } from "../common"
import { Stock } from "../models/Stock";
import { drawPortfolio, drawPortfolioStock } from "./portfolioView";

export const drawStockMarket = (host: HTMLElement) : void => {
    const mainCont : HTMLElement = createDiv(host, "main-container");

    const titleDiv : HTMLElement = createDiv(mainCont, "top-section");
    titleDiv.innerHTML = "STOCKS MARKET";

    const marketCont : HTMLElement = createDiv(mainCont, "bottom-section");
    
    const stocksCont: HTMLElement = createDiv(marketCont, "stocks-section");
    const portfolioCont: HTMLElement = createDiv(marketCont, "portfolio-section")

    const stocksHeadline: HTMLElement = createDiv(stocksCont, "sub-header");
    const headline = document.createElement("h2");
    headline.textContent = "STOCKS";
    headline.className = "stocks-hedline";
    stocksHeadline.appendChild(headline);

    //drawPortfolio(marketCont);
}

export const drawStock = (stock: Stock) : void =>  {
    const host : HTMLElement = document.querySelector(".stocks-section");

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
    const bottomText = document.createElement("p");
    const bottomRowDiv: HTMLElement = createDiv(stockInfoDiv, "stock-info-row");
    bottomText.textContent = `$${stock.price} ${stock.change} (${stock.percentChange}%)`;
    bottomRowDiv.appendChild(bottomText);

    const buyDiv: HTMLElement = createDiv(stockDiv, "buy-stock");
    const stockQuantity: HTMLElement = document.createElement("input");
    stockQuantity.ariaPlaceholder = "Quantity";
    stockQuantity.className = "quantity-input";
    buyDiv.appendChild(stockQuantity);
    const buyBtn: HTMLElement = document.createElement("button");
    buyBtn.innerHTML = "Buy";
    buyBtn.className = "buy-button";
    buyDiv.appendChild(buyBtn);
}
