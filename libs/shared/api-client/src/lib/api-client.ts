import axios from 'axios';

//Set port when run through docker
export const apiBaseURL = 'http://localhost:8000';
//Set port und ip when run local
//export const apiBaseURL = 'http://192.168.140.42:8000';
//export const apiBaseURL = 'http://192.168.250.111:8000';
//export const apiBaseURL = 'http://localhost:8000';
export const apiClient = axios.create({ baseURL: apiBaseURL });
