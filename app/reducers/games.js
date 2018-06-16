import * as ActionTypes from '../constants/ActionTypes';

const initialState = {};

const actionsMap = {
  [ActionTypes.ADD_GAME](state, action) {
    // debugger
    return {
      ...state,
      [action.id]: {
        id: action.id,
        awayTeam: action.awayTeam,
        homeTeam: action.homeTeam
      }
    }
  },
  [ActionTypes.DELETE_GAME](state, action) {
    return _.omit(state, action.id);
  },
  [ActionTypes.EDIT_GAME](state, action) {
    return state.map(game =>
      (game.id === action.id ?
        Object.assign({}, game, {
          gameSate: action.gameState
        }) : game
      )
    );
  },
  [ActionTypes.UPDATE_DATE_TIME](state, action) {
    return { ...state, [action.id]: action.newGame };
  },
  [ActionTypes.UPDATE_GAME_ATTRIB](state, action) {
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        [action.attrib]: action.value
      }
    };
  }
};

export default function games(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
