import axios from "axios";
import dayjs from "dayjs";
import { AxiosRequestHeaders } from 'axios';

interface SessionCacheRequest{
    endpoint: String;
    headers?: AxiosRequestHeaders;
}

const generateCacheId = identifiers => `cache[${identifiers.join(';')}]`;

export const includeSessionCache = async ( { endpoint, headers = {} }: SessionCacheRequest, identifiers: string[], cacheDuration: number = 60 ) => {

    const getSessionCache = identifier => {
        const cache = JSON.parse(window.sessionStorage.getItem( generateCacheId(identifier)) );
        const time = dayjs().valueOf();
    
        if(cache && cache.dateExpires > time) return cache.value;
    
        return null;
    };

    const setSessionCache = (identifier, value) => {
        const cacheValue = {
            dateExpires: dayjs().add(60, 'minutes').valueOf(),
            value
        };
    
        window.sessionStorage.setItem( generateCacheId(identifier), JSON.stringify(cacheValue));
    };

    const cachedResponse = getSessionCache(identifiers);

    if(cachedResponse) return cachedResponse;

    const response = await axios.get(endpoint, headers);
    setSessionCache(identifiers, response);

    return response;
}

export const clearSessionCache = ( identifiers: string[] ) => {
    window.sessionStorage.removeItem(generateCacheId(identifiers));
}