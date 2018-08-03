import React, { Component, PropTypes } from 'react';
import GamesList from './GamesList';
import Dashboard from './Dashboard';
import WagerForm from './WagerForm';
import style from './MainSection.css';

export default class MainSection extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired,
    wagerActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      bets: []
    };
  }

  componentDidMount() {
    const gameContainers = document.getElementById('events').
    getElementsByClassName('scoreboard');

    Array.from(gameContainers).forEach(function(gameContainer) {

      const id = gameContainer.id;

      const teamNames = gameContainer.getElementsByClassName('sb-team-short');

      const awayTeam = teamNames[0].innerText;
      const homeTeam = teamNames[1].innerText;

      this.props.gameActions.addGame(id, awayTeam, homeTeam);
    }, this);
  }

  addBet = (gameId, side) => {
    //need to validate that gameId-side combo isn't already added to this.state.bets
    this.setState(prevState => {
      bets: prevState.bets.push({
        gameId,
        side
      });
    });
  };

  clearWagerForm = () => {
    this.setState({
      bets: []
    });
  };

  //need remove bet from wager form function

  render() {
    const { games, wagers, gameActions, wagerActions } = this.props;

    const { bets } = this.state;

    return (
      <section className={ style.main }>
        <h1>
          ESPN Bet Tracker
        </h1>
          {
            bets.length > 0 ? (
              <WagerForm
                bets={ bets }
                addWager={ wagerActions.addWager }
                clearWagerForm={ this.clearWagerForm }
              />
            ) : (
              <Dashboard
                games={ games }
                wagers={ wagers }
                wagerActions={ wagerActions }
                bets={ this.state.bets }
              />
            )
          }
        <GamesList
          games={ games }
          gameActions={ gameActions }
          // addWager={ wagerActions.addWager }
          addBet={ this.addBet }
        />
      </section>
    );
  }
}
