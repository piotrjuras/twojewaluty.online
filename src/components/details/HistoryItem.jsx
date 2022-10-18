import React from 'react';
import styled from 'styled-components';

const HistoryItem = ({ history, data }) => {

    const date = new Date(history.date);

    return(
        <StyledHistoryItem className={history.type === 'bought' ? 'green' : 'red'}>
            <p>{date.toLocaleString('pl-PL')}</p>
            <p>{history.type === 'bought' ? 'Kupiono' : 'Sprzedano'}: <b>{Number(history.amount).toFixed(2)} {data.currency.code}</b> po <b>{history.value} PLN</b></p>
        </StyledHistoryItem>
    )
}

const StyledHistoryItem = styled.div`
    margin: 5px 0;
    border-radius: 20px;
    padding: 5px 20px;
    box-shadow: var(--link-box-shadow);
    p{
        margin: 10px 0;
    }
    &.green{
        b{ color: var(--green) }
    }
    &.red{
        b{ color: var(--red) }
    }
`

export default HistoryItem;