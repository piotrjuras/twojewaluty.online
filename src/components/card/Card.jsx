import React, { useEffect, useState } from 'react';
import CurrencyService from '../../services/CurrencyService';
import Loader from '../Loader';
import styled from 'styled-components';
import { getSpread } from '../../helpers/helper';


const Card = ({ data }) => {

    const { currency, balance, invested, spread, cardColor, customCurrencyRate } = data;
    const [currencyData, setCurrencyData] = useState(null);

    useEffect(() => {
        const fetchCurrency = async (code, days) => {
            const res = await CurrencyService.getCurrency(code, days);
            if(!customCurrencyRate){
                setCurrencyData(res.data);
            } else {
                setCurrencyData({
                    code: res.data.code,
                    currency: res.data.currency,
                    rates: [{
                        effectiveDate: 'domyślna wartość',
                        mid: customCurrencyRate
                    }]
                })
            }
        }
        fetchCurrency(currency.code, 1);
    },[data, currency, customCurrencyRate]);

    const calculateProfit = value => {
        return ((value * balance) - invested).toFixed(2);
    }

    return(
        <CreditCard 
            style={{ 
                background: cardColor, 
                boxShadow: `0px 2px 15px 0px ${cardColor}`
        }}>
            {currencyData ? 
            <div>
                <h3>Twoje saldo:</h3>
                <h1><span>{currency.code}</span> {balance.toFixed(2)}</h1>
                <h3>Zysk:</h3>
                <h2>{calculateProfit(getSpread(currencyData.rates[0].mid, spread, 'sell'))} <span>PLN</span></h2>
                {currencyData.rates[0].effectiveDate === 'domyślna wartość' ? <p>brak aktualnego kursu</p> : null}
            </div>
            : 
            <Loader color={'white'} />}
        </CreditCard>
    )
}

const CreditCard = styled.div`
    background: var(--blue);
    border-radius: 40px;
    min-height: 200px;
    padding: 15px 25px;
    color: white;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 2px 15px 0px var(--blue);
    margin-bottom: 40px;

    &::after{
        content: '';
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 40px solid rgba(255, 255, 255, .05);
        position: absolute;
        top: -60px;
        right: -60px;
    }

    h1{
        margin: 0 0 30px 0;
        font-size: 35px;
        span{
            font-size: 20px;
        }
    }

    h2{
        margin: 5px 0;
        span{
            font-size: 18px;
        }
    }

    h3{
        margin: 15px 0 10px;
    }
    p{
        position: absolute;
        right: -55px;
        top: 90px;
        transform: rotate(90deg);
    }

    .loader{
        min-height: 160px;
    }
`

export default Card;