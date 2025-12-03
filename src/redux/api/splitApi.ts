import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';
import { userLogout } from '../slices/authSlice';
import { clearAccessToken, getAccessToken, setAccessToken } from '@/utils/tokenMemory';

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    
    // Handle 401 errors with token refresh
    if (result?.error && (result as any).error.status === 401) {
        // Try to refresh the token
        const refreshResult = await baseQuery(
            { url: 'auth/refresh', method: 'POST' },
            api,
            { ...extraOptions, credentials: 'include' }
        );
        
        if (refreshResult.data && (refreshResult.data as any).accessToken) {
            // Update token in memory and retry original request
            setAccessToken((refreshResult.data as any).accessToken);
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Refresh failed, logout user
            clearAccessToken();
            api.dispatch(userLogout());
        }
    }
    
    return result;
};

export const splitApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth as any,
    endpoints: () => ({}),
    tagTypes: []
});


