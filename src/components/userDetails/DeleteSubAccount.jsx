import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import UserService from '../../services/UserService';
import CurrencyOption from '../common/CurrencyOption';
import { AlertContext } from '../../Root';
import { StyledDelete, StyledEdit } from '../../styled/StyledButton';


const DeleteSubAccount = ({ userData, handleSuccess }) => {

    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
    const subAccounts = userData.subAccounts;


    const handleDeleteSubAccount = async (index) => {
        setConfirmDeleteIndex(null);
        if(userData.subAccounts.length !== 1){
            userData.subAccounts.splice(index, 1);
            userData.mainAccount = 0;
            const response = await UserService.updateUser(userData.userToken, userData);
            if(response.data === 'updated'){
                setAlert('subkonto zostało usunięte');
                handleSuccess(true);
            } else {
                setAlert(['Ups! coś poszło nie tak', 'error']);
            }
        } else {
            setAlert(['nie możesz usunąć tego konta!', 'error']);
        }
    }

    const confirmDeletion = (index) => {
        setConfirmDeleteIndex(index)
    }

    return (
        <StyledDeleteSubAccount>
            <h2>Usuń subkonto</h2>
            <p>jeśli usuniesz konto, automatycznie ustawimy pierwsze subkonto jako domyślne</p>
            <span className="flex">
                {confirmDeleteIndex !== null ? <StyledEdit onClick={() => setConfirmDeleteIndex(null)}>anuluj</StyledEdit> : null}
            </span>
            {subAccounts.map((subAccount, index) => {
                return  <div key={index} className={index === confirmDeleteIndex ? 'transform': ''}>
                            {index === confirmDeleteIndex ? 
                                <StyledDelete 
                                    onClick={() => handleDeleteSubAccount(index)}
                                >usuń</StyledDelete>
                            : null} 
                            <CurrencyOption
                                currency={subAccount.currency}
                                check
                                handleClick={() => confirmDeletion(index)}
                            />
                        </div>
            })}
        </StyledDeleteSubAccount>
    )
}

const StyledDeleteSubAccount = styled.div`
    margin: 20px 0 0;

    span.flex{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 20px 0;
    }
    & > div{
        transition: transform .3s ease-in-out;
        &.transform{
            transform: translateX(-60px);
        }
    }

`

export default DeleteSubAccount;