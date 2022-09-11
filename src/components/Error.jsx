import React from 'react';
import styled from 'styled-components';
import { images } from '../images/images';
import { StyledButton } from '../styled/StyledButton';
import { setThemeMode } from '../helpers/helper';

const Error = ({ error, children, buttonText }) => {
    
    setThemeMode('light');

    return(
        <StyledError>
            <h1>{ error }</h1>
            <img src={ images.error } alt="img" />
            <div>
                <p>{ children }</p>
                <a href={`/`}>
                    <StyledButton XL center>{buttonText ? buttonText : 'Wróć na początek'}</StyledButton>
                </a>
            </div>
        </StyledError>
    )
}

const StyledError = styled.div`
    padding: 20px 20px 70px;
    min-height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 400px;
    margin: auto;

    img{
        width: 100vw;
        max-width: 400px;
        margin: 0 -20px;
    }

    div{
        button{
            margin-top: 40px;
        }
    }

`
export default Error;