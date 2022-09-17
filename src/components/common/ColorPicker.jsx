import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../../styled/StyledButton';
import { generateRandomColor } from '../../helpers/helper';

const ColorPicker = ({ subAccount }) => {

    const [color, setColor] = useState(subAccount.cardColor);


    return(
        <StyledColorPicker>
            <div style={{ background: color ? color : 'var(--blue)' }}>
                <h3>Kolor Twojej walutowej karty poglądowej</h3>
                <StyledButton center primary onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newColor = generateRandomColor();
                    setColor(newColor);
                    subAccount.cardColor = newColor;
                }}>Losuj inny kolor</StyledButton>
            </div>
        </StyledColorPicker>
    )
}

const StyledColorPicker = styled.div`
    margin: 0 0 10px 0;

    h3{
        color: white;
        margin: 0;
    }

    & > div{
        width: 100%;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 200px;
        padding: 20px;
        box-sizing: border-box;
        button{
            margin: 10px auto;
        }
    }
`

export default ColorPicker;