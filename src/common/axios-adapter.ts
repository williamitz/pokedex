import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './interfaces/http-adapter.interface';

export class AxiosAdapter implements HttpAdapter {
    
    private _axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this._axios.get( url );

            return data;
        } catch (error) {
            throw new Error('This is an error - Check logs');
        }
    }
    
}