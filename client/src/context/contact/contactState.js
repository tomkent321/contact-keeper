import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import * as actionType from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Actions   ***********

  // Add Contact

  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: actionType.ADD_CONTACT, payload: contact });
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
