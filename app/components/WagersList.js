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

  componentDidMount() {

  }

  render() {
    const { games, wagers, wagerActions } = this.props;

    const completedWagers = Object.keys(wagers).filter(gameId => {
      return document.getElementById(gameId).classList.contains('final');
    }).map(gameId => {
      return {
        game: games[gameId],
        wager: wagers[gameId]
      };
    });

    const activeWagers = Object.keys(wagers).filter(gameId => {
      return document.getElementById(gameId).classList.contains('live');
    }).map(gameId => {
      return {
        game: games[gameId],
        wager: wagers[gameId]
      };
    });

    const pendingWagers = Object.keys(wagers).filter(gameId => {
      return (!document.getElementById(gameId).classList.contains('final') &&
              !document.getElementById(gameId).classList.contains('live'));
    }).map(gameId => {
      return {
        game: games[gameId],
        wager: wagers[gameId]
      };
    });

    const listNames = ["Completed", "Active", "Pending"];
    const wagerLists = [completedWagers, activeWagers, pendingWagers];

    const wagerListElements = (
      wagerLists.map((wagerList, idx) =>
        <div key={ idx } className={ style.wagerListColumn }>
          <h2>{ listNames[idx] }</h2>
          {
            wagerList.length > 0 ? (
              <ul>
                {
                  wagerList.map(wagerObj =>
                    <WagerItem
                      key={ wagerObj.game.id }
                      wager={ wagerObj.wager }
                      game={ wagerObj.game }
                      { ...wagerActions }
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
}