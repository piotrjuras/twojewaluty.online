import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';
import { sortItemsByDates } from '../../helpers/helper';
import { StyledButton } from '../../styled/StyledButton';

const History = ({ history, data }) => {

    const [historyList, setHistoryList] = useState([]);
    const historyDuplicated = JSON.parse(JSON.stringify(history));
    const [sortbyNewwest, setSortByNewwest]= useState(true);

    useEffect(() => {
        setHistoryList(sortItemsByDates(sortbyNewwest ? historyDuplicated.reverse() : historyDuplicated));
    },[history , sortbyNewwest]) // eslint-disable-line

    return(
        <StyledHistoryView>
            <h1>Historia transakcji</h1>
            {historyList.length ?
                <StyledButton
                    center
                    onClick={() => setSortByNewwest(!sortbyNewwest)}
                >
                    {sortbyNewwest ? 'Sortuj od najstarszych' : 'Sortuj od najnowszych'}
                </StyledButton> : <h3>brak transakcji</h3>}
            {historyList.map((item, index) => {
                return <span key={index}>
                            <h4>{item.date}</h4>
                            {item.items.map((item, i) => <HistoryItem key={i} history={item} data={data.subAccounts[data.mainAccount]} />)}
                        </span>
            })}
        </StyledHistoryView>
    )
}

const StyledHistoryView = styled.section`

`

export default History;