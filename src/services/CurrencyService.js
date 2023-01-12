import { includeSessionCache } from '../helpers/cache';
import { headers } from '../helpers/headers';

export default class CurrencyService{

    static async getAvailableCurrencies(){
        // return await axios.get(`http://api.nbp.pl/api/exchangerates/tables/a/`, headers);

        return await includeSessionCache(
            {
                endpoint: `http://api.nbp.pl/api/exchangerates/tables/a/`,
                headers: headers
            },
            ['tables/a'],
            360
        )
    }

    static async getCurrency(code, days){

        return await includeSessionCache(
            {
                endpoint: `http://api.nbp.pl/api/exchangerates/rates/a/${code.toLowerCase()}/last/${days}/`,
                headers: headers
            },
            [code, days],
            60
        );
    }

    static async getCurrencyHistory(code, startDate, endDate){

        return await includeSessionCache(
            {
                endpoint: `http://api.nbp.pl/api/exchangerates/rates/a/${code.toLowerCase()}/${startDate}/${endDate}/`,
                headers: headers
            },
            [code, startDate, endDate],
            60
        )
    }

}