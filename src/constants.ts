import { Portfolio } from "./models/Portfolio";

export const SERVER_ADDRESS = "http://localhost:3000";
export const INPUT_DEBOUNCE: number = 200; 

export const portfolio : Portfolio = {
    name: "My portfolio",
    stocks: [],
    userBalance: 15000,
    stocksBalance: 0
}
