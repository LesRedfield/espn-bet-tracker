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

    this.state = {
      addingWager: 'button',
      gameId: '0',
      team: 'none',
      pointSpread: 0,
      odds: 0,
      amount: 0
    };
  }

  toggleShowAddWagers = (status) => {
    console.log('toggling');
    // debugger
    this.setState({ addingWager: status });

  }

  handleAddTeam = (gameId, team) => {
    this.setState({
      gameId,
      team
    });

    this.toggleShowAddWagers('wagerForm');
  }

  handleAddWager = (e) => {
    const { gameId, team, pointSpread, odds, amount } = this.state;
    console.log('add game ' + gameId);
    this.props.wagerActions.addWager(gameId, team, pointSpread, odds, amount);
    this.toggleShowAddWagers('button');
    e.preventDefault();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

    const element = this.state.addingWager === 'games' ? (
      <div>


        <div>
          <h1>
            Choose a game to add
            <button
              onClick={ this.toggleShowAddWagers.bind(this, 'button') }>
              X
            </button>
          </h1>
          <ul>
            {
              _.map(games, (game, idx) =>
                <div
                  key={ idx }
                  onClick={ this.handleAddTeam.bind(this, game.id, game.awayTeam) }>
                  <span>
                    { game.awayTeam + ' vs ' + game.homeTeam }
                  </span>
                </div>
              )
            }
          </ul>
        </div>
      </div>
    ) : this.state.addingWager === 'wagerForm' ? (
      <div>
        <form onSubmit={ this.handleAddWager }>
          <label>
            Point Spread:
            <input
              name="pointSpread"
              type="number"
              value={ this.state.pointSpread }
              onChange={ this.handleInputChange } />
          </label>
          <br />
          <label>
            Odds:
            <input
              name="odds"
              type="number"
              value={ this.state.odds }
              onChange={ this.handleInputChange } />
          </label>
          <br />
          <label>
            Amount: $
            <input
              name="amount"
              type="number"
              value={ this.state.amount }
              onChange={ this.handleInputChange } />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    ) : (
      <button
        className={ style.addWager }
        onClick={ this.toggleShowAddWagers.bind(this, 'games') } >
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
