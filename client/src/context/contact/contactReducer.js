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
          contact => contact.id !== action.payload
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

    default:
      return state;
  }
};
