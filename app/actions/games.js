import * as types from '../constants/ActionTypes';

export function addGame(text) {
  return { type: types.ADD_GAME, text };
}

export function deleteGame(id) {
  return { type: types.DELETE_GAME, id };
}

export function editGame(id, text) {
  return { type: types.EDIT_GAME, id, text };
}
