import * as actionType from '../types';

export default (state, action) => {
  switch (action.type) {
    case actionType.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    default:
      return state;
  }
};
