import { BoughtStock } from "./BoughtStock";

export interface Portfolio {
    name: string;
    userBalance: number;
    stocks: BoughtStock[];
    stocksBalance?: number;
}