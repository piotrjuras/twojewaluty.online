import axios from 'axios';
import { headers } from '../helpers/headers';

export default class CurrencyService{

    static async getAvailableCurrencies(){
        return await axios.get(`http://api.nbp.pl/api/exchangerates/tables/a/`, headers);
    }

    static async getCurrency(code, days){
        return await axios.get(`http://api.nbp.pl/api/exchangerates/rates/a/${code.toLowerCase()}/last/${days}/`, headers);
    }

    static async getCurrencyHistory(code, startDate, endDate){
        return await axios.get(`http://api.nbp.pl/api/exchangerates/rates/a/${code.toLowerCase()}/${startDate}/${endDate}/`, headers);

    }

}