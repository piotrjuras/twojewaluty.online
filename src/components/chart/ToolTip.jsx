import React from 'react';
import styled from 'styled-components';

const ToolTip = ({ active, payload, label }) => {
    
    if(active && payload) return(
        <StyledToolTip>
            <p><b>{payload[0].payload.value}</b></p>
            <p>{payload[0].payload.name}</p>
        </StyledToolTip>
    )
}

const StyledToolTip = styled.div`
    color: var(--black);
    outline: none;
    p{
        margin: 0;
    }
`
export default ToolTip;