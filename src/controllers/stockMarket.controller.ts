import { Observable, from } from "rxjs";
import { Stock } from "../models/Stock";
import { SERVER_ADDRESS } from "../constants";

export const getStocks = (): Observable<Stock[]> => {
    const promise: Promise<Stock[]> = fetch(`${SERVER_ADDRESS}/stocks`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("No matches found!");
            } else {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
        });
    return from(promise);
};

export const getStock = (stockId: string): Observable<Stock> => {
    const promise: Promise<Stock> = fetch(`${SERVER_ADDRESS}/stocks/${stockId}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("No matches found!");
            } else {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
        });
    return from(promise);
}

export const updateStock = (stock: Stock): Observable<Stock> => {
    const promise: Promise<Stock> = fetch(`${SERVER_ADDRESS}/stocks/${stock.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update stock!");
            } else {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
        });

    return from(promise);
}

export const getStocksByQuery = (query: string): Observable<Stock[]> => {
    const promise: Promise<Stock[]> = fetch(
        `${SERVER_ADDRESS}/stocks?q=${query}`
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("No matches found!");
            } else {
                return res.json();
            }
        })
        .catch((err) => console.error(err));
    return from(promise);
};


/* export const getPortfolio = (): Observable<Portfolio> => {
    const promise: Promise<Portfolio> = fetch(`${SERVER_ADDRESS}/portfolio`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("No matches found!");
            } else {
                return res.json();
            }
        })
        .catch((err) => {
            console.error(err);
        });
    return from(promise);
}; */