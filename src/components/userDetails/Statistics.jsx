import React from 'react';
import styled from 'styled-components';
import Chart from '../chart/Chart';
import { sortItemsByDates } from '../../helpers/helper';

const Statistics = ({ data }) => {

    const account = data.subAccounts[data.mainAccount];

    const getHistory = (type) => {
        let amount = 0;
        account.history.forEach(item => {
            if(item.type === type){
                amount += Number(item.amount);
            }
        });
        return amount;
    }

    const generateChatData = (history, type) => {
        const data = [];
        sortItemsByDates(history).forEach(item => {
            data.push({
                name: item.date,
                value: item.items.length
            })
        });
        const valuesBought = [];
        const valuesSold = [];
        history.forEach((item, index) => {
            if(item.type === 'bought') valuesBought.push({
                name: index+1,
                value: item.value
            });
            if(item.type === 'sold') valuesSold.push({
                name: index+1,
                value: item.value
            });
        });

        if(type === 'amount') return data;
        if(type === 'bought') return valuesBought;
        if(type === 'sold') return valuesSold;

    }

    return(
        <StyledStatistics>
            <h1>Statystyki</h1>
            <p>Do tej pory zainwestowałeś: <b>{account.spentAmount.toFixed(2)}PLN</b>.</p>
            <p>Do tej pory odzyskałeś: <b>{account.gainedAmount.toFixed(2)}PLN</b>.</p>
            <p>Kupiłeś łącznie: <b>{getHistory('bought').toFixed(2)}{account.currency.code}</b></p>
            <p>Sprzedałeś łącznie: <b>{getHistory('sold').toFixed(2)}{account.currency.code}</b></p>
            {account.history.length ? 
                <section>
                    {account.history.length > 2
                    ? <>
                        <h4>Dzienna historia transakcji</h4>
                        <div className="chart-wrapper">
                            <Chart chartData={generateChatData(account.history, 'amount')} height={200} />
                        </div>
                    </> : null}
                    {generateChatData(account.history, 'bought').length
                    ? <>
                        <h4>Historia Kupna</h4>
                        <div className="chart-wrapper">
                            <Chart chartData={generateChatData(account.history, 'bought')} height={200} />
                        </div>
                    </> : null}

                    {generateChatData(account.history, 'sold').length
                    ? <>
                        <h4>Historia sprzedaży</h4>
                        <div className="chart-wrapper">
                            <Chart chartData={generateChatData(account.history, 'sold')} height={200} />
                        </div>
                    </> : null}
                </section> : null}
        </StyledStatistics>
    )

}

const StyledStatistics = styled.div`
    
    h4{
        padding: 10px 0 0;
        margin: 5px 0;
    }
    .chart-wrapper{
        border: 1px solid lightgray;
        border-radius: 20px;
        overflow: hidden;
        padding: 10px 0 0;
    }
`

export default Statistics;