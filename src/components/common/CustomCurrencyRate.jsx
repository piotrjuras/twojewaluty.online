import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../../styled/StyledButton';
import { FormInput } from '../../styled/StyledInput';


const CustomCurrencyRate = ({ subAccount }) => {

    const [useNBP, setUseNBP] = useState(subAccount.customCurrencyRate ? false : true);

    const setCustomCurrencyValue = (value) => {
        subAccount.customCurrencyRate = Number(value.replace(',', '.'));
    }

    useEffect(() => {
        if(useNBP) subAccount.customCurrencyRate = null;
    },[useNBP, subAccount])

    return (
        <StyledCustomCurrencyValue>
            <h3>Pobieraj kurs: {useNBP ? 'NBP' : 'własny kurs'}</h3>
            {!useNBP ? <>
                <label htmlFor="name">kurs w PLN</label>
                <FormInput type="number" placeholder={subAccount.customCurrencyRate ? subAccount.customCurrencyRate.toFixed(4) : '4.5367'} onChange={(e) => setCustomCurrencyValue(e.currentTarget.value)} />
            </>
            :
                null
            }
            <div>
                <StyledButton center onClick={() => setUseNBP(!useNBP)}>{!useNBP ? 'Ustaw kurs z NBP' :'Ustaw własny kurs'}</StyledButton>
            </div>
        </StyledCustomCurrencyValue>
    )
}

const StyledCustomCurrencyValue = styled.div`
    margin: 30px 0;
    p{
        margin: 0;
    }
    div{
        margin: 10px 0;
    }
`

export default CustomCurrencyRate;