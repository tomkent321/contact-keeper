import * as actionType from '../types';

export default (state, action) => {
  switch (action.type) {
    case actionType.SET_ALERT:
      return [...state, action.payload];

     case actionType.REMOVE_ALERT:
       return state.filter(alert => alert.id !== action.payload);

    default:
      return state;
  }
};