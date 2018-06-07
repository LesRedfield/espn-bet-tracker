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
  }

  componentDidMount() {
    const dateTimeContainer = this.props.game.gameTable.getElementsByClassName('date-time')[0];

    const config = { attributes: true, childList: true };

    const id = this.props.game.id;

    const oldDateTime = this.props.game.dateTime;

    if (oldDateTime === 'dateTime') {
      this.props.editGame(id, dateTimeContainer.innerText);
    }

    // Callback function to execute when mutations are observed
    const callback = function(id, oldDateTime, mutationsList) {
      for(let mutation of mutationsList) {
        // const removedDateTime = mutationsList[0].removedNodes[0].nodeValue;
        const addedDateTime = mutationsList[1].addedNodes[0].nodeValue;

        if (mutation.type == 'childList') {
          // console.log('A child node has been added or removed.');

          if (oldDateTime !== addedDateTime) {
            this.props.editGame(id, addedDateTime);
          }
        }
        else if (mutation.type == 'attributes') {
          // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback.bind(this, id, oldDateTime));

    // Start observing the target node for configured mutations
    observer.observe(dateTimeContainer, config);
  }

  handleDelete = () => {
    const { game, deleteGame } = this.props;
    deleteGame(game.id);
  };

  render() {
    const { game } = this.props;

    const element = (
      <div className={ style.view }>
        <label>
          <span>{ game.teamName }</span>
          <span>{ game.dateTime }</span>
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
