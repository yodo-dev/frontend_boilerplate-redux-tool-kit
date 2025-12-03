import { useSelector } from 'react-redux';

export type AuthState = {
  isLoggedIn: boolean;
  user: { name?: string; email?: string; role?: string } | null;
  role: string | null;
};

export const useAuth = () => {
  const { isLoggedIn, user, role } = useSelector((s: { auth: AuthState }) => s.auth);
  return { isLoggedIn, user, role };
};

