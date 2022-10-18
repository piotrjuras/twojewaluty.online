import React, { useState, useContext } from 'react';
import Modal from '../common/Modal';
import Statistics from './Statistics';
import History from './History';
import IconButton from '../common/IconButton';
import { AlertContext } from '../../Root';
import { Flex } from '../../styled/StyledViewContainer';
import { textToClipboard } from '../../helpers/helper';

const Details = ({ userData }) => {

    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
    const [modal, setModal] = useState(null);
    const currentSubAccount = userData.subAccounts[userData.mainAccount];

    return <Flex alignCenter spaceEvenly>
        <IconButton
            onClick={() => {
                try{
                    textToClipboard(window.location.href);
                    setAlert('link skopiowany do schowka');
                } catch(error) {
                    setAlert(['Ups, coś poszło nie tak, skopiuj link który Ci podaliśmy', 'error']);
                }
            }}
            iconName="faShare"
            label="Udostępnij"
            iconSize={30}
        />
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