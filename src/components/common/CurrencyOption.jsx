import React from 'react';
import { StyledCurrencyOption } from '../../styled/StyledCurrencyOption'

const CurrencyOption = ({ currency, handleClick, check, loading }) => {

    if(!check) return (
        <StyledCurrencyOption 
            onClick={() => {
                if(!loading) handleClick(currency)
            }}
            style={{opacity: loading ? '.2' : '1'}}
        >
            {currency.code} <br/><span>{currency.currency}</span>
        </StyledCurrencyOption>
    )

    if(check) return (
        <StyledCurrencyOption className="long" onClick={() => handleClick(currency)}>
            {currency.code} <br/><span>{currency.currency || currency.name}</span>
            <div className="check"></div>
        </StyledCurrencyOption>
    )
}

export default CurrencyOption;