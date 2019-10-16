import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import * as actionType from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions   ***********

  // Get Contacts

  const getContacts = async () => {
    try {
      const res = await axios.get('api/contacts');
      dispatch({
        type: actionType.GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionType.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };
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
  const deleteContact = async id => {
    try {
      await axios.delete(`api/contacts/${id}`);
      dispatch({
        type: actionType.DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: actionType.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: actionType.UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: actionType.CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: actionType.SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: actionType.CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: actionType.FILTER_CONTACTS, payload: text });
  };
  // Clear Filter

  const clearFilter = () => {
    dispatch({ type: actionType.CLEAR_FILTER });
  };

  // Clear Contacts

  const clearContacts = () => {
    dispatch({ type: actionType.CLEAR_CONTACTS });
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
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
