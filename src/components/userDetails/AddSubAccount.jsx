import React, { useEffect, useState, useRef, useContext } from 'react';
import CurrencyService from '../../services/CurrencyService';
import UserService from '../../services/UserService';
import CurrencyOption from '../../components/common/CurrencyOption';
import Loader from '../Loader';
import { StyledButton } from '../../styled/StyledButton';
import { Currencies } from '../../styled/StyledCurrencyOption';
import { FormInput } from '../../styled/StyledInput';
import { AlertContext } from '../../Root';
import { searchCurrency } from '../../helpers/helper';

const AddSubAccount = ({ userData, handleSuccess }) => {

    const [currencies, setCurrencies] = useState(null);
    const [mainCurrency, setMainCurrency] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState([]);
    const inputValue = useRef();
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    const [newSubAccount, setNewSubAccount] = useState({
        currency: { code: null, name: null },
        spread: 0.00,
        balance: 0,
        invested: 0,
        spentAmount: 0,
        gainedAmount: 0,
        customCurrencyRate: null,
        history: []
    })

    const fetchCurrencies = async () => {
        setLoading(true);
        const currencies = await CurrencyService.getAvailableCurrencies();
        setLoading(false);
        setCurrencies(currencies.data[0].rates);
    }

    const handlePickedCurrency = (currency) => {
        newSubAccount.currency.code = currency.code;
        newSubAccount.currency.name = currency.currency;
        setMainCurrency(currency);
        setNewSubAccount(newSubAccount);
        setCurrencies(null);
    }

    const search = (value) => setSearched(searchCurrency(value, currencies));

    const change = () => {
        setMainCurrency(null);
        fetchCurrencies();
        setSearched([]);
    }

    const addNewSubAccount = async () => {
        if(inputValue.current.value){
            newSubAccount.spread = Number(inputValue.current.value.replace(',', '.'));
        }
        setNewSubAccount(newSubAccount);
        userData.subAccounts.push(newSubAccount);
        setLoading(true);
        const response = await UserService.updateUser(userData.userToken, userData);
        if(response.data === 'updated'){
            setAlert('Subkonto dodano pomyślnie');
            handleSuccess();
        } else {
            setAlert(['Ups! coś poszło nie tak', 'error']);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCurrencies();
    }, [])


    return(
        <div>
            <h2>Dodaj subkonto</h2>
            {currencies ? <>
                <FormInput placeholder='Wyszukaj walutę' onChange={(e) => search(e.target.value)}/>
                <Currencies>
                    { currencies.map((currency, index) => 
                        searched.includes(index) || searched.length === 0 ? <CurrencyOption
                            loading={loading}
                            key={index}
                            currency={currency} 
                            handleClick={handlePickedCurrency}
                        /> : null
                    ) }
                </Currencies>
                </>
                : loading && !mainCurrency ? <Loader /> : null }
            {mainCurrency ? <>
                <div>
                    <CurrencyOption currency={mainCurrency} check={true} handleClick={change} />
                    <label htmlFor="spread">spread w PLN</label>
                    <FormInput ref={inputValue} placeholder={newSubAccount.spread.toFixed(4)} name="number" />
                </div>
                <StyledButton
                    style={{marginTop: '15px'}}
                    XL center
                    disabled={!mainCurrency || loading}
                    onClick={() => addNewSubAccount()}

                >{loading && mainCurrency ? 'Przetwarzam...' : 'Dodaj'}</StyledButton>
            </> : null}
        </div>
    )
}

export default AddSubAccount;