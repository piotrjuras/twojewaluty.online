import React, { useState } from 'react';
import Modal from '../components/common/Modal';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AskButton, StyledButton } from '../styled/StyledButton';
import { images } from '../images/images';
import { setThemeMode } from '../helpers/helper';


const Hero = () => {

    const [modal, setModal] = useState(false);
    const [cookieModal, setCoockieModal] = useState(!sessionStorage.getItem('cookie'));
    
    setThemeMode('light');

    return(
        <HeroWrapper>
            <img src={images.hero} alt="hero-img"/>
            <div>
                <h1>Witamy w aplikacji twojewaluty <AskButton onClick={() => setModal(true)} /></h1>
                <Link to={'/login'}>
                    <StyledButton primary center XL>Zaloguj</StyledButton>
                </Link>
                <p>- lub -</p>
                <Link to={'/register/1'}>
                    <StyledButton center XL>Zarejestruj się</StyledButton>
                </Link>
            </div>
            {modal ? <Modal backButton closeModal={() => setModal(false)}>
                    <h2>Co to jest twojewaluty.online?</h2>
                    <p>Jest to aplikacja pozwalająca na śledzenie kursów walut, symulowania ich kupna i sprzedaży, oraz symulowania potencjalnych zysków. Dane dotyczące kursów walut pobierane są z Narodowego Banku Polskiego. Kursy pochodzą z tabeli A i aktualizowane są w kazdy dzień roboczy około godziny 11:00</p>
                </Modal> : null}

            {cookieModal ? <Modal backButton closeModal={() => {
                setCoockieModal(false);
                sessionStorage.setItem('cookie', false);
                }}>
                    <h2>Szanujemy Twoją prywatność</h2>
                    <p>Ta aplikacja nie wykorzystuje ciasteczek. Nie badamy Twojej aktywności, nie analizujemy tego kiedy i z jakiego urządzenia się logowałeś. Cieszymy się, ze jestes naszym użytkownikiem i <b>nie inwigilujemy Cię</b> na możliwym każdym kroku. Obiecujemy!</p>
                </Modal> : null}
        </HeroWrapper>
    )

}

const HeroWrapper = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    p{
        text-align: center;
    }
    img{
        object-size: contain;
        object-position: center;
        max-width: 250px;
        margin-top: 50px;
    }
    section{
        p{
            text-align: left;
        }
    }

    & > div{
        margin: 20px;
        border-radius: 30px;
        padding: 10px 20px 30px 20px;
        box-shadow: var(--link-box-shadow);

    }
`

export default Hero;