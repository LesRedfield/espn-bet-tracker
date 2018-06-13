import React, { Component, PropTypes } from 'react';
// import GameItem from './GameItem';
import GamesList from './GamesList';
import style from './Dashboard.css';
// import _ from "lodash";

export default class Dashboard extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired,
    wagerActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = { addingWager: false };
  }

  toggleShowAddWagers = () => {
    console.log('toggling');
    // debugger
    this.setState(prevState => {
      return { addingWager: !prevState.addingWager };
    });

  }

  handleAddWager = (gameId, team, pointSpread, odds, amount) => {
    console.log('add game ' + gameId);
    this.props.wagerActions.addWager(gameId, team, pointSpread, odds, amount);
    this.toggleShowAddWagers();
  }

  componentDidMount() {
    // const gameContainers = document.getElementById('events').
    //                                 getElementsByClassName('scoreboard');
    //
    // Array.from(gameContainers).forEach(function(gameContainer) {
    //
    //   const id = gameContainer.id;
    //
    //   this.props.actions.addGame(id);
    // }, this);
  }

  render() {
    const { games, wagers } = this.props;

    // debugger

    const element = this.state.addingWager ? (
      <div>


        <div>
          <h1>
            Choose a game to add
            <button
              onClick={ this.toggleShowAddWagers }>
              X
            </button>
          </h1>
          <ul>
            {
              _.map(games, (game, idx) =>
                <div
                  key={ idx }
                  onClick={ this.handleAddWager.bind(this, game.id, game.awayTeam, 0, 150, 100) }>
                  <span>
                    { game.awayTeam + ' vs ' + game.homeTeam }
                  </span>
                </div>
              )
            }
          </ul>
        </div>
      </div>
    ) : (
      <button
        className={ style.addWager }
        onClick={ this.toggleShowAddWagers } >
        <span>
          ADD WAGER
        </span>
      </button>
    );


    return (
      <div className={ style.dashboard }>
        MY WAGERS DASHBOARD

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

        <div>
          { element }
        </div>
      </div>
    );
  }
}
