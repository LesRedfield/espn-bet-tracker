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
      odds: 150,
      amount: 100
    };
  }

  handleAddWager = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { bets, clearWagerForm } = this.props;
    const { odds, amount } = this.state;
    this.props.addWager(bets, odds, amount);

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

  render() {
    const { bets } = this.props;
    const { odds, amount } = this.state;

    return (
      <div className={ style.wagerFormContainer }>
        <div className={ style.wagerFormHeader }>
          <div className={ style.betList }>
            {
              bets.map((bet, idx) =>
                <div
                  key={ idx }
                  className={ style.betItem }
                >
                  { bet.side }
                </div>
              )
            }
          </div>
          {/*<button*/}
            {/*className={ style.destroy }*/}
            {/*onClick={ toggleWagerForm }*/}
          {/*/>*/}
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
        </form>
      </div>
    );
  }
}
