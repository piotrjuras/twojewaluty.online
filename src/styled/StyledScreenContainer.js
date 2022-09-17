import styled from 'styled-components';

export const StyledScreenContainer = styled.div`
    padding: 20px;
    min-height: calc(100vh - 40px);
    max-width: 400px;
    margin: auto;
    background: var(--white);

    header{
        display: flex;
        align-items: center;
    }

    &.animate-in{
        animation: slidein .35s ease-in-out;
    }

    &.animate-out{
        animation: slideout .35s ease-in-out;
    }

    @keyframes slideout{
        from{
            transform: translateX(0);
        }
        to{
            transform: translateX(100vw);
        }
    }

    @keyframes slidein{
        from{
            transform: translateX(100vw);
        }
        to{
            transform: translateX(0);
        }
    }
`
