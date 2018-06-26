import * as ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {};

const actionsMap = {
  [ActionTypes.ADD_WAGER](state, action) {
    const id = Object.keys(state).reduce((maxId, wagerId) => Math.max(wagerId, maxId), -1) + 1;
    return {
      ...state,
      [id]: {
        id,
        bets: action.bets,
        odds: action.odds,
        amount: action.amount
      }
    };
  },
  [ActionTypes.DELETE_WAGER](state, action) {
    return _.omit(state, action.id);
  }
};

export default function wagers(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
