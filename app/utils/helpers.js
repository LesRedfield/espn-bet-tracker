import { winP } from '../constants/WinProbs';

export function calcHomeSpreadWinP(awayScore, homeScore, dateTime, homePointSpread = 0) {
  let netHomeScore = parseInt(homeScore) + parseFloat(homePointSpread) - parseInt(awayScore);
  if (netHomeScore > 15) {
    netHomeScore = 15;
  }
  if (netHomeScore < -15) {
    netHomeScore = -15;
  }

  const inning1 = parseInt(dateTime[4]);

  const inning2 = dateTime.slice(0, 3);

  let innBaseOut = (inning2 === "Mid" || inning2 === "Bot") ?
    (1000 * inning1) + 210 : inning2 === "Top" ?
      (1000 * inning1) + 110 : (1000 * (inning1 + 1)) + 110;

  if (innBaseOut > 10000) {
    innBaseOut -= 1000;
  }

  // debugger

  if (dateTime === "FINAL" || dateTime === "Final" || dateTime.slice(0, 5) === "FINAL") {
    return netHomeScore > 0 ? 100 : 0;
  } else if (netHomeScore === parseInt(netHomeScore)) {
    return winP[innBaseOut][netHomeScore];
  } else {
    return Math.round(
      ((winP[innBaseOut][netHomeScore + 0.5] + winP[innBaseOut][netHomeScore - 0.5]) / 2) * 100
    ) / 100;
  }
}

export function calcWagerValue(wagerObj) {
  const { betObjs, odds, amount } = wagerObj;

  const betWinPs = betObjs.map(betObj => {
    const { side, game } = betObj;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';

    const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
      document.getElementById(game.id).classList.contains('final')) &&
      document.getElementById(game.id).getElementsByClassName('date-time')[0]
        .innerText !== 'POSTPONED';
    if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
      awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      const homeWinP = calcHomeSpreadWinP(parseInt(awayScore), parseInt(homeScore), dateTime);
      return side === game.homeTeam ? homeWinP : Math.round((100 - homeWinP) * 100) / 100;
    } else {
      return oddsToWinP(betObj.odds); //replace with betOdds win%
    }
  });
  const wagerWinP = 100 * betWinPs.reduce((acc, val) => acc * (val / 100), 1);
  const risk = amount;
  const reward = odds > 0 ? ((risk / 100) * odds) :
    ((risk / odds) * -100);

  // debugger

  return Math.round(
    ((reward * (wagerWinP / 100)) - (risk * ((100 - wagerWinP) / 100))) * 100
  ) / 100;
}

export function oddsToWinP(odds) {
  return 50;
}