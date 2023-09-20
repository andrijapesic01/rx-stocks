import { createDiv } from "../common"

export const drawPortfolio = (host: HTMLElement) : void => {

    const portfolioDiv: HTMLElement = createDiv(host, "portfolio-section");

    const portfolioHeadline: HTMLElement = createDiv(portfolioDiv, "sub-header");
    const headline = document.createElement("h2");
    headline.textContent = "PORTFOLIO";
    headline.className = "stocks-hedline";
    portfolioHeadline.appendChild(headline);
}