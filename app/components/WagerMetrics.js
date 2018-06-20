import React, { Component, PropTypes } from 'react';
import WagerMetric from './WagerMetric';
import style from './WagerMetrics.css';

import { calcHomeSpreadWinP } from '../utils/helpers';

export default class WagerMetrics extends Component {

  static propTypes = {
    wagers: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  calcCompletedNet = (completedWagers) => {
    let completedNet = 0;

    completedWagers.forEach(wager => {
      const wagerNetScore = wager.team === wager.awayTeam ?
        parseInt(wager.awayScore) + parseFloat(wager.pointSpread) - parseInt(wager.homeScore) :
        parseInt(wager.homeScore) + parseFloat(wager.pointSpread) - parseInt(wager.awayScore);

      let wagerNetAmount = 0 - wager.amount;

      if (wagerNetScore > 0) {
        wagerNetAmount = wager.odds > 0 ?
          ((wager.amount / 100) * wager.odds) :
          ((wager.amount / wager.odds) * -100 );
      }

      completedNet += wagerNetAmount;
    });

    return completedNet;
  };

  render() {
    const { wagers, games } = this.props;

    const completedGameIds = Object.keys(games).filter(gameId => {
      return games[gameId]['date-time'].slice(0, 5) === 'FINAL';
    });

    const completedWagerIds = completedGameIds.filter(gameId => {
      return wagers[gameId];
    });

    const completedWagers = completedWagerIds.map(gameId => {
      const game = games[gameId];
      const wager = wagers[gameId];

      return {
        gameId,
        team: wager.team,
        pointSpread: wager.pointSpread,
        odds: wager.odds,
        amount: wager.amount,
        awayTeam: game.awayTeam,
        awayScore: parseInt(game.away),
        homeScore: parseInt(game.home)
      };
    });

    const completedNet = this.calcCompletedNet(completedWagers);

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