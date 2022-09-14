import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserService from '../../services/UserService';
import axios from 'axios';
import { env } from '../../helpers/enviroment';
import { FormInput } from '../../styled/StyledInput';
import { StyledButton } from '../../styled/StyledButton';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../Root';

const Settings = ({ userData, handleSuccess }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
    const [rawData, setRawData] = useState(null);

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

    const handleInput = (value, property) => {
        userData[property] = value;
    }

    const deleteAccount = async (e, token) => {
        e.preventDefault();
        if(deleteConfirmed){
            await UserService.deleteUser(token);
            navigate(`/`);
        } else {
            setDeleteConfirmed(true);
        }
    }

    useEffect(() => {
        const fetchRawData = async () => {
            const raw = await axios.get(`${env.getEndpoint}/${userData.userToken}.json?ts=${Math.random()}`)
            setRawData(raw.data);
        }

        fetchRawData()
    },[userData.userToken])

    return(
        <StyledForm>
            <h1>Ustawienia konta</h1>
            <div className="settings-wrapper">
                <label htmlFor='name'>Imię, nick</label>
                <FormInput name='name' placeholder={userData.name} onChange={(e) => handleInput(e.currentTarget.value, 'name')} />
                <label htmlFor='name'>email</label>
                <FormInput name='name' placeholder={userData.email} onChange={(e) => handleInput(e.currentTarget.value, 'email')} />
            </div>
            <h3>Twoje dane są zaszyfrowane w taki sposób, że nawet nie jesteśmy w stanie ich odszyfrować. Nie wierzysz nam? Zobacz sam jak wygląda ich część:</h3>
            <p>{rawData}</p>
            {deleteConfirmed ? <h5>Potwierdź usunięcie konta!</h5> : null}
            <StyledButton center className='delete' onClick={(e) => deleteAccount(e, userData.userToken)}>{deleteConfirmed ? 'Potwierdzam' : 'Usuń Konto'}</StyledButton>
            <StyledButton center XL onClick={(e) => save(e)} disabled={loading}>{loading ? 'Przetwarzam...' : 'Zapisz'}</StyledButton>
        </StyledForm>
    )


}

export const StyledForm = styled.form`
    div.settings-wrapper{
        margin: 30px 0;

        & > div{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            button{
                margin: 2px 0;
            }
        }
    }

    h5{
        color: red;
        text-align: center;
        font-size: 20px;
    }

    p{
        line-break: anywhere;
        color: red;
        max-height: 20px;
        overflow: auto;
    }

    button.delete{
        background-color: red;
        margin-bottom: 20px;
    }
`

export default Settings;