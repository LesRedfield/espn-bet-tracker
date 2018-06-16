import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import * as GameActions from '../actions/games';
import * as WagerActions from '../actions/wagers';
import style from './App.css';

// import * as Papa from 'papaparse';
//
// import * as winProbs from '../constants/WinProbs';

@connect(
  state => ({
    games: state.games,
    wagers: state.wagers
  }),
  dispatch => ({
    gameActions: bindActionCreators(GameActions, dispatch),
    wagerActions: bindActionCreators(WagerActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired,
    wagerActions: PropTypes.object.isRequired
  };

  render() {
    const { games, wagers, gameActions, wagerActions } = this.props;

    return (
      <div className={style.normal}>
        <MainSection games={ games } wagers={ wagers }
                     gameActions={ gameActions } wagerActions={ wagerActions } />
      </div>
    );
  }
}
