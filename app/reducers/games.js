import * as ActionTypes from '../constants/ActionTypes';

const initialState = [
  
];

const actionsMap = {
  [ActionTypes.ADD_GAME](state, action) {
    return [{
      id: state.reduce((maxId, game) => Math.max(game.id, maxId), -1) + 1,
      completed: false,
      text: action.text
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
        Object.assign({}, game, { text: action.text }) :
        game)
    );
  }
};

export default function games(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
