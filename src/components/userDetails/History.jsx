import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';
import { sortItemsByDates } from '../../helpers/helper';

const History = ({ history, data }) => {

    const [historyList, setHistoryList] = useState([])

    useEffect(() => {
        setHistoryList(sortItemsByDates(history));
    },[history])

    return(
        <StyledHistoryView>
            <h1>Historia transakcji</h1>
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