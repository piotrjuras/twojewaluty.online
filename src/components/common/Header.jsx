import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserIcon } from '../../styled/StyledButton';



const Header = ({ userData, currency }) => {

    const letter = userData.name.slice(0, 1).toUpperCase();

    const getHello = () => {
        const hour = new Date().getHours();
        if(hour < 12) return 'Dzień dobry';
        if(hour >= 12 && hour < 15) return 'Miłego dnia';
        if(hour >= 15 && hour < 19) return 'Witaj';
        if(hour >= 19) return 'Dobry wieczór';
    }

    return (
        <StyledAppHeader>
            <h1>{getHello()}, {userData.name}</h1>
            <Link to={`/user/${userData.userToken}/account`}>
                <UserIcon
                    style={{ background: currency.cardColor}}
                >{letter}</UserIcon>
            </Link>
        </StyledAppHeader>
    )
}

const StyledAppHeader = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default Header;