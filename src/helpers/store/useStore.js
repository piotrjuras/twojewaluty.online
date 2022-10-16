import { useContext } from 'react';
import { StoreContext } from '../../Root';

export const Store = {
    loading: false,
    error: false
}

const useStore = () => {
    const [storeValue, setStore] = useContext(StoreContext);

    const setStoreValue = (property, value) => {
        const newStore = JSON.parse(JSON.stringify(storeValue));
        newStore[property] = value;
        setStore(newStore);
    }

    return [ storeValue, setStoreValue ];
}

export default useStore;