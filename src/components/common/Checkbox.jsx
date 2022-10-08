import React from 'react';
import styled from 'styled-components';

export const Checkbox = ({ name, label, value, checked = true }) => {

    return(
        <StyledCheckbox className="custom-checkbox">
            <input type='checkbox' name={name} checked={checked} onChange={(e) => {
                e.stopPropagation();
                value(e.target.checked);
            }} />
            <label htmlFor={name}>{ label }</label>
        </StyledCheckbox>
    )
}

const StyledCheckbox = styled.div`
&{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
input[type="checkbox"] {
    appearance: none;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border: 1px solid #EEEEEE;
    border-radius: 1px;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
}
  
input[type="checkbox"]::before {
    content: "";
    width: 20px;
    height: 20px;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--blue);
    background-color: var(--blue);
}
  
input[type="checkbox"]:checked::before {
    transform: scale(1);
}
  
input[type="checkbox"]:disabled {  
    color: var(--blue);
    cursor: not-allowed;
}
`