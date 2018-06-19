import React, { Component, PropTypes } from 'react';
import style from './NewWager.css';

export default class NewWager extends Component {

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

  componentDidMount() {

  }

  toggleShowAddWagers = (status) => {
    console.log('toggling');
    // debugger
    this.setState({ addingWager: status });
  };

  handleAddTeam = (gameId, team) => {
    this.setState({
      gameId,
      team
    });

    this.toggleShowAddWagers('wagerForm');
  };

  handleAddWager = (e) => {
    const { gameId, team, pointSpread, odds, amount } = this.state;
    console.log('add game ' + gameId);
    this.props.wagerActions.addWager(gameId, team, pointSpread, odds, amount);
    this.toggleShowAddWagers('button');
    e.preventDefault();
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: parseFloat(value)
    });
  };



  render() {
    const { games, wagers } = this.props;

    // debugger

    const element = this.state.addingWager === 'games' ? (
      <div>
        <div>
          <h1>
            Choose a game to add
            <button onClick={ this.toggleShowAddWagers.bind(this, 'button') } >
              X
            </button>
          </h1>
          <ul>
            {
              _.map(games, (game, idx) =>
                <div
                  key={ idx }
                  onClick={ this.handleAddTeam.bind(this, game.id, game.awayTeam) }
                >
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
        <form onSubmit={ this.handleAddWager } >
          <label>
            Point Spread:
            <select
              name="pointSpread"
              value={ this.state.pointSpread }
              onChange={ this.handleInputChange }
            >
              <option value="-2.5">-2.5</option>
              <option value="-1.5">-1.5</option>
              <option value="0">ML</option>
              <option value="+1.5">+1.5</option>
              <option value="+2.5">+2.5</option>
            </select>
          </label>
          <br />
          <label>
            Odds:
            <input
              name="odds"
              type="number"
              value={ this.state.odds }
              onChange={ this.handleInputChange }
            />
          </label>
          <br />
          <label>
            Amount: $
            <input
              name="amount"
              type="number"
              value={ this.state.amount }
              onChange={ this.handleInputChange }
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    ) : (
      <button
        className={ style.addWager }
        onClick={ this.toggleShowAddWagers.bind(this, 'games') }
      >
        <span>
          ADD WAGER
        </span>
      </button>
    );

    return (
      <div>
        { element }
      </div>
    );
  }
}