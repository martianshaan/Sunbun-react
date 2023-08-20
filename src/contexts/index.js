/* eslint-disable import/no-cycle */
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

export { default as AuthContextProvider } from './authContext/AuthContext';

export const useAuthContext = () => useContext(AuthContext);
