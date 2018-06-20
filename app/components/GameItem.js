import React, { Component, PropTypes } from 'react';
import GameAttrib from './GameAttrib';
import WagerForm from './WagerForm';
import style from './GameItem.css';

import { calcHomeSpreadWinP } from '../utils/helpers';

export default class GameItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    editGame: PropTypes.func.isRequired,
    updateGameAttrib: PropTypes.func.isRequired,
    addWager: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      wagerForm: false,
      addTeam: 'none'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(this.props.game) !== JSON.stringify(nextProps.game)) ||
            this.state.wagerForm !== nextState.wagerForm;
  }

  toggleWagerForm = () => {
    console.log('toggling');
    // debugger
    this.setState(prevState => ({
      wagerForm: !prevState.wagerForm
    }));
  };

  handleAddTeam = (gameId, addTeam) => {
    this.setState({
      gameId,
      addTeam
    });

    this.toggleWagerForm();
  };

  render() {
    const { game, updateGameAttrib, addWager } = this.props;
    const { wagerForm, addTeam } = this.state;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';
    const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
                        document.getElementById(game.id).classList.contains('final')) &&
                        document.getElementById(game.id).getElementsByClassName('date-time')[0]
                          .innerText !== "POSTPONED";

    let homeWinP = "N/A";

    if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
      awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      homeWinP = calcHomeSpreadWinP(awayScore, homeScore, dateTime);
    }

    const element = (
      <div className={ style.view }>
        <label>
          <div className={ style.gameColumn }>
            <div>
              <div
                className={ style.addTeam }
                onClick={ this.handleAddTeam.bind(this, game.id, game.awayTeam) }
              >{ game.awayTeam }</div>
              <div
                className={ style.addTeam }
                onClick={ this.handleAddTeam.bind(this, game.id, game.homeTeam) }
              >{ game.homeTeam }</div>
            </div>
          </div>
          <div className={ style.gameColumn }>
            <div>
              { gameStarted &&
                <div>
                  <div>
                    <GameAttrib
                      id={ game.id }
                      attrib="away"
                      value={ awayScore }
                      updateGameAttrib={ updateGameAttrib }
                    />
                  </div>
                  <div>
                    <GameAttrib
                      id={ game.id }
                      attrib="home"
                      value={ homeScore }
                      updateGameAttrib={ updateGameAttrib }
                    />
                  </div>
                </div>
              }
            </div>
          </div>

          <div className={ style.gameColumn }>
            <div>
              <GameAttrib
                id={ game.id }
                attrib="date-time"
                value={ dateTime }
                updateGameAttrib={ updateGameAttrib }
              />
            </div>
            <div>
              { gameStarted && homeWinP + '%' }
            </div>
          </div>
        </label>
        <div>
          { wagerForm &&
            <WagerForm
              gameId={ game.id }
              addTeam={ addTeam }
              addWager={ addWager }
              toggleWagerForm={ this.toggleWagerForm }
            />
          }
        </div>
      </div>
    );

    return (
      <li className={ style.normal }>
        { element }
      </li>
    );
  }
}
