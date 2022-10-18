import React from 'react';
import styled from 'styled-components';
import Loader from '../Loader';

const LoadingSign = () => {

    return(
        <LoadingSignContainer>
            <Loader />
            <p>ładuję...</p>
        </LoadingSignContainer>
    )
}

const LoadingSignContainer = styled.div`
    position: fixed;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    max-height: 40px;
    min-height: 40px;
    border-radius: 15px;
    box-shadow: 0px 10px 10px -8px var(--black-loading);
    z-index: 9;
    & > div {
        transform: scale(0.6);

        & > div.lds-ellipsis{
            top: -32px;
            & > div {
                background: var(--black) !important;
            }
        }
    }

    animation: appearloading .2s .5s forwards, expand .2s 2s forwards;

    @keyframes appearloading{
        0%{
            transform: translate(-50%, 0px);
            height: intial !important;

        }
        80%{
            transform: translate(-50%, 105px);
            height: intial !important;

        }
        100%{
            transform: translate(-50%, 100px);
            height: intial !important;

        }
    }

    @keyframes expand{
        0%{
            max-height: 40px;
            width: 80px;
            p{opacity: 0;}
        }
        80%{
            max-height: 65px;
            width: 105px;
        }
        100%{
            max-height: 60px;
            width: 100px;
        }
    }

    background: var(--black-loading);

    p{
        animation: opacity .5s 2s forwards;
        position: absolute;
        opacity: 0;
        top: 15px;
        width: 100%;
        text-align: center;
        font-size: 15px;
    }
    @keyframes opacity{
        0%{
            opacity: 0;
        }

        100%{
            opacity: 1;
        }
    }


`

export default LoadingSign;