import React, { useContext, useState } from 'react';
import ColorPicker from '../../components/common/ColorPicker';
import styled from 'styled-components';
import UserService from '../../services/UserService';
import CustomCurrencyRate from '../common/CustomCurrencyRate';
import { FormInput } from '../../styled/StyledInput';
import { StyledArrow, StyledButton, StyledEdit, StyledDelete } from '../../styled/StyledButton';
import { AlertContext } from '../../Root';

const EditSubAccounts = ({ userData, handleSuccess, addSubaccount }) => {

    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
    const [edit, setEdit] = useState(false);
    const subAccounts = userData.subAccounts;

    const save = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await UserService.updateUser(userData.userToken, userData);
        if(response.data === 'updated'){
            setAlert('Zaktualizowano');
            handleSuccess(true);
        } else {
            setAlert(['Ups! coś poszło nie tak', 'error']);
        }
        setLoading(false);
    }

    const handleSubAccountInput = (value, index, property) => {
        subAccounts[index][property] = Number(value.replace(',', '.'));
    }

    const handleDeleteSubAccount = async (index) => {
        if(subAccounts.length !== 1){
            subAccounts.splice(index, 1);
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

    return(
        <StyledEditSubAccounts>
            <h1>Edytuj subkonta</h1>
            <p className={edit ? 'visible' : 'hidden'}>po usunięcia subkonta, automatycznie ustawimy pierwsze subkonto jako domyślne</p>
            <span className="flex">
                {expanded === null ? <StyledEdit onClick={() => setEdit(!edit)}>{edit ? 'Gotowe' : 'Edycja'}</StyledEdit> : null}
            </span>
            {subAccounts.map((subAccount, index) => {
                return <div className={`currency-settings ${edit ? 'edit' : ''}`} key={index}>
                    <div className="header">
                        <h3>{subAccount.currency.name} ({subAccount.currency.code})</h3>
                        {!edit ? 
                            expanded !== index ?
                                <StyledArrow onClick={() => setExpanded(index)} down />
                            :
                                <StyledArrow onClick={() => setExpanded(null)} up />
                        : null}
                    </div>
                    <div className={`collapse-section ${expanded === index ? '' : 'collapsed'}`}>
                        <label htmlFor="name">spread w PLN</label>
                        <FormInput 
                            name="number"
                            type="number"
                            placeholder={subAccount.spread.toFixed(4)}
                            onChange={(e) => handleSubAccountInput(e.currentTarget.value, index, 'spread')}
                        />
                        <CustomCurrencyRate subAccount={subAccount} />
                        <ColorPicker subAccount={subAccount} />
                    </div>
                    {edit ?
                        <StyledDelete 
                            onClick={() => handleDeleteSubAccount(index)}
                        >usuń</StyledDelete>
                    : null}
                </div>
            })}
            <StyledButton className="add-btn" primary center XL onClick={() => addSubaccount()}>Dodaj subkonto</StyledButton>
            <StyledButton
                className="save"
                center
                onClick={(e) => save(e)} disabled={loading}
            >{loading ? 'Przetwarzam...' : 'Zapisz nowe ustawienia'}</StyledButton>
        </StyledEditSubAccounts>
    )

}

const StyledEditSubAccounts = styled.div`
    span.flex{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 10px 0 20px;
    }
    p{
        margin: 0;
        overflow: hidden;
        transition: max-height .5s, ease-in-out opacity .3s;
        max-height: 70px;
        opacity: 1;
        &.hidden{
            max-height: 0;
            opacity: 0;
        }
    }
    & > div.currency-settings{
        box-shadow: var(--link-box-shadow);
        padding: 15px 20px;
        border-radius: 20px;
        margin: 10px 0;
        transition: transform .5s ease-in-out;
        &.edit{
            transform: translateX(-60px);
        }

        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        div.collapse-section{
            max-height: 900px;
            overflow: hidden;
            transition: max-height .4s ease-in-out;
            &.collapsed{
                max-height: 0;
            }
        }

        h3{
            font-weight: bold;
            margin: 10px 0;
        }
    }
    button.add-btn{
        margin: 20px auto;
    }
`

export default EditSubAccounts;