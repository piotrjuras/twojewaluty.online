import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledScreenContainer } from '../styled/StyledScreenContainer';
import { AlertContext, UserContext } from '../Root';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import UserService from '../services/UserService';
import Error from '../components/Error';
import Card from '../components/card/Card';
import Currency from '../components/currency/Currency';
import Favorites from '../components/favorites/Favorites';
import Header from '../components/common/Header';
import Loader from '../components/Loader';

import "swiper/css";
import 'swiper/css/pagination';

const Dashboard = ({ reload, children }) => {

    const params = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const [userData, setUserData] = useContext(UserContext);
    const [activeSubAccount, setActiveSubAccount] = useState(null);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line

    const fetchUser = async (token) => {
        const response = await UserService.getUser(token);
        if(response.data){
            setUserData(response.data);
        } else {
            setError(response);
        }
    }

    const slideChanged = async (e) => {
        if(e.realIndex !== userData.mainAccount){
            swiperRef.current.swiper.allowTouchMove = false;
            userData.mainAccount = e.realIndex;
            const response = await UserService.updateUser(params.token, userData);
            if(response.data === 'updated'){
                setUserData(userData);
                setAlert(`zmiana konta na: ${userData.subAccounts[userData.mainAccount].currency.code}`);
                setActiveSubAccount(userData.mainAccount);
            } else {
                setAlert(['Ups! coś poszło nie tak', 'error']);
            }
            swiperRef.current.swiper.allowTouchMove = true;
        }
    }

    useEffect(() => {
        if(!userData) fetchUser(params.token);
        if(userData) setActiveSubAccount(userData.mainAccount);
    },[params.token, userData]); // eslint-disable-line

    useEffect(() => {
        if(reload){
            fetchUser(params.token);
            navigate(`/user/${params.token}/`)
        }
    },[params, reload]); // eslint-disable-line

    if(error){
        return <Error error={error}>Aby korzystać z tej aplikacji musisz zarejestrować się</Error>
    } else {
        return userData && activeSubAccount !== null ?
            <StyledScreenContainer>
                <Header userData={userData} currency={userData.subAccounts[activeSubAccount]} />
                <Swiper
                    ref={swiperRef}
                    modules={[Pagination]}
                    style={swiperStyles}
                    onSlideChange={(e) => slideChanged(e)}
                    spaceBetween={15}
                    centeredSlides={true}
                    slidesPerView={1.02}
                    pagination={{ clickable: true }}
                    initialSlide={userData.mainAccount}
                >
                    {userData.subAccounts.map((subAccount, index) => 
                        <SwiperSlide key={index}>
                            <Card data={subAccount} />
                        </SwiperSlide>
                    )}
                </Swiper>
                <h2>Twoja waluta</h2>
                <Currency
                    code={userData.subAccounts[activeSubAccount].currency.code}
                    mainCurrency={true}
                    spread={userData.subAccounts[activeSubAccount].spread}
                />
                <Favorites data={userData} />
            </StyledScreenContainer>
            :
            <Loader fullscreen={true} />
    }
    
}

const swiperStyles = {
    overflow: 'visible'
}


export default Dashboard;