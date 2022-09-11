import styled from 'styled-components';

export const FormInput = styled.input`
    border: 1px solid #EEEEEE;
    border-radius: 20px;
    width: calc(100% - 52px);
    background: var(--white);
    color: var(--black);
    display: flex;
    margin: 10px auto;
    height: 60px;
    line-height: 60px;
    font-size: ${props => props.XL ? '30px' : '25px'};
    outline: none;
    padding: ${props => props.XL ? '0px 20px 5px' : '0 25px 2px'};

    &::placeholder{
        color: var(--placeholder-black);
    }
`
