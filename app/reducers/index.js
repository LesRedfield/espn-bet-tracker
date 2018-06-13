import { combineReducers } from 'redux';
import games from './games';
import wagers from './wagers';

export default combineReducers({
  games,
  wagers
});
