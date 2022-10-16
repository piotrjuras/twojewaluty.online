import styled from 'styled-components';

export const StyledButton = styled.button`

    padding: ${props => props.XL ? '18px 30px 20px 30px' : '13px 25px 15px 25px'};
    font-size: ${props => props.XL ? '18px' : '16px;'};
    font-weight: 600;
    color: ${props => props.primary ? '#FFFFFF' : '#FFFFFF'};
    outline: none;
    background: ${props => props.primary ? 'var(--primary-blue)' : 'var(--blue)'};
    border: none;
    display: ${props => props.center ? 'flex' : null};
    margin: ${props => props.center ? 'auto' : null};
    border-radius: 20px;
    letter-spacing: .6px;
    line-height: 20px;

    &[disabled]{
        opacity: 0.5;
    }

`
export const StyledEdit = styled.button`
    border: none;
    background: none;
    color: var(--blue);
    font-size: 15px;
    font-weight: 600;
`

export const StyledDelete = styled.button`
    height: 100%;
    border-radius: 15px;
    border: none;
    padding: 30px 15px;
    background: red;
    color: white;
    font-size: 13px;
    font-weight: 700;
    line-height: 0px;
    position: absolute;
    right: -70px;
    top: 0;
`

export const StyledArrow = styled.button`
    position: relative;
    width: 15px;
    height: 25px;
    padding: 20px;
    background: inherit;
    border: none;

    &:after{
        content: '';
        width: 10px;
        height: 10px;
        border-right: 4px solid ${props => props.color ? props.color :'var(--black)'};
        border-top: 4px solid ${props => props.color ? props.color :'var(--black)'};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &[disabled]{
        opacity: 0.5;
    }

    ${props => props.back ? 'transform: rotate(180deg)' : ''}
    ${props => props.down ? 'transform: rotate(90deg)' : ''}
    ${props => props.up ? 'transform: rotate(-90deg)' : ''}

`

export const LinkButton = styled.button`
    width: 100%;
    background: none;
    border: none;
    padding: 15px 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    color: var(--black);
    box-shadow: var(--link-box-shadow);
    border-radius: 20px;
`

export const OptionButton = styled.button`

`

export const AskButton = styled.button`
    width: 25px;
    height: 25px;
    border: none;   
    background: var(--primary-blue);
    border-radius: 50%;
    margin: 0 0 0 0;
    position: relative;

    &:after{
        content: '?';
        position: absolute;
        font-size: 12px;
        font-weight: bold;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export const UserIcon = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--blue);
    border: none;
    color: white;
    font-weight: 400;
    line-height: 50px;
    font-size: 20px;
`

export const DetailsButton = styled.button`
    box-shadow: var(--link-box-shadow);
    outline: none;
    padding: 15px 10px;
    background: inherit;
    border: none;
    margin: 10px;
    color: var(--black);
    font-size: 15px;
    font-weight: bolder;
    border-radius: 5px;
`