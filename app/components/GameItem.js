import React, { Component, PropTypes } from 'react';
import GameAttrib from './GameAttrib';
import style from './GameItem.css';

export default class GameItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
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

  componentDidMount() {
    // const id = this.props.game.id;
    //
    // const dateTimeContainer = document.getElementById(id).getElementsByClassName('date-time')[0];
    //
    // const config = { attributes: true, childList: true };
    //
    // const oldDateTime = this.props.game.dateTime;


    // // Callback function to execute when mutations are observed
    // const callback = function(id, oldDateTime, mutationsList) {
    //   for(let mutation of mutationsList) {
    //     // const removedDateTime = mutationsList[0].removedNodes[0].nodeValue;
    //     const addedDateTime = mutationsList[1].addedNodes[0].nodeValue;
    //
    //     if (mutation.type == 'childList') {
    //       // console.log('A child node has been added or removed.');
    //
    //       if (oldDateTime !== addedDateTime) {
    //         this.props.editGame(id, addedDateTime);
    //       }
    //     }
    //     else if (mutation.type == 'attributes') {
    //       // console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //     }
    //   }
    // };
    //
    // // Create an observer instance linked to the callback function
    // const observer = new MutationObserver(callback.bind(this, id, oldDateTime));
    //
    // // Start observing the target node for configured mutations
    // observer.observe(dateTimeContainer, config);
  }

  handleDelete = () => {
    const { game, deleteGame } = this.props;

    deleteGame(game.id);
  };

  render() {
    const { game, updateGameAttrib } = this.props;
    const { awayTeamName, homeTeamName } = this.state;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';
    const gameStarted = document.getElementById(game.id).classList.contains('live') ||
                        document.getElementById(game.id).classList.contains('final');

    // const gameStarted = false;

    // debugger

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
                  updateGameAttrib={ updateGameAttrib } />
            }
          </span>

          <span>{ homeTeamName }</span>
          <span>
            { gameStarted &&
                <GameAttrib
                  id={ game.id }
                  attrib="home"
                  value={ homeScore }
                  updateGameAttrib={ updateGameAttrib } />
            }
          </span>

          <span>
            <GameAttrib
              id={ game.id }
              attrib="date-time"
              value={ dateTime }
              updateGameAttrib={ updateGameAttrib } />
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
