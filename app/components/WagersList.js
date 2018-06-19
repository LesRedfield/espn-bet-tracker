import React, { Component, PropTypes } from 'react';
import WagerItem from './WagerItem';

import style from './WagersList.css';

export default class WagersList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  render() {
    const { games, wagers } = this.props;

    return (
      <div>
        <h1>MY WAGERS LIST</h1>
        <ul>
          {
            _.map(wagers, (wager, idx) =>
              <div key={ idx } >
                  <span>
                    { wager.team + ' ' + wager.pointSpread + ' ' + wager.odds + ' $' + wager.amount }
                  </span>
              </div>
            )
          }
        </ul>
      </div>
    );
  }
}