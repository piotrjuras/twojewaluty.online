import React, { useEffect, useContext, useState } from 'react';
import { AlertContext } from '../Root';
import useStore from '../helpers/store/useStore';
import axios from 'axios';

const Wrapper = ({ children }) => {

    const [alert, setAlert] = useContext(AlertContext); // eslint-disable-line
    const [storeValue, setStoreValue] = useStore();
    let [pending, setPending] = useState(0);

    useEffect(() => {
        axios.interceptors.request.use(request => {
            pending++;
            setPending(pending);
            return request;
        });
    
        axios.interceptors.response.use(
            response => {
                pending--;
                setPending(pending);
                return response;
            },
            error => {
                setStoreValue('error', true);
                pending--;
                setPending(pending);
                return error;
            }
        );
        
    },[]) // eslint-disable-line

    useEffect(() => {
        if(pending === 0){
            setStoreValue('loading', false);
        } else {
            setStoreValue('loading', true);
        }

    },[pending]); // eslint-disable-line

    useEffect(() => {
        console.log(storeValue);
        if(storeValue.error)
        {
            setAlert(['Ups! coś poszło nie tak', 'error']);
            setStoreValue('error', false);
        }
    },[storeValue, setAlert, setStoreValue])

    return <div>{ children }</div>
}

export default Wrapper;