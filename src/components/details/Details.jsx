import React, { useState } from 'react';
import Modal from '../common/Modal';
import Statistics from './Statistics';
import History from './History';
import { DetailsButton, StyledButton } from '../../styled/StyledButton';
import { Flex } from '../../styled/StyledViewContainer';

const Details = ({ userData }) => {

    const [modal, setModal] = useState(null);

    const currentSubAccount = userData.subAccounts[userData.mainAccount];

    return <Flex alignCenter spaceEvenly>
        <StyledButton primary onClick={() => setModal('statistics')}>Statystyki</StyledButton>
        <StyledButton primary onClick={() => setModal('history')}>Historia</StyledButton>
        { modal === 'statistics' ? 
            <Modal closeModal={() => setModal(null)} >
                <Statistics data={userData} />
            </Modal>
        : null }
        { modal === 'history' ? 
            <Modal closeModal={() => setModal(null)} >
                <History history={currentSubAccount.history} data={userData} />
            </Modal>
        : null }
    </Flex>
}


export default Details;