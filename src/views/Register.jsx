import React, { useEffect } from 'react';
import styled from 'styled-components';
import Form from '../components/register/Form';
import Currency from '../components/register/Currency';
import Summary from '../components/register/Summary';
import { useParams } from 'react-router-dom';
import { setThemeMode } from '../helpers/helper';

const Register = () => {

    const param = useParams();
    const step = Number(param.step);
    useEffect(() => window.scrollTo(0,0),[step])

    setThemeMode('light');
    
    return(
        <RegisterWrapper>
            <header>
                <h1>{step === 4 ? `Sukces` : `Krok ${step} z 3`}</h1>
                <DotsWrapper>
                    <Dot className={step > 1 ? 'done' : step === 1 ? 'progress' : ''}>1</Dot>
                    <Dot className={step > 2 ? 'done' : step === 2 ? 'progress' : ''}>2</Dot>
                    <Dot className={step > 3 ? 'done' : step === 3 ? 'progress' : ''}>3</Dot>
                </DotsWrapper>
            </header>
            {step === 1 ? <Form value="name" step={step} /> : null}
            {step === 2 ? <Form value="email" step={step} /> : null}
            {step === 3 ? <Currency step={step} /> : null}
            {step === 4 ? <Summary step={step} /> : null}
        </RegisterWrapper>
    )

}

const RegisterWrapper = styled.div`
    min-height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 20px 70px 20px;

    h3{
        padding: 0 20px;
        margin: 0;
        font-size: 50px;
        text-align: center;
    }
    header{
        div{
            padding: 20px;
        }
    }

`

const Dot = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    text-align: center;
    font-size: 25px;
    line-height: 15px;
    background: #ffffff;

    &.done{
        box-shadow: 0px 0px 35px 0px rgba(0, 200, 15, 1);
        background: rgba(0, 200, 15, 1);
        color: rgba(0, 200, 15, 1);
        position: relative;
        &::after{
            content: 'L';
            position: absolute;
            color: #ffffff;
            font-size: 30px;
            right: 17px;
            top: calc(50% - 10px);
            font-weight: 600;
            transform: rotate(45deg) scaleX(-1);
        }
    }
    &.progress{
        box-shadow: 0px 0px 35px 0px #8AD1EE;
        background: #8AD1EE;
        color: #ffffff;
    }
`
const DotsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    &::before{
        content: '';
        position: absolute;
        width: calc(100% - 40px);
        z-index: -1;
        height: 2px;
        background: black;
        top: calc(50% - 1px);
    }
`

export default Register;