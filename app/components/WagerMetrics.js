import React, { Component, PropTypes } from 'react';
import WagerMetric from './WagerMetric';
import style from './WagerMetrics.css';

import { winP } from '../constants/WinProbs';

export default class WagerMetrics extends Component {

  static propTypes = {
    wagers: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  calcCompletedNet = (completedWagers) => {
    let completedNet = 0;

    completedWagers.forEach(wager => {
      const wagerNetScore = wager.team === wager.awayTeam ?
        wager.awayScore + wager.pointSpread - wager.homeScore :
        wager.homeScore + wager.pointSpread - wager.awayScore;

      let wagerNetAmount = 0 - wager.amount;

      if (wagerNetScore > 0) {
        wagerNetAmount = wager.odds > 0 ?
          ((wager.amount / 100) * wager.odds) :
          ((wager.amount / wager.odds) * -100 );
      }

      completedNet += wagerNetAmount;
    });

    // debugger

    return completedNet;
  };

  render() {
    const { wagers, games } = this.props;

    const completedGameIds = Object.keys(games).filter(gameId => {
      return games[gameId]['date-time'] === 'FINAL';
    });

    // debugger

    const completedWagerIds = completedGameIds.filter(gameId => {
      return wagers[gameId];
    });

    // debugger

    const completedWagers = completedWagerIds.map(gameId => {
      const game = games[gameId];
      const wager = wagers[gameId];

      // debugger

      return {
        gameId,
        team: wager.team,
        pointSpread: wager.pointSpread,
        odds: wager.odds,
        amount: wager.amount,
        awayTeam: game.awayTeam,
        awayScore: game.away,
        homeScore: game.home
      };
    });

    const completedNet = this.calcCompletedNet(completedWagers);

    // debugger

    return (
      <div>
        <WagerMetric
          title="Completed"
          value={ completedNet }
          type="dollars"
        />
      </div>
    );
  }
}