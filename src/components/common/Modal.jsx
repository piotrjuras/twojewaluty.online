import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledArrow, StyledButton } from '../../styled/StyledButton';

const Modal = ({ closeModal,
                initCloseModal,
                backButton,
                children }) => {

    const [closeAnim, setCloseAnim] = useState(null);

    const animateCloseModal = () => {
        setCloseAnim('close-animation');
        setTimeout(() => {
            closeModal();
        }, 500);
    }

    useEffect(() => {
        if(initCloseModal) animateCloseModal();
    },[initCloseModal]); // eslint-disable-line

    return(
        <StyledModal className={closeAnim}>
            <StyledArrow onClick={() => animateCloseModal()} className="rotate" down />
            <div className='wrapper'>
                { children }
            </div>
            { backButton ? <StyledButton primary center onClick={() => animateCloseModal()} >Zamknij</StyledButton> : null }  
        </StyledModal>
    )
}

const StyledModal = styled.section`
    position: fixed;
    width: 100vw;
    bottom: calc(-100vh - 10px);
    left: 0;
    background: var(--white);
    color: var(--black);
    flex-direction: column;
    box-shadow: var(--modal-box-shadow);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding-bottom: 30px;
    z-index: 1;
    overflow: auto;
    max-height: calc(90vh - 70px);

    button.rotate{
        position: absolute;
        top: 20px;
        right: 20px;
    }
    div.wrapper{
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;

        h1,h2{
            margin: 10px 25px 10px 0;
            font-size: 25px;
        }
        h3{
            font-weight: normal;
        }

        &.hidden *{
            opacity: 0;
        }
    }

    animation: slide-in .5s ease-in-out forwards;

    &.close-animation{
        animation: slide-out .5s ease-in-out forwards;
    }

    @keyframes slide-in{
        0% {
            transform: translateY(0);
        }
        80% {
            transform: translateY(calc(-100vh - 10px));
        }
        100% {
            transform: translateY(-100vh);
        }
    }

    @keyframes slide-out{
        from {
            transform: translateY(-100vh);
        }
        to {
            transform: translateY(0);
        }
    }
`

export default Modal;