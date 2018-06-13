import * as types from '../constants/ActionTypes';

export function addWager(gameId, team, pointSpread, odds, amount) {
  return { type: types.ADD_WAGER, gameId, team, pointSpread, odds, amount };
}

export function deleteWager(id) {
  return { type: types.DELETE_WAGER, id };
}