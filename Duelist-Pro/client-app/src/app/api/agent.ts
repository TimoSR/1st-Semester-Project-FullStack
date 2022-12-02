import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IActivity } from '../models/activity';
import { history } from '../../index';
import { store } from '../stores/store';

/** Setting a delay to simulate page loading */
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {
        /** Delay the response with a seconds delay*/
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    /** Deconstructering the Json object based on model of inspection */
    const {data, status, config} = error.response!;
    switch (status) {
        case 400: 
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
                toast.error('not found');
            }
            if (data.errors) {

                const modalStateErrors = [];
                
                for(const key in data.errors) {

                    if (data.errors[key]) {

                        modalStateErrors.push(data.errors[key])

                    }

                }

                throw modalStateErrors.flat();

            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            toast.error('not found');
            break;
        case 500:
            store.commonStore.setServerError(data); 
            history.push('/server-error');
            toast.error('server-error')
            break
    }
    
    return Promise.reject(error);

})

axios.defaults.baseURL = "https://localhost:7032/api/";

/**
 * I want to request a responsebody with my requested type 
 **/ 

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

/** 
 * Should be read as a object with lamda functions
 * Object initializers / object literals
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
 * https://www.youtube.com/watch?v=7d9H34ZVRPg&ab_channel=TheNetNinja 
 **/

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    create: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    update: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
    list: () => requests.get<IActivity[]>('/activities'),
    details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
    create: (activity: IActivity) => requests.create<void>(`/activities`, activity),
    update: (activity: IActivity) => requests.update<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`)
};

const agent = {
    Activities
};

export default agent;