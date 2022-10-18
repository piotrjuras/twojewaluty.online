import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';


const IconButton = ({ onClick, label, iconName, iconSize = 20 }) => {

    return <StyledIconButton onClick={(e) => onClick(e)}>
                <FontAwesomeIcon
                    style={{ fontSize: `${iconSize}px` }}
                    icon={icon[iconName]}
                /><br />
                    { label }
            </StyledIconButton>
}

const StyledIconButton = styled.button`
    box-shadow: var(--link-box-shadow);
    outline: none;
    padding: 15px 30px;
    background: inherit;
    border: none;
    margin: 0 4px;
    color: var(--black);
    font-size: 12px;
    border-radius: 20px;
    svg{
        margin: 5px;
    }
`

export default IconButton;