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

  handleAddWager = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { gameId, addTeam, toggleWagerForm } = this.props;
    const { pointSpread, odds, amount } = this.state;
    this.props.addWager(gameId, addTeam, pointSpread, odds, amount);

    this.setState({
      pointSpread: 0,
      odds: 0,
      amount: 0
    });

    toggleWagerForm();
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { addTeam, toggleWagerForm } = this.props;
    const { pointSpread, odds, amount } = this.state;

    return (
      <div className={ style.wagerFormContainer }>
        <div className={ style.wagerFormHeader }>
          <div>
            { addTeam }
          </div>
          <button
            className={ style.destroy }
            onClick={ toggleWagerForm }
          />
        </div>
        <form onSubmit={ this.handleAddWager } >
          <div className={ style.wagerFormBody } >
            <div className={ style.wagerFormColumn } >
              <div>
                Line
              </div>
              <div>
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
              </div>
            </div>
            <div className={ style.wagerFormColumn } >
              <div>
                Odds
              </div>
              <div>
                <input
                  name="odds"
                  type="number"
                  value={ odds }
                  onChange={ this.handleInputChange }
                />
              </div>
            </div>
            <div className={ style.wagerFormColumn } >
              <div>
                Amount
              </div>
              <div>
                <input
                  name="amount"
                  type="number"
                  placeholder="$"
                  value={ amount }
                  onChange={ this.handleInputChange }
                />
              </div>
            </div>
          </div>
          <div className={ style.wagerFormFooter } >
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
