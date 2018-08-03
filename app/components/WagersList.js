import React, { Component, PropTypes } from 'react';
import WagerItem from './WagerItem';

import style from './WagersList.css';

export default class WagersList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired,
    wagerActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { games, wagers, wagerActions } = this.props;

    // const completedWagers = Object.keys(wagers).filter(gameId => {
    //   return document.getElementById(gameId).classList.contains('final');
    // }).map(gameId => {
    //   return {
    //     game: games[gameId],
    //     wager: wagers[gameId]
    //   };
    // });
    //
    // const activeWagers = Object.keys(wagers).filter(gameId => {
    //   return document.getElementById(gameId).classList.contains('live');
    // }).map(gameId => {
    //   return {
    //     game: games[gameId],
    //     wager: wagers[gameId]
    //   };
    // });
    //
    // const pendingWagers = Object.keys(wagers).filter(gameId => {
    //   return (!document.getElementById(gameId).classList.contains('final') &&
    //           !document.getElementById(gameId).classList.contains('live'));
    // }).map(gameId => {
    //   return {
    //     game: games[gameId],
    //     wager: wagers[gameId]
    //   };
    // });

    const completedWagerObjs = Object.keys(wagers).filter(wagerId => {
      const areAllBetsFinal = wagers[wagerId].bets.every(bet => document.getElementById(bet.gameId).classList.contains('final'));
      const didAnyBetsLose = wagers[wagerId].bets.some(bet => document.getElementById(bet.gameId).classList.contains('final') && this.isBetLosing(bet));

      return areAllBetsFinal || didAnyBetsLose;
    }).map(wagerId => {
      const { bets, odds, amount } = wagers[wagerId];
      const betObjs = bets.map(bet => {
        return {
          odds: bet.odds,
          side: bet.side,
          game: games[bet.gameId]
        };
      });

      return {
        wagerId,
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
          odds: bet.odds,
          side: bet.side,
          game: games[bet.gameId]
        };
      });

      return {
        wagerId,
        betObjs,
        odds,
        amount
      };
    });

    const futureWagerObjs = Object.keys(wagers).filter(wagerId => {
      return wagers[wagerId].bets.every(bet => {
        return !document.getElementById(bet.gameId).classList.contains('final') &&
          !document.getElementById(bet.gameId).classList.contains('live');
      });
    }).map(wagerId => {
      const { bets, odds, amount } = wagers[wagerId];
      const betObjs = bets.map(bet => {
        return {
          odds: bet.odds,
          side: bet.side,
          game: games[bet.gameId]
        };
      });

      return {
        wagerId,
        betObjs,
        odds,
        amount
      };
    });

    const listNames = ['Completed', 'Active', 'Future'];
    const wagerObjLists = [completedWagerObjs, activeWagerObjs, futureWagerObjs];

    const wagerListElements = (
      wagerObjLists.map((wagerObjList, idx) =>
        <div key={ idx } className={ style.wagerListColumn }>
          <h2>{ listNames[idx] }</h2>
          {
            wagerObjList.length > 0 ? (
              <ul>
                {
                  wagerObjList.map((wagerObj, idx) =>
                    <WagerItem
                      key={ idx }
                      wagerObj={ wagerObj }
                      deleteWager={ wagerActions.deleteWager }
                    />
                  )
                }
              </ul>
            ) : (
              <div className={ style.noWagers } >
                { 'No ' + listNames[idx] + ' Wagers Added' }
              </div>
            )
          }

        </div>
      )
    );

    return (
      <div>
        <h2>My Wagers</h2>
        <div className={ style.wagerList } >
          {
            wagerListElements
          }
        </div>

      </div>
    );
  }

  isBetLosing = (bet) => {
    const game = this.props.games[bet.gameId];
    const isHome = game.homeTeam === bet.side;

    return parseInt(game[isHome ? 'home' : 'away']) < parseInt(game[isHome ? 'away' : 'home']);
  }
}