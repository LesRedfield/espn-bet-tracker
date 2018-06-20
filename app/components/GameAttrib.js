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

    const id = this.props.id;

    const gameTable = document.getElementById(id);

    const teamNames = gameTable.getElementsByClassName('sb-team-short');

    const awayTeam = teamNames[0].innerText;
    const homeTeam = teamNames[1].innerText;

    this.state = {
      awayTeam,
      homeTeam
    };
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

    // Callback function to execute when mutations are observed
    const callback = function(id, value, mutationsList) {
      for(let mutation of mutationsList) {
        if (mutation.type == 'childList') {
          const newValue = mutationsList[1].target.innerText;

          if (this.props.value !== newValue) {
            console.log(this.state.awayTeam + ' vs ' + this.state.homeTeam + ' ' +
              this.props.attrib + ' from ' + this.props.value + ' to ' + newValue);
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
    const { attrib } = this.props;
    let { value } = this.props;

    if (attrib === 'date-time' && value.includes('ET')) {
      const idx = value.indexOf('ET') - 1;
      value = value.slice(0, idx);
    }

    return(
      <span>
        { value }
      </span>

    );
  }
}