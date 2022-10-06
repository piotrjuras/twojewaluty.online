import dayjs from 'dayjs';
import * as CryptoJS from 'crypto-js';
import { v1 as uuidv1 } from 'uuid';

export const generateUUID = () => {
    const v1options = { msecs: new Date().getTime() };
    return uuidv1(v1options);
};

export const getSpread = (rate, spread, operation) => {
    if(operation === 'sell'){
        return (rate - (Number(spread)/2)).toFixed(4);
    }

    if(operation === 'buy'){
        return (rate + (Number(spread)/2)).toFixed(4);
    }
}

export const getTimeInPast = (type, count) => {

    const now = new Date();
    const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
    
    if(type === 'week') return formatDate( new Date(now.getFullYear(), now.getMonth(), now.getDate() - count*7) );
    if(type === 'month') return formatDate( new Date(now.getFullYear(), now.getMonth() - count, now.getDate()) );
    if(type === 'year') return formatDate( new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()) );
    if(type === 'now') return formatDate( new Date() );
}


export const sortItemsByDates = (items) => {

    const dates = [];
    const result = [];

    items.forEach((item, index) => {
        const date = dayjs(item.date).format('YYYY-MM-DD');
        if(!dates.includes(date)){
            dates.push(date)
            result.push({
                date: date,
                items: []
            });
        }
    });

    items.forEach((item, index) => {
        const date = dayjs(item.date).format('YYYY-MM-DD');
        result.forEach(resultItem => {
            if(dates.includes(date)){
                if(date === resultItem.date){
                    resultItem.items.push(item);
                }
            };
        })
    });

    return result;
}

export const generateRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

export const setThemeMode = (theme) => {
    if(theme === null){
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        const switchTheme = () => {
            if (darkThemeMq.matches) {
                document.documentElement.className = 'dark';
            } else {
                document.documentElement.className = 'light';
            }
        }
        darkThemeMq.addEventListener('change', () => switchTheme());
        switchTheme();
    } else {
        document.documentElement.className = theme;
        
    }
}

export const textToClipboard = (text) => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);   
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

export const encrypt = (string) => {
    return CryptoJS.AES.encrypt(string, process.env.REACT_APP_ENCRYPT);
}

export const decrypt = (encrypted) => {
    return CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_ENCRYPT).toString(CryptoJS.enc.Utf8);
}

export const searchCurrency = (value, list) => {
    const visibleIndexes = [];
    list.forEach((listItem, index) => {
        if(value.length > 0){
            if(
                listItem.currency.toLowerCase().search(value.toLowerCase()) !== -1
                ||
                listItem.code.toLowerCase().search(value.toLowerCase()) !== -1
            ){
                visibleIndexes.push(index);
            }
        } else {
            visibleIndexes.push(index);
        }

    });
    return visibleIndexes
}