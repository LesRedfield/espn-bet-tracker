import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './GamesList.css';
import _ from "lodash";

// import * as Papa from 'papaparse';
import { winP } from '../constants/WinProbs';

export default class GamesList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  render() {
    // debugger
    const { games, gameActions } = this.props;
    // const { winP } = this.state;

    // debugger

    return (
      <div>
        <h1>Today's Games</h1>
        <ul className={ style.gameList }>
          {
            _.map(games, (game) =>
              <GameItem key={ game.id } game={ game } winP={ winP } { ...gameActions } />
            )
          }
        </ul>
      </div>
    );
  }
}