import React, { useState, useEffect, useContext } from 'react';
import History from '../components/userDetails/History';
import Modal from '../components/common/Modal';
import Statistics from '../components/userDetails/Statistics';
import Settings from '../components/userDetails/Settings';
import AddSubAccount from '../components/userDetails/AddSubAccount';
import UserService from '../services/UserService';
import EditSubAccounts from '../components/userDetails/EditSubAccounts';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Root';
import { StyledScreenContainer } from '../styled/StyledScreenContainer';
import { LinkButton, StyledArrow } from '../styled/StyledButton';

const UserDetails = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [userData, setUserData] = useContext(UserContext);
    const currentSubAccount = userData?.subAccounts[userData.mainAccount];
    const [modal, setModal] = useState(null);
    const [success, setSuccess] = useState(false);
    const [animateIn, setAnimateIn] = useState(true);

    const userDataCopied = JSON.parse(JSON.stringify(userData));

    const fetchUser = async (token) => {
        const response = await UserService.getUser(token);
        if(response.data){
            setUserData(response.data);
            setSuccess(true);
        } else {
            navigate(`/user/${params.token}/`);
        }
    }

    useEffect(() => {
        if(!userData) navigate(`/user/${params.token}/`);
    },[userData]); // eslint-disable-line

    return(
        userData ? 
        <StyledScreenContainer className={animateIn ? 'animate-in' : 'animate-out'}>
            <header>
                <Link to={`/user/${params.token}`} onClick={(e) => {
                    e.preventDefault();
                    setAnimateIn(false);
                    setTimeout(() => navigate(`/user/${params.token}`), 300);
                }}>
                    <StyledArrow back />
                </Link>
                <h1>Konto, {userData.name}</h1>
            </header>
            <p>Domyślne subkonto: <b>{currentSubAccount.currency.name} ({currentSubAccount.currency.code})</b></p>
            <main>
                <h2>Informacje</h2>
                <LinkButton center XL onClick={() => setModal('history')}>Historia transakcji <StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => setModal('statistics')}>Statystyki<StyledArrow/></LinkButton>
                <h2>Zarządzanie kontem</h2>
                <LinkButton center XL onClick={() => setModal('editSubAccounts')}>Edytuj subkonta<StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => setModal('settings')}>Ustawienia konta<StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => {
                    navigate('/');
                    window.location.reload();
                    }}>Wyloguj<StyledArrow/></LinkButton>
            </main>

            { modal === 'history' ? 
                <Modal closeModal={() => setModal(null)} >
                    <History history={currentSubAccount.history} data={userData} />
                </Modal>
            : null }

            { modal === 'statistics' ? 
                <Modal closeModal={() => setModal(null)} >
                    <Statistics data={userData} />
                </Modal>
            : null }

            { modal === 'addSubAccount' ? 
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success}>
                    <AddSubAccount userData={userDataCopied} handleSuccess={() => fetchUser(params.token)} />
                </Modal>
            : null }

            { modal === 'editSubAccounts' ?
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success} >
                    <EditSubAccounts
                        userData={userDataCopied}
                        handleSuccess={() => fetchUser(params.token)}
                        addSubaccount={() => setModal('addSubAccount')}
                    />
                </Modal>
            : null }

            { modal === 'settings' ? 
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success} >
                    <Settings userData={userDataCopied} handleSuccess={() => fetchUser(params.token)} />
                </Modal>
            : null }
            <p>Kontakt: <br/>admin@twojewaluty.online</p>
        </StyledScreenContainer> : <Loader fullscreen={true} />
    )
}

export default UserDetails;