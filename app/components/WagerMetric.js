import React, { Component, PropTypes } from 'react';
import style from './WagerMetric.css.css';

export default class WagerMetric extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  render() {
    const { title, value, type } = this.props;

    return (
      <div>
        <div>{ value }</div>
        <div>{ title }</div>
      </div>
    );
  }
}