/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { loginService, signupService } from '../../api/apiServices';
// import { notify } from "../../utils/utils";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || null,
  );
  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const signupHandler = async ({ username, email, password }) => {
    setSigningUp(true);
    try {
      const response = await signupService(username, email, password);
      if (response.status === 200 || response.status === 201) {
        const { encodedToken, createdUser } = response.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userInfo', JSON.stringify(createdUser));
        setToken(encodedToken);
        setUserInfo(createdUser);
        // notify("success", "Signed Up Successfully!!");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        // There's a response from the server, handle the error message
        // notify("error", error.response.data.message || "Some Error Occurred!!");
      } else if (error.request) {
        // The request was made, but no response was received
        // notify("error", "No response from the server.");
      } else {
        // Something else happened during the request
        // notify("error", "An error occurred while making the request.");
      }
      // notify(
      //   "error",
      //   error?.response?.data?.errors
      //     ? error?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setSigningUp(false);
    }
  };

  const loginHandler = async ({ email, password }) => {
    setLoggingIn(true);
    try {
      const response = await loginService(email, password);
      if (response.status === 200 || response.status === 201) {
        const { encodedToken, foundUser } = response.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userInfo', JSON.stringify(foundUser));
        setToken(encodedToken);
        setUserInfo(foundUser);
        // notify("success", "Logged In Successfully!!");
      }
    } catch (error) {
      console.log(error);
      // notify(
      //   "error",
      //   error?.response?.data?.errors
      //     ? error?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setLoggingIn(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setToken(null);
    setUserInfo(null);
    // notify("info", "Logged out successfully!!");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        signupHandler,
        loginHandler,
        logoutHandler,
        signingUp,
        loggingIn,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
