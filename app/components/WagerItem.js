import React, { Component, PropTypes } from 'react';

import style from './WagerItem.css';

import { winP } from '../constants/WinProbs';

export default class WagerItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    wager: PropTypes.object.isRequired,
    deleteWager: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  calcWinP = (awayScore, homeScore, dateTime) => {
    const { pointSpread } = this.props.wager;

    const netHomeScore = homeScore + parseFloat(pointSpread) - awayScore;

    const inning1 = parseInt(dateTime[4]);

    const inning2 = dateTime.slice(0, 3);

    let innBaseOut = (inning2 === "Mid" || inning2 === "Bot") ?
      (1000 * inning1) + 210 : inning2 === "Top" ?
        (1000 * inning1) + 110 : (1000 * (inning1 + 1)) + 110;

    if (innBaseOut > 10000) {
      innBaseOut -= 1000;
    }

    if (dateTime === "FINAL" || dateTime === "Final" || dateTime.slice(0, 5) === "FINAL") {
      return netHomeScore > 0 ? 100 : 0;
    } else if (netHomeScore === parseInt(netHomeScore)) {
      console.log(innBaseOut);
      return winP[innBaseOut][netHomeScore];
    } else {
      console.log(innBaseOut);
      // debugger
      return (winP[innBaseOut][netHomeScore + 0.5] + winP[innBaseOut][netHomeScore - 0.5]) / 2;
    }
  };

  calcBetValue = (homeWinP) => {
    const { game, wager } = this.props;

    const teamWinP = wager.team === game.homeTeam ? homeWinP : 100 - homeWinP;

    const risk = wager.amount;
    const reward = wager.odds > 0 ?
      ((wager.amount / 100) * wager.odds) :
      ((wager.amount / wager.odds) * -100 );

    return parseFloat(((reward * (teamWinP / 100)) - (risk * ((100 - teamWinP) / 100))).toFixed(2));
  };

  handleDelete = () => {
    const { wager, deleteWager } = this.props;

    deleteWager(wager.gameId);
  };

  render() {
    const { game, wager } = this.props;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';

    const pointSpread = wager.pointSpread === 0 ? "ML" : wager.pointSpread;

    const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
      document.getElementById(game.id).classList.contains('final')) &&
      document.getElementById(game.id).getElementsByClassName('date-time')[0]
        .innerText !== "POSTPONED";

    let homeWinP = "N/A";
    let betValue = "N/A";

    if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
      awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      homeWinP = this.calcWinP(parseInt(awayScore), parseInt(homeScore), dateTime);
      betValue = this.calcBetValue(homeWinP);
    }

    return (
      <li className={ style.normal }>
        <div className={ style.wagerItemHeader } >
          <div className={ style.wagerItemHeaderRow } >
            <span>
              { wager.team }
            </span>
            <button
              className={ style.destroy }
              onClick={ this.handleDelete }
            />
          </div>
          <div className={ style.wagerItemHeaderRow } >
            <span>
              { pointSpread }
            </span>
            <span>
              { wager.odds > 0 ? '+' + wager.odds : wager.odds }
            </span>
            <span>$
              { wager.amount }
            </span>
            <span>
              { betValue }
            </span>
          </div>
        </div>

        <label>
          <div>
            <div>
              { game.awayTeam }
            </div>
            <div>
              { game.homeTeam }
            </div>
          </div>

          <div>
            { gameStarted &&
              <div>
                <div>
                  { game.away || '-' }
                </div>
                <div>
                  { game.home || '-' }
                </div>
              </div>
            }
          </div>

          <div>
            { gameStarted &&
              <div>
                <div>
                  { game['date-time'] || '-' }
                </div>
                <div>
                  { homeWinP + '%' }
                </div>
              </div>
            }
          </div>
        </label>
      </li>
    );
  }
}