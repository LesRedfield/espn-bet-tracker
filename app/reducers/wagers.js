import * as ActionTypes from '../constants/ActionTypes';

const initialState = {};

const actionsMap = {
  [ActionTypes.ADD_WAGER](state, action) {
    // debugger
    return {
      ...state,
      [action.gameId]: {
        gameId: action.gameId,
        team: action.team,
        pointSpread: action.pointSpread,
        odds: action.odds,
        amount: action.amount
      }
    }
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
