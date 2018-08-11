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

    let valueContainer;

    if (attrib === 'outs') {
      valueContainer = document.getElementById(id).getElementsByClassName('sb-detail')[0];
      // debugger
    } else if (attrib === 'bases') {
      valueContainer = document.getElementById(id).getElementsByClassName('sb-detail')[0];
    } else if (attrib === 'date-time') {
      valueContainer = valueParent;
    } else {
      valueContainer = valueParent.getElementsByClassName('total')[0].children[0];
    }

    // account for date-time and score elements being nested at different levels of DOM
    // let valueContainer = attrib === 'date-time' ? valueParent :
    //   valueParent.getElementsByClassName('total')[0].children[0];


    const config = { attributes: true, childList: true };

    if (value === "-") {

      let newValue = valueContainer.innerText;
      if (attrib === 'outs') {
        newValue = valueContainer.getElementsByClassName('outsText')[0].innerText;
      } else if (attrib === 'bases') {
        newValue = valueContainer.getElementsByClassName('status')[0].classList[1].slice(-5);
      }

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

    const callbackOuts = function(id, value, mutationsList) {
      for(let mutation of mutationsList) {
        if (mutation.type == 'childList') {
          const newValue = mutationsList[1] ? mutationsList[1].target.getElementsByClassName('outsText')[0].innerText : mutationsList[1];

          if (mutationsList[1] && this.props.value !== newValue) {
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

    const callbackBases = function(id, value, mutationsList) {
      for(let mutation of mutationsList) {
        if (mutation.type == 'childList') {
          // console.log(mutationsList[1].target.getElementsByClassName('status')[0]);
          const newValue = mutationsList[1] ? mutationsList[1].target.getElementsByClassName('status')[0].classList[1].slice(-5) : mutationsList[1];

          if (mutationsList[1] && this.props.value !== newValue) {
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

    let observer;
    if (attrib === 'outs') {
      observer = new MutationObserver(callbackOuts.bind(this, id, value));
    } else if (attrib === 'bases') {
      observer = new MutationObserver(callbackBases.bind(this, id, value));
    } else {
      observer = new MutationObserver(callback.bind(this, id, value));
    }

    // Create an observer instance linked to the callback function
    // const observer = new MutationObserver(callback.bind(this, id, value));

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