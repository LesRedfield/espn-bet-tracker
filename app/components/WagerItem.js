import React, { Component, PropTypes } from 'react';

import style from './WagerItem.css';

export default class WagerItem extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired,
    wagerActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  render() {


    return (
      <div>WagerItem</div>
    );
  }
}