import React, { Component, PropTypes } from 'react';
import style from './WagerForm.css';


export default class WagerForm extends Component {

  static propTypes = {
    bets: PropTypes.array.isRequired,
    addWager: PropTypes.func.isRequired,
    clearWagerForm: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      betOdds: {},
      odds: 150,
      amount: 100
    };
  }

  handleAddWager = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { bets, clearWagerForm } = this.props;
    const { betOdds, odds, amount } = this.state;

    const betObjs = bets.map(bet => {
      return {
        odds: betOdds[bet.side] || -120,
        gameId: bet.gameId,
        side: bet.side
      };
    });
    this.props.addWager(betObjs, odds, amount);

    // this.setState({
    //   odds: 0,
    //   amount: 0
    // });

    clearWagerForm();
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  updateBetOdds = (side, value) => {
    const betOdds = Object.assign({}, this.state.betOdds);
    betOdds[side] = parseInt(value);
    this.setState({ betOdds });
  };

  render() {
    const { bets, clearWagerForm } = this.props;
    const { odds, amount } = this.state;

    return (
      <div className={ style.wagerFormContainer } >
        <h2>
          Add Wager
        </h2>
        <div className={ style.wagerFormHeader } >
          <div className={ style.betList }>
            {
              bets.map((bet, idx) =>
                <WagerFormInput key={ idx }
                                bet={ bet }
                                idx={ idx }
                                updateBetOdds={ this.updateBetOdds }/>
              )
            }
          </div>
        </div>
        <form onSubmit={ this.handleAddWager } >
          <div className={ style.wagerFormBody } >
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
          <button
            className={ style.destroy }
            onClick={ clearWagerForm }
          />
        </form>
      </div>
    );
  }
}


class WagerFormInput extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      betOdds: -120
    };
  }

  render() {
    // const { bet, idx } = this.props;

    return (
      <div className={ style.betItem }>
        <span>{ this.props.bet.side }</span>
        <div>
          Odds
        </div>
        <span>
          <input
            name="betOdds"
            type="number"
            value={ this.state.betOdds }
            onChange={ this.handleInputChange.bind(this, this.props.bet.side) }
          />
        </span>
      </div>
    );
  }

  handleInputChange = (side, event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.props.updateBetOdds(side, value);
  };
}