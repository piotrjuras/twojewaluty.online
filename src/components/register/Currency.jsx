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
import { searchCurrency } from '../../helpers/helper';

const Currency = ({ step }) => {

    const inputValue = useRef();
    const navigate = useNavigate();
    const [currencies, setCurrencies] = useState(null);
    const [mainCurrency, setMainCurrency] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [askModal, setAskModal] = useState(false);
    const [searched, setSearched] = useState([]);
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
        setSearched([]);
    }

    const search = (value) => setSearched(searchCurrency(value, currencies));

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
            setAlert(['co?? posz??o nie tak', 'error']);
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
            Wybierz swoj?? walut?? oraz domy??lny spread dla niej <AskButton style={{marginTop: '0'}} onClick={(e) => setAskModal(true)} />
        </h2>
        {askModal ? 
            <Modal backButton closeModal={() => setAskModal(false)}>
                <h2>Co to jest spread?</h2>
                <p>Spread to r????nica mi??dzy kursem kupna a sprzeda??y waluty. Mo??esz ustawi?? go teraz lub p????niej w ustawieniach. Podczas kupna lub sprzeda??y waluty mo??esz r??cznie ustali?? kurs, po kt??rym ma odby?? si?? ta transakcja</p>
            </Modal>
        : null}
        {modal ? 
                <Modal closeModal={() => setModal(false)}>
                <h2>Wybierz walut??</h2>
                {currencies ? <>
                    <FormInput placeholder='Wyszukaj walut??' onChange={(e) => search(e.target.value)} />
                    <Currencies>
                        { currencies.map((currency, index) => 
                            searched.includes(index) || searched.length === 0 ? 
                            <CurrencyOption
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
                        <FormInput name="spread" ref={inputValue} placeholder={formModel.subAccounts[0].spread.toFixed(4)} />
                    </div>
                    <StyledButton
                        style={{marginTop: '15px'}}
                        XL center
                        disabled={!mainCurrency || loading}
                        onClick={() => handleRegister(formModel.userToken, formModel.email, formModel)}
    
                    >{loading && mainCurrency ? 'Przetwarzam...' : 'Zarejetruj si??'}</StyledButton>
                </> : null}
            </Modal>
        : null}
        <StyledButton XL center onClick={() => {
            setModal(true);
            setSearched([]);
        }}>Dodaj domy??ln?? walut??</StyledButton>
        </InputView>

    )

}

export default Currency;