import React, { createContext, useState } from 'react';
import { 
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import Error from './components/Error';
import Hero from './views/Hero';
import Login from './views/Login';
import CurrencyDetails from './views/CurrencyDetails';
import UserDetails from './views/UserDetails';
import Alert from './components/common/Alert';
import LoadingSign from './components/common/LoadingSign';

import { Store } from './helpers/store/useStore';
import { env, isMobile } from './helpers/enviroment';
import { ViewContainer } from './styled/StyledViewContainer';
import './Root.css';
import { setThemeMode } from './helpers/helper';
import Wrapper from './views/Wrapper';

export const UserContext = createContext();
export const AlertContext = createContext();
export const StoreContext = createContext();

const Root = () => {

    const [userData, setUserData] = useState(null);
    const [alert, setAlert] = useState(false);
    const [store, setStore] = useState(Store);

    setThemeMode(null);

    if(isMobile()) return <UserContext.Provider value={[userData, setUserData]} >
        <AlertContext.Provider value={[alert, setAlert]} >
            <StoreContext.Provider value={[store, setStore]} >
            <Wrapper>
                {store.loading ? <LoadingSign /> : null}
                <ViewContainer>
                    <BrowserRouter basename={env.routerBasename}>
                        <Routes>
                            <Route path={"/"} element={ <Hero /> } />
                            <Route path={"/user/:token"} element={ <Dashboard /> } />
                            <Route path={"/user/:token/reload"} element={ <Dashboard reload={true} /> } />
                            <Route path={"/user/:token/account"} element={ <UserDetails userData={userData} /> } />
                            <Route path={"/details/:code/:history"} element={ <CurrencyDetails /> } />
                            <Route path={"/details/:code/:history/:token"} element={ <CurrencyDetails reloaded={userData ? false : true} /> } />
                            <Route path={"/register/:step"} element={ <Register /> } />
                            <Route path={"/login"} element={ <Login /> } />
                            <Route path={"/*"} element={ <Error error="Zabłądziłeś/aś, wróć do strony głównej" /> } />
                        </Routes>
                    </BrowserRouter>
                </ViewContainer>
            </Wrapper>
            {alert ? <Alert closeAlert={() => setAlert(false)} alert={alert} /> : null}
            </StoreContext.Provider>
        </AlertContext.Provider>
    </UserContext.Provider>

    if(!isMobile()) return <Error error="Niestety, ta aplikacja działa tylko na iOS lub Android">{navigator.appVersion}</Error>
}

export default Root;