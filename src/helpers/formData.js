import { generateId } from "./helper";

export const formModel = {
    userToken: generateId(10),
    email: null,
    name: null,
    favorites: [],
    subAccounts: [
        { 
            currency: { code: null, name: null },
            spread: 0.00,
            balance: 0,
            invested: 0,
            spentAmount: 0,
            gainedAmount: 0,
            customCurrencyRate: null,
            history: []
        }
    ],
    mainAccount: 0
}