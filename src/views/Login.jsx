import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { images } from '../images/images';
import { StyledButton } from '../styled/StyledButton';
import { FormInput } from '../styled/StyledInput';
import { setThemeMode } from '../helpers/helper';


const Login = () => {

    const [token, setToken] = useState(null);

    setThemeMode('light');

    return(
        <LoginWrapper>
            <h1>Witaj,</h1>
            <img src={ images.currency } alt="hero-img"/>
            <div>
                <h2>zaloguj się przy pomocy swojego indywidualnego tokena</h2>
                <FormInput type="text" placeholder="token" onChange={(e) => setToken(e.currentTarget.value)} />
                <Link to={`/user/${token}`}>
                    <StyledButton center XL disabled={!token?.length}>Zaloguj się</StyledButton>
                </Link>
            </div>
        </LoginWrapper>
    )

}

const LoginWrapper = styled.div`
    min-height: calc(100vh - 90px);
    padding: 20px 20px 70px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img{
        object-size: contain;
        object-position: center;
        max-width: 300px;
        margin: auto
    }
    button{
        margin-top: 30px;
    }
`



export default Login;