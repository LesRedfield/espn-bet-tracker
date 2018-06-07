import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  id: 0,
  teamName: 'Team 1',
  gameState: 'Mid 1st'
}];

const actionsMap = {
  [ActionTypes.ADD_GAME](state, action) {
    return [{
      id: state.reduce((maxId, game) => Math.max(game.id, maxId), -1) + 1,
      teamName: action.teamName,
      gameState: action.gameState
    }, ...state];
  },
  [ActionTypes.DELETE_GAME](state, action) {
    return state.filter(game =>
      game.id !== action.id
    );
  },
  [ActionTypes.EDIT_GAME](state, action) {
    return state.map(game =>
      (game.id === action.id ?
        Object.assign({}, game, { gameState: action.gameState }) :
        game)
    );
  }
};

export default function games(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
