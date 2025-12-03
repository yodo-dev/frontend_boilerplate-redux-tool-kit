import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '@/utils/tokenMemory';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = getAccessToken();
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
            headers.set('accept', 'application/json');
        } else {
            headers.set('authorization', '');
        }
        return headers;
    }
});


