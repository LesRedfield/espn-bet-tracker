import React, { Component, PropTypes } from 'react';
import WagerMetric from './WagerMetric';
import style from './WagerMetrics.css';

import { calcBetValue } from '../utils/helpers';

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
      const { game, wager } = wagerObj;
      netValue += calcBetValue(game, wager);
    });

    return netValue;
  };

  render() {
    const { wagers, games } = this.props;

    //construct array of completed and active wager objects
    const wagerObjLists = ['final', 'live'].map(className => {
      return Object.keys(wagers).filter(gameId => {
        return document.getElementById(gameId).classList.contains(className);
      }).map(gameId => {
        return {
          gameId,
          game: games[gameId],
          wager: wagers[gameId]
        };
      });
    });

    const listValues = wagerObjLists.map(wagerObjList => {
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
}