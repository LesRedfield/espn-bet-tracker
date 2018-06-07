import * as types from '../constants/ActionTypes';

export function addGame(teamName, gameState) {
  return { type: types.ADD_GAME, teamName, gameState };
}

export function deleteGame(id) {
  return { type: types.DELETE_GAME, id };
}

export function editGame(id, gameState) {
  return { type: types.EDIT_GAME, id, gameState };
}
