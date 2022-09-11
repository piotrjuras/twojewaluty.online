import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../Loader';
import Operation from './Operation';
import UserService from '../../services/UserService';
import CurrencyService from '../../services/CurrencyService';
import { Link, useNavigate } from 'react-router-dom';
import { StyledButton, StyledDelete } from '../../styled/StyledButton';
import { getSpread } from '../../helpers/helper';
import { AlertContext, UserContext } from '../../Root';

const Currency = ({ code, mainCurrency, spread, editMode }) => {

    const navigate = useNavigate();
    const [currency, setCurrency] = useState(null);
    const [modal, setModal] = useState(false);
    const [userData, setUserData] = useContext(UserContext); // eslint-disable-line
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    const customCurrencyRate = userData.subAccounts[userData.mainAccount].customCurrencyRate;

    const customCurrencyRateData = {
        mid: customCurrencyRate,
        effectiveDate: 'brak, wartość zdefiniowana'
    }

    useEffect(() => {
        const fetchCurrency = async (code, days) => {
            const res = await CurrencyService.getCurrency(code, days);
            setCurrency({
                code: res.data.code,
                name: res.data.currency,
                todaysRate: res.data.rates[1],
                yesterdaysRate: res.data.rates[0]
            });
            if(customCurrencyRate && mainCurrency) setCurrency({
                code: res.data.code,
                name: res.data.currency,
                todaysRate: customCurrencyRateData,
                yesterdaysRate: customCurrencyRateData
            });
        }
        fetchCurrency(code, 2)
    }, [code]); // eslint-disable-line

    const calculate = (data, calculateType) => {
        if(calculateType === 'difference') return (data.todaysRate.mid - data.yesterdaysRate.mid).toFixed(4);
        if(calculateType === 'isGrowing') return data.todaysRate.mid > data.yesterdaysRate.mid;
    };

    const handleDelete = (e, code) => {
        e.preventDefault();
        userData.favorites.forEach(async (currency, index) => {
            if(currency.code === code){
                userData.favorites.splice(index, 1);
                const response = await UserService.updateUser(userData.userToken, userData);
                if(response.data === 'updated'){
                    setAlert(`Usunięto z ulubionych: ${currency.code}`);
                } else {
                    setAlert(['Ups! coś poszło nie tak', 'error']);
                }
                navigate(`/user/${userData.userToken}/reload/`);
            }
        });
    }

    return(
        <CurrencyWrapper>
            {currency ? <>
                <Link
                    to={`/details/${currency.code}/week/${userData.userToken}/`}
                    className={
                        calculate(currency, 'isGrowing') ? 
                            customCurrencyRate && mainCurrency ? null : 'green'
                        : 
                            customCurrencyRate && mainCurrency ? null : 'red'
                    }
                >
                    <h2>{currency.code}</h2>
                    <h1>{currency.todaysRate.mid.toFixed(4)}</h1>
                    <span>
                        {calculate(currency, 'difference')}PLN
                    </span>
                    {editMode ? <StyledDelete onClick={(e) => handleDelete(e, currency.code)}>usuń</StyledDelete> : null }
                </Link>
                {mainCurrency ? 
                    <div className="buttons">
                        <StyledButton primary onClick={() => setModal('sell')}>
                            Sprzedaj <span>{getSpread(currency.todaysRate.mid, spread, 'sell')}</span>
                        </StyledButton>
                        <StyledButton onClick={() => setModal('buy')}>
                            Kup <span>{getSpread(currency.todaysRate.mid, spread, 'buy')}</span>
                        </StyledButton>
                        { modal ?
                            <Operation
                                currency={currency}
                                modal={modal}
                                spread={spread}
                                closeModal={() => setModal(false)}
                            />
                        : null }
                    </div> 
                    : null}
                    <p>aktualizacja: {currency.todaysRate.effectiveDate}</p>
                </> : <Loader />}
        </CurrencyWrapper>
    )
}

const CurrencyWrapper = styled.div`
    border-radius: 25px;
    padding: 15px 25px;
    position: relative;
    margin-bottom: 20px;
    box-shadow: var(--link-box-shadow);
    min-height: 50px;

    div, a{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--black);
        &.red{
            color: var(--red);
        }
        &.green{
            color: var(--green);
        }
        h1,h2{
            margin: 0;
        }
    }

    p{
        font-size: 12px;
        text-align: end;
        margin: 10px 0 0;
    }

    .buttons{
        margin-top: 10px;
        justify-content: space-evenly;

        button{
            margin: 0 5px;
        }
        span{
            font-size: 15px;
            font-weight: 100;
        }
    }

    h2, h1{
        margin: 10px 0;
        padding: 0; 
    }
`

export default Currency;