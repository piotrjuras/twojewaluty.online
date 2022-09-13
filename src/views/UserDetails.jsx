import React, { useState, useEffect, useContext } from 'react';
import History from '../components/userDetails/History';
import Modal from '../components/common/Modal';
import Statistics from '../components/userDetails/Statistics';
import Settings from '../components/userDetails/Settings';
import AddSubAccount from '../components/userDetails/AddSubAccount';
import DeleteSubAccount from '../components/userDetails/DeleteSubAccount';
import UserService from '../services/UserService';
import EditSubAccounts from '../components/userDetails/EditSubAccounts';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Root';
import { StyledScreenContainer } from '../styled/StyledScreenContainer';
import { LinkButton, StyledArrow } from '../styled/StyledButton';

const UserDetails = ({ reload }) => {

    const navigate = useNavigate();
    const params = useParams();
    const [userData, setUserData] = useContext(UserContext);
    const currentSubAccount = userData?.subAccounts[userData.mainAccount];
    const [modal, setModal] = useState(null);
    const [success, setSuccess] = useState(false);

    const userDataCopied = JSON.parse(JSON.stringify(userData));

    const fetchUser = async (token) => {
        const response = await UserService.getUser(token);
        if(response.data){
            setUserData(response.data);
        } else {
            navigate(`/user/${params.token}/`);
        }
    }

    useEffect(() => {
        if(reload){
            fetchUser(params.token);
            navigate(`/user/${params.token}/account`);
            setSuccess(true);
        }
    },[params, reload]); // eslint-disable-line

    useEffect(() => {
        if(!userData) fetchUser(params.token);
    },[userData]); // eslint-disable-line

    return(
        userData ? 
        <StyledScreenContainer>
            <header>
                <Link to={`/user/${params.token}`}>
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
                <LinkButton center XL onClick={() => setModal('addSubAccount')}>Dodaj subkonto<StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => setModal('deleteSubAccount')}>Usuń subkonto<StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => setModal('editSubAccounts')}>Edytuj subkonta<StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => setModal('settings')}>Ustawienia konta<StyledArrow/></LinkButton>
                <LinkButton center XL onClick={() => {
                    navigate('/');
                    window.location.reload();
                    }}>Wyloguj<StyledArrow/></LinkButton>
            </main>

            { modal === 'history' ? 
                <Modal closeModal={() => setModal(null)} backButton>
                    <History history={currentSubAccount.history} data={userData} />
                </Modal>
            : null }

            { modal === 'statistics' ? 
                <Modal closeModal={() => setModal(null)} backButton>
                    <Statistics data={userData} />
                </Modal>
            : null }

            { modal === 'addSubAccount' ? 
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success}>
                    <AddSubAccount userData={userDataCopied} handleSuccess={() => navigate(`/user/${params.token}/account/reload`)} />
                </Modal>
            : null }

            { modal === 'deleteSubAccount' ? 
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success} backButton>
                    <DeleteSubAccount userData={userDataCopied} handleSuccess={() => navigate(`/user/${params.token}/account/reload`)} />
                </Modal>
            : null }

            { modal === 'editSubAccounts' ?
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success} backButton>
                    <EditSubAccounts userData={userDataCopied} handleSuccess={() => navigate(`/user/${params.token}/account/reload`)} />
                </Modal>
            : null }

            { modal === 'settings' ? 
                <Modal closeModal={() => {
                    setModal(null);
                    setSuccess(false);
                }} initCloseModal={success} >
                    <Settings userData={userDataCopied} handleSuccess={() => navigate(`/user/${params.token}/account/reload`)} />
                </Modal>
            : null }
            <p>Kontakt: <br/>admin@twojewaluty.online</p>
        </StyledScreenContainer> : <Loader fullscreen={true} />
    )
}

export default UserDetails;