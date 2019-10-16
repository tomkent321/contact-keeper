import * as actionType from '../types';

export default (state, action) => {
  switch (action.type) {
    case actionType.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case actionType.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    case actionType.SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case actionType.CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case actionType.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case actionType.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case actionType.CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case actionType.CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
