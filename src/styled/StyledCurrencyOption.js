import styled from 'styled-components';

export const StyledCurrencyOption = styled.div`
    font-size: 30px;
    line-height: 20px;
    border-radius: 15px;
    border: 1px solid #8AD1EE;
    margin: 10px 5px;
    position: relative;
    padding: 20px;
    max-width: 30%;

    &.long{
        max-width: initial;
        margin: 20px 5px;
    }
    span{
        font-size: 15px;
        text-align: center;
        color: var(--currency-option-span-color);
        line-height: 10px;
        word-break: break-word;
    }

    .check{
        width: 15px;
        height: 15px;
        padding: 20px;
        border-radius: 50%;
        background: var(--red);
        box-shadow: var(--red-shadow);
        position: absolute;
        right: 15px;
        top: calc(50% - 27.7px);
        &::after{
            content: 'USUŃ';
            position: absolute;
            color: #ffffff;
            font-size: 13px;
            top: calc(50% - 10px);
            left: 50%;
            font-weight: 600;
            transform: translateX(-50%);
        }
    }
`

export const Currencies = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

`