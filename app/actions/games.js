import * as types from '../constants/ActionTypes';

export function addGame(id) {
  return { type: types.ADD_GAME, id };
}

export function deleteGame(id) {
  return { type: types.DELETE_GAME, id };
}

export function editGame(id, gameState) {
  return { type: types.EDIT_GAME, id, gameState };
}

export function updateDateTime(id, newGame) {
  return { type: types.UPDATE_DATE_TIME, id, newGame };
}

export function updateAwayScore(id, awayScore) {
  return { type: types.UPDATE_AWAY_SCORE, id, awayScore };
}

export function updateHomeScore(id, homeScore) {
  return { type: types.UPDATE_HOME_SCORE, id, homeScore };
}

export function updateGameAttrib(id, attrib, value) {
  return { type: types.UPDATE_GAME_ATTRIB, id, attrib, value };
}



