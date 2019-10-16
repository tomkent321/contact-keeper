import * as actionType from '../types';

export default (state, action) => {
  switch (action.type) {
    case actionType.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case actionType.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case actionType.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case actionType.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        loading: false,
        error: null,
        current: null
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
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case actionType.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        loading: false
      };
    case actionType.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false
      };
    case actionType.CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
