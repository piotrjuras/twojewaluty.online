import styled from 'styled-components';

export const ViewContainer = styled.div`
    // max-width: 500px;
    // max-height: 1200px;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    overflow: hidden;
`

export const Flex = styled.div`
    display: flex;

    ${props => props.alignCenter ? 'align-items: center' : null};
    ${props => props.justifyCenter ? 'justify-content: center' : null};
    ${props => props.spaceEvenly ? 'justify-content: space-evenly' : null};


`