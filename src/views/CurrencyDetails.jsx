import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import CurrencyService from '../services/CurrencyService';
import styled from 'styled-components';
import Chart from '../components/chart/Chart';
import CurrencyCalculator from '../components/currency/CurrencyCalculator';
import { Link, useParams } from 'react-router-dom';
import { OptionButton, StyledArrow, StyledButton } from '../styled/StyledButton';
import { FormInput } from '../styled/StyledInput';
import { StyledScreenContainer } from '../styled/StyledScreenContainer';
import { getTimeInPast, textToClipboard } from '../helpers/helper';
import { AlertContext } from '../Root';

const CurrencyDetails = ({ themeMode }) => {

    const params = useParams();
    const userToken = params.token ? params.token : null;
    const [currency, setCurrency] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    useEffect(() => {
        const fetchCurrency = async (code, startDate, endDate) => {
            const res = await CurrencyService.getCurrencyHistory(code, startDate, endDate);
            setCurrency(res.data);
        }

        if(params.history === 'week') fetchCurrency(params.code, getTimeInPast('week', 1) ,getTimeInPast('now'));
        if(params.history === 'month') fetchCurrency(params.code, getTimeInPast('month', 1) ,getTimeInPast('now'));
        if(params.history === 'halfyear') fetchCurrency(params.code, getTimeInPast('month', 6) ,getTimeInPast('now'));
        if(params.history === 'year') fetchCurrency(params.code, getTimeInPast('year', 1) ,getTimeInPast('now'));
    },[params])

    useEffect(() => {
        const array = [];
        if(currency) currency.rates.forEach((item, index) => {
            array.push({
                name: item.effectiveDate,
                value: item.mid
            });
        });
        setChartData(array);
    },[currency])

    const isGrowing = () => {
        return currency.rates[0].mid > currency.rates[currency.rates.length-1].mid
    }
    
    return(
        currency ? <StyledScreenContainer>
            <header>
                {userToken ? <Link to={`/user/${userToken}`}>
                    <StyledArrow back />
                </Link> : null}
                <h1>{ currency.currency } <span>({currency.code})</span></h1>
            </header>
            <StyledCurrencyDetails>
                <CharWrapper>
                    {chartData.length ? 
                        <Chart chartData={chartData} isGrowing={isGrowing()} height={230} />
                    : <Loader /> }
                </CharWrapper>

                <ButtonsWrapper>
                    <Link
                        to={`/details/${params.code}/week/${userToken ? userToken : ''}`}
                        className={params.history === 'week' ? 'active' : ''}
                    >
                        <OptionButton>tydzień</OptionButton>
                    </Link>
                    <Link
                        to={`/details/${params.code}/month/${userToken ? userToken : ''}`}
                        className={params.history === 'month' ? 'active' : ''}
                    >
                        <OptionButton>miesiąc</OptionButton>
                    </Link>
                    <Link
                        to={`/details/${params.code}/halfyear/${userToken ? userToken : ''}`}
                        className={params.history === 'halfyear' ? 'active' : ''}
                    >
                        <OptionButton>pół roku</OptionButton>
                    </Link>
                    <Link
                        to={`/details/${params.code}/year/${userToken ? userToken : ''}`}
                        className={params.history === 'year' ? 'active' : ''}
                    >
                        <OptionButton>rok</OptionButton>
                    </Link>
                </ButtonsWrapper>
                <main>
                <h2>Kurs z dnia: <b>{currency.rates[currency.rates.length-1].effectiveDate}</b></h2>
                <CurrencyCalculator data={currency} />
                <FormInput 
                    style={{display: 'none'}} 
                    className='copyInput' 
                    value={`${window.location.host}/details/${params.code}/${params.history}`}
                />
                <StyledButton center
                    onClick={() => {
                        try{
                            textToClipboard(`${window.location.host}/details/${params.code}/${params.history}`);
                            setAlert('link skopiowany do schowka');
                        } catch(error) {
                            setAlert(['Ups, coś poszło nie tak, skopiuj link który Ci podaliśmy', 'error']);
                        }
                    }}
                >Udostępnij</StyledButton>
                </main>
            </StyledCurrencyDetails>
        </StyledScreenContainer> : <Loader fullscreen={true} />
    )
}
const StyledCurrencyDetails = styled.div`
    h4{
        text-align: center;
        font-size: calc(100vw / 14);
        margin: 0;
    }
    h2{
        font-size: 20px;
        b{
            font-size: 25px;
        }
    }
    h3{
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;

        &.green{ 
            color var(--green);
            button{
                transform: rotate(-90deg);
                &::after{
                    border-color: var(--green);
                }
            }
        }
        &.red{
            color var(--red);
            button{
                transform: rotate(90deg);
                &::after{
                    border-color: var(--red);
                }
            }
        }
    }
    p{ text-align: center }
`

const CharWrapper = styled.div`
    border-radius: 40px;
    min-height: 200px;
    color: white;
    overflow: hidden;
    position: relative;
    box-shadow: var(--char-wrapper-box-shadow);
    margin-bottom: 15px;

`
const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    overflow-X: auto;
    a{
        button{
            background: none;
            border: none;
            padding: 15px 15px;
            border-radius: 15px;
            font-weight: 600;
            width: 100%;
            white-space: nowrap;
            text-transform: uppercase;
            color: var(--black);
        }

        &.active{

            button{
                background: var(--blue);
                color: var(--white);
                box-shadow: 0px 2px 5px rgba(0, 0, 255, .3);
            }
        }
    }
`

export default CurrencyDetails;