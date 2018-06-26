import * as types from '../constants/ActionTypes';

export function addWager(bets, odds, amount) {
  return { type: types.ADD_WAGER, bets, odds, amount };
}

export function deleteWager(id) {
  return { type: types.DELETE_WAGER, id };
}