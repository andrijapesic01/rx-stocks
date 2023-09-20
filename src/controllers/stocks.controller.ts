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