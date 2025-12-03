import { splitApi } from '@/redux/api/splitApi';

type Credentials = { email: string; password: string };
type RegisterDto = { name: string; email: string; password: string };
type ForgetPasswordDto = { email: string };
type VerifyOTPDto = { email: string; otp: string };
type ResetPasswordDto = { email: string; otp: string; password: string };

export const authService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, Credentials>({
      query: (credentials) => ({ url: 'auth/signin', method: 'POST', body: credentials })
    }),
    register: builder.mutation<any, RegisterDto>({
      query: (data) => ({ url: 'auth/signup', method: 'POST', body: data })
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
        credentials: 'include'
      })
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include'
      })
    }),
    getProfile: builder.query<any, void>({
      query: () => ({ url: 'auth/me' })
    }),
    forgetPassword: builder.mutation<any, ForgetPasswordDto>({
      query: (data) => ({ url: 'auth/forget-password', method: 'POST', body: data })
    }),
    verifyOTP: builder.mutation<any, VerifyOTPDto>({
      query: (data) => ({ url: 'auth/verify-otp', method: 'POST', body: data })
    }),
    resetPassword: builder.mutation<any, ResetPasswordDto>({
      query: (data) => ({ url: 'auth/reset-password', method: 'POST', body: data })
    })
  }),
  overrideExisting: false
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useForgetPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation
} = authService;

