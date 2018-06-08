import React, { Component, PropTypes } from 'react';
import style from './GameItem.css';

export default class GameItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    editGame: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired
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
    const id = this.props.game.id;

    const dateTimeContainer = document.getElementById(id).getElementsByClassName('date-time')[0];

    const config = { attributes: true, childList: true };

    const oldDateTime = this.props.game.dateTime;

    if (!oldDateTime) {

      const newGame = { ...this.props.game, ['dateTime']: dateTimeContainer.innerText };

      // debugger

      this.props.updateDateTime(id, newGame);
    }

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
    const { game } = this.props;
    const { awayTeamName, homeTeamName } = this.state;
    const awayTeamScore = this.props.game.awayTeamScore || '-';
    const homeTeamScore = this.props.game.homeTeamScore || '-';
    const dateTime = this.props.game.dateTime || '-';

    const element = (
      <div className={ style.view }>
        <label>
          <span>{ awayTeamName }</span>
          <span>{ awayTeamScore }</span>

          <span>{ homeTeamName }</span>
          <span>{ homeTeamScore }</span>

          <span>{ dateTime }</span>

        </label>
        <button
          className={ style.destroy }
          onClick={ this.handleDelete }
        />
      </div>
    );


    return (
      <li className={ style.normal }>
        {element}
      </li>
    );
  }
}
