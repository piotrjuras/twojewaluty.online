import React, { useState } from 'react';
import Modal from '../common/Modal';
import Statistics from './Statistics';
import History from './History';
import IconButton from '../common/IconButton';
import { Flex } from '../../styled/StyledViewContainer';

const Details = ({ userData }) => {

    const [modal, setModal] = useState(null);
    const currentSubAccount = userData.subAccounts[userData.mainAccount];

    return <Flex alignCenter spaceEvenly>
        <IconButton
            onClick={() => setModal('statistics')}
            iconName="faChartLine"
            label="Statystki"
            iconSize={30}
        />
        <IconButton
            onClick={() => setModal('history')}
            iconName="faList"
            label="Historia"
            iconSize={30}
        />
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