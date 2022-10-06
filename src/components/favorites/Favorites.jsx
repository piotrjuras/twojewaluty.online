import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Currency from '../currency/Currency';
import Modal from '../common/Modal';
import Loader from '../Loader';
import CurrencyOption from '../../components/common/CurrencyOption';
import CurrencyService from '../../services/CurrencyService';
import UserService from '../../services/UserService';
import { StyledButton, StyledEdit } from '../../styled/StyledButton';
import { Currencies } from '../../styled/StyledCurrencyOption';
import { AlertContext } from '../../Root';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../styled/StyledInput';
import { searchCurrency } from '../../helpers/helper';

const Favorites = ({ data }) => {

    const navigate = useNavigate();
    const [addModal, setAddModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState([]);
    const [availableCurrencies, setAvailableCurrencies] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    const fetchCurrencies = async () => {
        const currencies = await CurrencyService.getAvailableCurrencies();
        setAvailableCurrencies(currencies.data[0].rates);
    }

    const handlePickedCurrency = async (currency) => {
        setLoading(true);
        const newFavorites = {
            code: currency.code,
            currency: currency.currency
        }
        data.favorites.push(newFavorites);
        const response = await UserService.updateUser(data.userToken, data);
        if(response.data === 'updated'){
            setAlert(`Dodano do ulubionych: ${currency.code}`);
            setSuccess(true);
        } else {
            setAlert(['Ups! coś poszło nie tak', 'error']);
        }
        navigate(`/user/${data.userToken}/reload`);
        setLoading(false);
    }

    const search = (value) => setSearched(searchCurrency(value, availableCurrencies));

    const checkifExists = (data, currency) => {
        let exists = true;
        data.favorites.forEach(item => {
            if(item.code === currency.code) exists = false;
        });
        return exists;
    }

    useEffect(() => {
        if(addModal){
            fetchCurrencies();
            setSearched([]);
        };
    },[addModal])
    
    return(
        <StyledWatchlist className={editMode ? 'edit' : ''}>
            <span className='flex'>
                <h2>Oberwowane</h2>
                { data.favorites.length ? 
                    <StyledEdit onClick={() => setEditMode(!editMode)}>{editMode ? 'Gotowe' : 'Edycja'}</StyledEdit>
                : null }
            </span>
            {data.favorites.map((favorite, index) => 
                <Currency
                    key={index}
                    code={favorite.code}
                    buttons={false}
                    editMode={editMode}
                /> )}
            <StyledButton center onClick={() => setAddModal(true)}>Dodaj walutę</StyledButton>

            {addModal ? 
                <Modal 
                    closeModal={() => {
                        setAddModal(false);
                        setSuccess(false);
                    }}
                    initCloseModal={success}
                >
                    <h1>Dodaj nową walutę</h1>
                    {availableCurrencies ?
                        <Currencies>
                        <FormInput placeholder='Wyszukaj walutę' onChange={(e) => search(e.target.value)} />
                        {availableCurrencies.map((currency, index) => 
                            checkifExists(data, currency) && (searched.includes(index) || searched.length === 0) ? 
                                <CurrencyOption
                                    key={index}
                                    currency={currency} 
                                    handleClick={handlePickedCurrency}
                                    loading={loading}
                                />
                            : null
                        )} 
                        </Currencies> : <Loader />}
                </Modal> 
            : null}
        </StyledWatchlist>
    )
}

const StyledWatchlist = styled.section`
    .flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    & > div{
        transition: .3s transform ease-in-out;

    }
    &.edit > div{
        transform: translateX(-60px);
    }
`

export default Favorites;