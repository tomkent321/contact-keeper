import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import * as actionType from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions   ***********

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: actionType.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionType.AUTH_ERROR
      });
    }
  };

  // Register User

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: actionType.REGISTER_SUCCESS,
        payload: res.data //token
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: actionType.REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // Login User
  const login = () => console.log('loginuser');

  // Logout

  const logout = () => console.log('logoutuser');

  // ClearErrors

  const clearErrors = () => dispatch({ type: actionType.CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
