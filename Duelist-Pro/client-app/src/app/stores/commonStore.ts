import { ServerError } from "../models/serverErrors";
import { makeAutoObservable } from 'mobx';

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    serServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        /** 'jwt' will be the key for the token */
        if (token) window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

}