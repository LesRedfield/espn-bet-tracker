import React, { Component, PropTypes } from 'react';
import WagerMetrics from './WagerMetrics';
import WagersList from './WagersList';

import style from './Dashboard.css';

export default class Dashboard extends Component {

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

    return (
      <div className={ style.dashboard }>
        <h1>
          ESPN Bet Tracker
        </h1>
        <div className={ style.wagerMetricsContainer } >
          <WagerMetrics
            wagers={ wagers }
            games={ games }
          />
        </div>
        <div className={ style.wagerListContainer } >
          <WagersList
            wagers={ wagers }
            games={ games }
            wagerActions={ wagerActions }
          />
        </div>
      </div>
    );
  }
}
