import React, { Component, PropTypes } from 'react';
import style from './GameAttrib.css';

export default class GameAttrib extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    attrib: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    updateGameAttrib: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    // const id = this.props.game.id;
    //
    // const gameTable = document.getElementById(id);
    //
    // const teamNames = gameTable.getElementsByClassName('sb-team-short');
    //
    // const awayTeamName = teamNames[0].innerText;
    // const homeTeamName = teamNames[1].innerText;
    //
    // this.state = {
    //   awayTeamName,
    //   homeTeamName
    // };
  }

  componentDidMount() {
    const { id, attrib, value, updateGameAttrib } = this.props;

    const valueParent = document.getElementById(id).getElementsByClassName(attrib)[0];

    // debugger

    // account for date-time and score elements being nested at different levels of DOM
    const valueContainer = attrib === 'date-time' ? valueParent :
      valueParent.getElementsByClassName('total')[0].children[0];

    // debugger

    const config = { attributes: true, childList: true };

    if (value === "-") {

      const newValue = valueContainer.innerText;

      // debugger

      updateGameAttrib(id, attrib, newValue);
    }

    // * * * * *
    //need to fix observer callback for scores, addedNodes is empty (works for dateTime)
    // * * * * *

    // Callback function to execute when mutations are observed
    const callback = function(id, value, mutationsList) {
      // debugger
      for(let mutation of mutationsList) {
        // const removedDateTime = mutationsList[0].removedNodes[0].nodeValue;


        if (mutation.type == 'childList') {
          if (this.props.attrib !== 'date-time') {
            console.log(mutation);
            console.log(mutationsList);


            debugger
          }
          // debugger

          // console.log('A child node has been added or removed.');
          const newValue = mutationsList[1].addedNodes[0].nodeValue;

          if (value !== newValue) {
            this.props.updateGameAttrib(id, this.props.attrib, newValue);
          }
        }
        else if (mutation.type == 'attributes') {
          // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback.bind(this, id, value));

    // Start observing the target node for configured mutations
    observer.observe(valueContainer, config);
  }

  render() {

    return(

      <span>
        { this.props.value }
      </span>

    );
  }
}