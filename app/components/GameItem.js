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

  calcWinP = (awayScore, homeScore, dateTime) => {
    const { winP } = this.props;

    const netHomeScore = homeScore - awayScore;

    const inning1 = parseInt(dateTime[4]);

    const inning2 = dateTime.slice(0, 3);

    let innBaseOut = (inning2 === "Mid" || inning2 === "Bot") ?
      (1000 * inning1) + 210 : inning2 === "Top" ?
        (1000 * inning1) + 110 : (1000 * (inning1 + 1)) + 110;

    if (innBaseOut > 10000) {
      innBaseOut -= 1000;
    }

    if (dateTime === "FINAL") {
      return netHomeScore > 0 ? 100 : 0;
    } else {
      console.log(innBaseOut);
      return winP[innBaseOut][netHomeScore];
    }
  };

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

    let homeWinP = "N/A";

    if (gameStarted && dateTime !== "Delayed" &&
      awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      homeWinP = this.calcWinP(awayScore, homeScore, dateTime);
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
            { gameStarted && homeWinP }
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
