import React, { useContext, useState } from 'react';
import ColorPicker from '../../components/common/ColorPicker';
import styled from 'styled-components';
import UserService from '../../services/UserService';
import { FormInput } from '../../styled/StyledInput';
import { StyledArrow, StyledButton } from '../../styled/StyledButton';
import { AlertContext } from '../../Root';
import CustomCurrencyRate from '../common/CustomCurrencyRate';

const EditSubAccounts = ({ userData, handleSuccess }) => {

    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(0);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
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

    return(
        <StyledEditSubAccounts>
            <h1>Edytuj właściwości subkont</h1>
            {subAccounts.map((subAccount, index) => {
                return <div className="currency-settings" key={index}>
                    <div className="header">
                        <h3>{subAccount.currency.name} ({subAccount.currency.code})</h3>
                        {expanded !== index ? <StyledArrow onClick={() => setExpanded(index)} /> : null}
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
                </div>
            })}
            <StyledButton
                className="save"
                center
                XL
                onClick={(e) => save(e)} disabled={loading}
            >{loading ? 'Przetwarzam...' : 'Zapisz'}</StyledButton>
        </StyledEditSubAccounts>
    )

}

const StyledEditSubAccounts = styled.div`

    & > div.currency-settings{
        box-shadow: var(--link-box-shadow);
        padding: 10px 20px;
        border-radius: 20px;
        margin: 10px 0;

        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        div.collapse-section{
            max-height: 900px;
            overflow: hidden;
            transition: max-height .4s;
            &.collapsed{
                max-height: 0;
            }
        }

        h3{
            font-weight: bold;
            margin: 10px 0;
        }
    }

    button.save{
        margin-top: 20px;
    }
`

export default EditSubAccounts;