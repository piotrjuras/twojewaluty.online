import React, { useContext } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../../styled/StyledButton';
import { textToClipboard } from '../../helpers/helper';
import { AlertContext } from '../../Root';
import { useParams } from 'react-router-dom';

const Sharesheet = () => {

    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
    const params = useParams();

    const copy = (value, label) => {
        try{
            textToClipboard(value);
            setAlert(`${label} skopiowany do schowka`);
        } catch(error) {
            setAlert(['Ups, coś poszło nie tak :(', 'error']);
        }
    }

    const share = (item) => {
        switch (item) {
            case 'application':
                    copy(window.location.origin, 'link');
                break;
        
            case 'account':
                    copy(window.location.href, 'link');
                break;

            case 'token':
                    copy(params.token, 'token');
                break;

            default:
                break;
        }
    }

    return(
        <StyledSharesheet>
            <h1>Udostępnij</h1>
            <StyledButton primary width100 onClick={() => share('application')}>Udostępnij aplikację</StyledButton>
            <StyledButton width100 onClick={() => share('account')}>Udostępnij swoje konto</StyledButton>
            <StyledButton width100 onClick={() => share('token')}>Udostępnij swój token</StyledButton>
        </StyledSharesheet>
    )
}

const StyledSharesheet = styled.section`
    button{
        margin: 5px 0;
    }
`

export default Sharesheet;