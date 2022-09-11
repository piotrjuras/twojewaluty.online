import React, { useEffect, useState, useRef, useContext } from 'react';
import CurrencyService from '../../services/CurrencyService';
import Loader from '../Loader';
import CurrencyOption from '../../components/common/CurrencyOption';
import Modal from '../common/Modal';
import UserService from '../../services/UserService';
import { FormInput } from '../../styled/StyledInput';
import { AlertContext } from '../../Root';
import { InputView } from '../../styled/StyledInputView';
import { StyledButton, AskButton } from '../../styled/StyledButton';
import { Currencies } from '../../styled/StyledCurrencyOption';
import { useNavigate } from 'react-router-dom';
import { formModel } from '../../helpers/formData';
import { images } from '../../images/images';

const Currency = ({ step }) => {

    const inputValue = useRef();
    const navigate = useNavigate();
    const [currencies, setCurrencies] = useState(null);
    const [mainCurrency, setMainCurrency] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [askModal, setAskModal] = useState(false);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    const fetchCurrencies = async () => {
        setLoading(true);
        const currencies = await CurrencyService.getAvailableCurrencies();
        setLoading(false);
        setCurrencies(currencies.data[0].rates);
    }

    const handlePickedCurrency = (currency) => {
        formModel.subAccounts[0].currency.code = currency.code;
        formModel.subAccounts[0].currency.name = currency.currency;
        setMainCurrency(currency);
        setCurrencies(null);
    }

    const change = () => {
        setMainCurrency(null);
        fetchCurrencies();
    }

    const handleRegister = async (userToken, email, data) => {
        setLoading(true);
        if(inputValue.current.value){
            formModel.subAccounts[0].spread = Number(inputValue.current.value.replace(',', '.'));
        }
        const response = await UserService.setUser(userToken, email, data);
        if(response.data === 'created'){
            navigate('/register/4');
            setAlert('Rejestracja udana');
        } else {
            setAlert(['coś poszło nie tak', 'error']);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(!formModel.name || !formModel.email) navigate('/register/1');
        fetchCurrencies();
    }, [ navigate ])

    return (

        <InputView>
        <img src={ images.currency } alt="img" height="300px"  />
        <h2>
            Wybierz swoją walutę oraz domyślny spread dla niej <AskButton style={{marginTop: '0'}} onClick={(e) => setAskModal(true)} />
        </h2>
        {askModal ? 
            <Modal backButton closeModal={() => setAskModal(false)}>
                <h2>Co to jest spread?</h2>
                <p>Spread to różnica między kursem kupna a sprzedaży waluty. Możesz ustawić go teraz lub później w ustawieniach. Podczas kupna lub sprzedaży waluty możesz ręcznie ustalić kurs, po którym ma odbyć się ta transakcja</p>
            </Modal>
        : null}
        {modal ? 
                <Modal closeModal={() => setModal(false)}>
                <h2>Wybierz walutę</h2>
                {currencies ? 
                    <Currencies>
                        { currencies.map((currency, index) => 
                            <CurrencyOption
                                loading={loading}
                                key={index}
                                currency={currency} 
                                handleClick={handlePickedCurrency}
                            />
                        ) }
                    </Currencies>
                    : loading && !mainCurrency ? <Loader /> : null }
                {mainCurrency ? <>
                    <div>
                        <CurrencyOption currency={mainCurrency} check={true} handleClick={change} />
                        <label htmlFor="spread">spread w PLN</label>
                        <FormInput name="spread" ref={inputValue} placeholder={formModel.subAccounts[0].spread.toFixed(4)} />
                    </div>
                    <StyledButton
                        style={{marginTop: '15px'}}
                        XL center
                        disabled={!mainCurrency || loading}
                        onClick={() => handleRegister(formModel.userToken, formModel.email, formModel)}
    
                    >{loading && mainCurrency ? 'Przetwarzam...' : 'Zarejetruj się'}</StyledButton>
                </> : null}
            </Modal>
        : null}
        <StyledButton XL center onClick={() => setModal(true)}>Dodaj domyślną walutę</StyledButton>
        </InputView>

    )

}

export default Currency;