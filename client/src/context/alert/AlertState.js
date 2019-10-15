import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import uuid from 'uuid';
import * as actionType from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Actions   ***********

  // Set Alert

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: actionType.SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(
      () => dispatch({ type: actionType.REMOVE_ALERT, payload: id }),
      timeout
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
