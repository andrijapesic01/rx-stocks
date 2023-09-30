import { Stock } from "./Stock";

export enum stockAction {
    BUY,
    SELL
}

export interface StockActivity {
    stock: Stock;
    action: stockAction;
    quantity: number;
}