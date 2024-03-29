import axios from 'axios';
import { clearSessionCache, includeSessionCache } from '../helpers/cache';
import { env } from '../helpers/enviroment';
import { headers } from '../helpers/headers';
import { encrypt, decrypt } from '../helpers/helper';

export default class UserService{
    static async getUser(token){
        try{
            // const res = await axios.get(`${env.getEndpoint}/${token}.json?ts=${Math.random()}`, headers);

            const res = await includeSessionCache(
                {
                    endpoint: `${env.getEndpoint}/${token}.json?ts=${Math.random()}`,
                    headers: headers
                },
                [token],
                1
            );
            res.data = JSON.parse(decrypt(res.data));
            return res;
        }
        catch(error){
            return 'Nie ma takiego użytkownika';
        }
    }

    static async setUser(token, email, data){
        clearSessionCache([token]);
        const form = new FormData();
        form.append('data', encrypt(JSON.stringify(data)));
        form.append('token', token);
        form.append('email', email);
        form.append('isLocal', env.isLocal);

        try{
            const res = await axios.post(env.postEndpoint, form);
            return res;
        }
        catch(error){
            return error.response;
        }
    }

    static async updateUser(token, data){
        clearSessionCache([token]);
        const form = new FormData();
        form.append('data', encrypt(JSON.stringify(data)));
        form.append('token', token);
        form.append('email', '');
        form.append('isLocal', env.isLocal);

        try{
            const res = await axios.post(env.postEndpoint, form);
            return res;
        }
        catch(error){
            return error.response;
        }
    }



    static async deleteUser(token, data){
        clearSessionCache([token]);
        const form = new FormData();
        form.append('data', encrypt(JSON.stringify(data)));
        form.append('token', token);
        form.append('email', '');
        form.append('delete', 'true');
        form.append('isLocal', env.isLocal);

        try{
            const res = await axios.post(env.postEndpoint, form);
            return res;
        }
        catch(error){
            return error.response;
        }
    }

}