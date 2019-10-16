import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import * as actionType from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions   ***********

  // Add Contact

  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/contacts', contact, config);
      dispatch({
        type: actionType.ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionType.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: actionType.DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: actionType.SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: actionType.CLEAR_CURRENT });
  };
  // Update Contact
  const updateContact = contact => {
    dispatch({ type: actionType.UPDATE_CONTACT, payload: contact });
  };
  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: actionType.FILTER_CONTACTS, payload: text });
  };
  // Clear Filter

  const clearFilter = () => {
    dispatch({ type: actionType.CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
