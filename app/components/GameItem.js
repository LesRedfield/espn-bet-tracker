import React, { Component, PropTypes } from 'react';
import GameAttrib from './GameAttrib';
import style from './GameItem.css';


export default class GameItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    winP: PropTypes.object.isRequired,
    editGame: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired,
    updateGameAttrib: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    const id = this.props.game.id;

    const gameTable = document.getElementById(id);

    const teamNames = gameTable.getElementsByClassName('sb-team-short');

    const awayTeamName = teamNames[0].innerText;
    const homeTeamName = teamNames[1].innerText;

    this.state = {
      awayTeamName,
      homeTeamName
    };
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props.game) !== JSON.stringify(nextProps.game));
  }

  componentDidMount() {

  }

  handleDelete = () => {
    const { game, deleteGame } = this.props;

    deleteGame(game.id);
  };

  render() {
    const { game, updateGameAttrib, winP } = this.props;
    const { awayTeamName, homeTeamName } = this.state;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';
    const gameStarted = document.getElementById(game.id).classList.contains('live') ||
                        document.getElementById(game.id).classList.contains('final');

    // const gameStarted = false;

    // debugger

    console.log(game);

    // if (dateTime === '-') {
    //   console.log('dateTime is -!');
    //   console.log(game);
    // }

    let homeWinP = "N/A";

    if (awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      // let innBaseOut = "";
      const netHomeScore = parseInt(homeScore) - parseInt(awayScore);

      //hardcode test - need to parse date-time string
      const innBaseOut = 3210;

      homeWinP = winP[innBaseOut][netHomeScore];
    }




    const element = (
      <div className={ style.view }>
        <label>
          <span>{ game.id }</span>

          <span>{ awayTeamName }</span>
          <span>
            { gameStarted &&
                <GameAttrib
                  id={ game.id }
                  attrib="away"
                  value={ awayScore }
                  updateGameAttrib={ updateGameAttrib }
                />
            }
          </span>

          <span>{ homeTeamName }</span>
          <span>
            { gameStarted &&
                <GameAttrib
                  id={ game.id }
                  attrib="home"
                  value={ homeScore }
                  updateGameAttrib={ updateGameAttrib }
                />
            }
          </span>

          <span>
            <GameAttrib
              id={ game.id }
              attrib="date-time"
              value={ dateTime }
              updateGameAttrib={ updateGameAttrib }
            />
          </span>

          <span>
            { gameStarted &&
                <div>
                  { homeWinP }
                </div>
            }
          </span>

        </label>
        <button
          className={ style.destroy }
          onClick={ this.handleDelete }
        />
      </div>
    );


    return (
      <li className={ style.normal }>
        { element }
      </li>
    );
  }
}
