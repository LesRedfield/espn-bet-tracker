import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import * as GameActions from '../actions/games';
import style from './App.css';

@connect(
  state => ({
    games: state.games
  }),
  dispatch => ({
    actions: bindActionCreators(GameActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    games: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { games, actions } = this.props;

    return (
      <div className={style.normal}>
        <MainSection games={games} actions={actions} />
      </div>
    );
  }
}
