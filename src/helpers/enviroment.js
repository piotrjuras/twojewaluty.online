const enviroment = () => {
    const local = process.env.NODE_ENV === 'development';
    if(local){
        return {
            getEndpoint: '/api/users',
            postEndpoint: 'http://192.168.1.101:8000/api/',
            routerBasename: '',
            isLocal: true,
        }
    } else {
        return {
            getEndpoint: '/api/users',
            postEndpoint: 'https://twojewaluty.online/api/',
            routerBasename: '',
            isLocal: false,
        }
    }
};

export const env = {
        getEndpoint: enviroment().getEndpoint,
        postEndpoint: enviroment().postEndpoint,
        routerBasename: enviroment().routerBasename,
        isLocal: enviroment().isLocal
}

export const isMobile = () => {
    return ( /Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent) )
};