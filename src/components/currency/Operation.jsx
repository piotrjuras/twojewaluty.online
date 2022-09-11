import React, { useContext, useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import Modal from '../common/Modal';
import { UserContext, AlertContext } from '../../Root';
import { StyledButton } from '../../styled/StyledButton';
import { FormInput } from '../../styled/StyledInput';
import { useNavigate } from 'react-router-dom';
import { getSpread } from '../../helpers/helper';

const Operation = ({ currency, spread, modal, closeModal }) => {

    const buyValue = getSpread(currency.todaysRate.mid, spread, 'buy');
    const sellValue = getSpread(currency.todaysRate.mid, spread, 'sell');
    const buyModal = modal === 'buy' ? true : false;
    const [userData, setUserData] = useContext(UserContext); // eslint-disable-line
    const [inputValue, setInputValue] = useState(0);
    const [course, setCourse] = useState(modal === 'buy' ? buyValue : sellValue);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subZero, setSubZero] = useState(false);
    const navigate = useNavigate();
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    const account = userData.subAccounts[userData.mainAccount];

    const submitHandler = async (amount, value) => {
        setLoading(true);
        const obj = {
            amount: amount,
            type: buyModal ? 'bought' : 'sold',
            value: value,
            date: new Date().toUTCString()
        }
        account.history.push(obj);
        if(buyModal){
            account.invested += Number(course*amount);
            account.balance += Number(amount);
            account.spentAmount += Number(course*amount);
        } else {
            account.invested -= Number(course*amount);
            account.balance -= Number(amount);
            account.gainedAmount += Number(course*amount);
        }
        const response = await UserService.updateUser(userData.userToken, userData);
        if(response.data === 'updated'){
            setAlert(buyModal ? `Zakup: ${amount+currency.code}` : `Sprzedaż: ${amount+currency.code}`);
            setSuccess(true);
        } else {
            setAlert(['Ups! coś poszło nie tak', 'error']);
        }
        navigate(`/user/${userData.userToken}/reload`);
        setLoading(false);
    }

    useEffect(() => {
        (account.balance - Number(inputValue) < 0 || account.balance === 0) ? setSubZero(true) : setSubZero(false);
    },[inputValue, account.balance])

    useEffect(() => {
        if(!course.length) setCourse(modal === 'buy' ? buyValue : sellValue);
    },[course, modal, buyValue, sellValue]);

    return (
        <Modal closeModal={closeModal} initCloseModal={success}>
            <h1>{buyModal ? `kupujesz` : `sprzedajesz`}</h1>
            <FormInput
                placeholder={`${inputValue} ${currency.code}`}
                type="number" 
                onChange={(e) => setInputValue(e.currentTarget.value)}
                disabled={loading}
            />
            <h3>po</h3>
            <FormInput
                placeholder={`${course} PLN`}
                type="number" 
                onChange={(e) => setCourse(e.currentTarget.value)}
                disabled={loading}
            />
            <h2>{buyModal ? 'Koszt' : 'Zysk'}: {(inputValue * course).toFixed(2)} PLN</h2>
            <StyledButton XL 
                onClick={() => submitHandler(inputValue, course)}
                disabled={loading || (!buyModal && subZero)}
            >
                {loading ? `Przetwarzam...` : `${buyModal ? 'Kup' : 'Sprzedaj'}`}
            </StyledButton>
        </Modal>
    )
}

export default Operation;