import React, { Component, PropTypes } from 'react';
import WagerMetric from './WagerMetric';
import style from './WagerMetrics.css';

import { calcWagerValue } from '../utils/helpers';

export default class WagerMetrics extends Component {

  static propTypes = {
    wagers: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  calcListValue = (wagerObjList) => {
    let netValue = 0;

    wagerObjList.forEach(wagerObj => {
      netValue += Math.round(calcWagerValue(wagerObj) * 100) / 100;
      // netValue += Math.round(0 * 100) / 100;
    });

    return netValue;
  };

  render() {
    const { wagers, games } = this.props;

    //construct array of completed and active wager objects
    // const wagerObjLists = ['final', 'live'].map(className => {
    //   return Object.keys(wagers).filter(wagerId => {
    //
    //     return document.getElementById(gameId).classList.contains(className);
    //   }).map(gameId => {
    //     return {
    //       gameId,
    //       game: games[gameId],
    //       wager: wagers[gameId]
    //     };
    //   });
    // });

    const completedWagerObjs = Object.keys(wagers).filter(wagerId => {
      const areAllBetsFinal = wagers[wagerId].bets.every(bet => document.getElementById(bet.gameId).classList.contains('final'));
      const didAnyBetsLose = wagers[wagerId].bets.some(bet => document.getElementById(bet.gameId).classList.contains('final') && this.isBetLosing(bet));

      return areAllBetsFinal || didAnyBetsLose;
    }).map(wagerId => {
      const { bets, odds, amount } = wagers[wagerId];
      const betObjs = bets.map(bet => {
        return {
          side: bet.side,
          game: games[bet.gameId]
        };
      });

      return {
        betObjs,
        odds,
        amount
      };
    });


    const activeWagerObjs = Object.keys(wagers).filter(wagerId => {
      return wagers[wagerId].bets.some(bet => {
        return !document.getElementById(bet.gameId).classList.contains('final');
      });
    }).filter(wagerId => {
      return wagers[wagerId].bets.some(bet => {
        return document.getElementById(bet.gameId).classList.contains('live');
      });
    }).filter(wagerId => {
      return wagers[wagerId].bets.every(bet => {
        return !(document.getElementById(bet.gameId).classList.contains('final') && this.isBetLosing(bet));
      });
    }).map(wagerId => {
      const { bets, odds, amount } = wagers[wagerId];
      const betObjs = bets.map(bet => {
        return {
          side: bet.side,
          game: games[bet.gameId]
        };
      });

      return {
        betObjs,
        odds,
        amount
      };
    });

    // const listValues = wagerObjLists.map(wagerObjList => {
    //   return this.calcListValue(wagerObjList);
    // });

    const listValues = [completedWagerObjs, activeWagerObjs].map(wagerObjList => {
      return this.calcListValue(wagerObjList);
    });

    listValues.push(listValues[0] + listValues[1]);

    const listNames = ['Completed', 'Active', 'Current'];

    return (
      <div className={ style.wagerMetricsContainer } >
        {
          listValues.map((listValue, idx) =>
            <div
              className={ style.wagerMetricContainer }
              key={ idx }
            >
              <WagerMetric
                title={ listNames[idx] }
                value={ listValue }
                type="dollars"
              />
            </div>
          )
        }
      </div>
    );
  }

  isBetLosing = (bet) => {
    const game = this.props.games[bet.gameId];
    const isHome = game.homeTeam === bet.side;

    return parseInt(game[isHome ? 'home' : 'away']) < parseInt(game[isHome ? 'away' : 'home']);
  }
}