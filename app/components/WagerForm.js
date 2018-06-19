import React, { Component, PropTypes } from 'react';
import style from './WagerForm.css';


export default class WagerForm extends Component {

  static propTypes = {
    gameId: PropTypes.string.isRequired,
    addTeam: PropTypes.string.isRequired,
    addWager: PropTypes.func.isRequired,
    toggleWagerForm: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      pointSpread: 0,
      odds: 150,
      amount: 200
    };
  }

  componentDidMount() {

  }

  handleAddWager = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { gameId, addTeam, toggleWagerForm } = this.props;
    const { pointSpread, odds, amount } = this.state;
    console.log('add game ' + gameId);
    this.props.addWager(gameId, addTeam, pointSpread, odds, amount);

    this.setState({
      pointSpread: 0,
      odds: 0,
      amount: 0
    });

    toggleWagerForm();

    // e.preventDefault();
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: parseFloat(value)
    });
  };

  render() {
    const { addTeam } = this.props;
    const { pointSpread, odds, amount } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleAddWager } >
          <label>
            Point Spread:
            <select
              name="pointSpread"
              value={ pointSpread }
              onChange={ this.handleInputChange }
            >
              <option value="-2.5">-2.5</option>
              <option value="-1.5">-1.5</option>
              <option value="0">ML</option>
              <option value="+1.5">+1.5</option>
              <option value="+2.5">+2.5</option>
            </select>
          </label>
          <br />
          <label>
            Odds:
            <input
              name="odds"
              type="number"
              value={ odds }
              onChange={ this.handleInputChange }
            />
          </label>
          <br />
          <label>
            Amount: $
            <input
              name="amount"
              type="number"
              value={ amount }
              onChange={ this.handleInputChange }
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
