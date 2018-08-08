import React, { Component, PropTypes } from 'react';
import style from './WagerMetric.css';

export default class WagerMetric extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { title, value, type } = this.props;

    const prefix = value === 0 ? '$' : value > 0 ? '+$' : '-$';
    const displayVal = value === parseInt(value) ?
      Math.abs(value) : Math.abs(value).toFixed(2);

    let valClass = style.wagerMetricValue;
    if (value > 0) {
      valClass += ' ' + style.winner;
    } else if (value < 0) {
      valClass += ' ' + style.loser;
    }

    return (
      <div>
        <div className={ valClass } >
          { prefix + displayVal }
        </div>
        <div className={ style.wagerMetricTitle } >
          { title }
        </div>
      </div>
    );
  }
}