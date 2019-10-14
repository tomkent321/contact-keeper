import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import * as actionType from '../types';

const AuthState = props => {
  const initialState = {};

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions   ***********

  // Add Contact

  // const addContact = contact => {
  //   contact.id = uuid.v4();
  //   dispatch({ type: actionType.ADD_CONTACT, payload: contact });
  // };

  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};

export default ContactState;
