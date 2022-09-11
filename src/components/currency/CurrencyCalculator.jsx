import React, { useState } from 'react';
import { FormInput } from '../../styled/StyledInput';

const CurrencyCalculator = ({ data }) => {

    const [pln, setPln] = useState(`1.00`);
    const [calculatedCurrency, setCalculatedCurrency] = useState(data.rates[data.rates.length-1].mid);

    const changePLN = (e) => {
        const value = e.currentTarget.value;
        if(!value.includes(',')){
            setPln(value)
            const result = ((data.rates[data.rates.length-1].mid) * value).toFixed(2);
            setCalculatedCurrency(result)
        }
    }

    const changeCurrency = (e) => {
        const value = e.currentTarget.value;
        if(!value.includes(',')){
            setCalculatedCurrency(value)
            const result = (value / (data.rates[data.rates.length-1].mid)).toFixed(2);
            setPln(result === 'Infinity' ? '0.00' : result)
        }
    }

    const calculateDifference = (startValue, endValue) => (endValue.mid - startValue.mid).toFixed(4);

    return (
        <div>
            <h4
                style={{color: (data.rates[0].mid > data.rates[data.rates.length-1].mid) ? 'var(--red)' : 'var(--green)'}}
            >1.00 {data.code} = {data.rates[data.rates.length-1].mid.toFixed(4)} PLN
            </h4>
            <p>dawniej: {data.rates[0].mid} PLN</p>
            <p>teraz: {data.rates[data.rates.length-1].mid} PLN</p>
            <p>różnica: {data.rates[0].mid > data.rates[data.rates.length-1].mid ? '' : '+'}
                {calculateDifference(data.rates[0], data.rates[data.rates.length-1])} PLN
            </p>
            <h2>Kalkulator</h2>            
            <FormInput
                onChange={(e) => changePLN(e)}
                value={pln}
            />
            <h4>{data.code} = PLN</h4>
            <FormInput
                onChange={(e) => changeCurrency(e)}
                value={calculatedCurrency}
            />
        </div>
    )
}

export default CurrencyCalculator;