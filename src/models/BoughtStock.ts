import { Stock } from "./Stock";

export interface BoughtStock {
    stock: Stock;
    boughtFor: number;
    quantity: number;
}