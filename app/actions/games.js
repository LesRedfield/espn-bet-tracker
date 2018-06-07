import * as types from '../constants/ActionTypes';

export function addGame(teamName, gameTable) {
  return { type: types.ADD_GAME, teamName, gameTable };
}

export function deleteGame(id) {
  return { type: types.DELETE_GAME, id };
}

export function editGame(id, dateTime) {
  return { type: types.EDIT_GAME, id, dateTime };
}
