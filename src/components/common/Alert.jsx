import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const Alert = ({ closeAlert, alert }) => {

    const [closeAnimation, setCloseAnimation] = useState(false);

    const alertObject = {
        text: typeof alert === 'string' ? alert : alert[0],
        type: typeof alert === 'string' ? null : alert[1]
    }
    
    useEffect(() => {
        setTimeout(() => {
            setCloseAnimation(true);
        }, 2500)

        setTimeout(() => {
            closeAlert();
        }, 3000)
    },[closeAlert]);

    const handleCloseAlert = () => {
        setCloseAnimation(true);
        setTimeout(() => {
            closeAlert();
        }, 500)
    }

    return(
        <StyledAlert
            className={closeAnimation ? `animate ${alertObject.type}` : `${alertObject.type}`}
            onClick={() => handleCloseAlert()}>
            <h3>{ alertObject.text }</h3>
        </StyledAlert>
    )
}

const StyledAlert = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    width: 90vw;
    max-width: 400px;
    max-height: 150px;
    border-radius: 20px;
    padding: 15px;
    box-sizing: border-box;
    background: var(--green);
    box-shadow: var(--green-shadow);
    color: var(--white);
    z-index: 10;

    h3{
        margin: 0;
        text-align: center;
    }

    &.error{
        background: var(--red);
        box-shadow: var(--red-shadow);
    }

    animation: appear .5s ease-in-out forwards;
    @keyframes appear {
        0%{
            transform: translate(-50%, -300px);
        }
        80%{
            transform: translate(-50%, 20px);
        }
        100%{
            transform: translate(-50%, 0);
        }
    }

    &.animate{
        animation: disappear .5s ease-in-out forwards;
    }
    @keyframes disappear {
        0%{
            transform: translate(-50%, 0);
        }
        20%{
            transform: translate(-50%, 20px);
        }
        100%{
            transform: translate(-50%, -300px);
        }
    }
`

export default Alert;