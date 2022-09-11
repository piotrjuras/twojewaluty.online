import axios from 'axios';
import { env } from '../helpers/enviroment';
import { headers } from '../helpers/headers';


export default class UserService{
    static async getUser(token){
        try{
            const res = await axios.get(`${env.getEndpoint}/${token}.json?ts=${Math.random()}`, headers);
            return res;
        }
        catch(error){
            return error.response;
        }
    }

    static async setUser(token, email, data){
        const form = new FormData();
        form.append('data', JSON.stringify(data));
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
        const form = new FormData();
        form.append('data', JSON.stringify(data));
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
        const form = new FormData();
        form.append('data', JSON.stringify(data));
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