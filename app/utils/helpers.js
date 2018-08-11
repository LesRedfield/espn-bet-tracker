import { winP } from '../constants/WinProbs';
import { BASE_CODES } from '../constants/BaseCodes';

export function calcHomeSpreadWinP(awayScore, homeScore, dateTime, outs, bases, homePointSpread = 0) {
  let netHomeScore = parseInt(homeScore) + parseFloat(homePointSpread) - parseInt(awayScore);
  if (netHomeScore > 15) {
    netHomeScore = 15;
  }
  if (netHomeScore < -15) {
    netHomeScore = -15;
  }
  if (dateTime === "FINAL" || dateTime === "Final" || dateTime.slice(0, 5) === "FINAL") {
    return netHomeScore > 0 ? 100 : 0;
  }

  let inning1 = parseInt(dateTime[4]);
  if (!isNaN(parseInt(dateTime[5]))) {
    inning1 = (inning1 * 10) + parseInt(dateTime[5]);
  }

  const inning2 = dateTime.slice(0, 3);

  //inning
  let innBaseOut = (inning2 === "Mid" || inning2 === "Bot") ?
    (1000 * inning1) + 200 : inning2 === "Top" ?
      (1000 * inning1) + 100 : (1000 * (inning1 + 1)) + 100;

  //bases
  let basesKey = bases;
  if (basesKey === '-') {
    basesKey = '0-0-0';
  }
  innBaseOut += (BASE_CODES[basesKey] * 10);

  //outs
  if (outs === 1) {
    innBaseOut += 1;
  } else if (outs > 1) {
    innBaseOut += 2;
  }

  //extra innings reset
  while (innBaseOut > 10000) {
    innBaseOut -= 1000;
  }

  console.log(netHomeScore, BASE_CODES[basesKey], innBaseOut);

  if (netHomeScore === parseInt(netHomeScore)) {
    return winP[innBaseOut][netHomeScore];
  } else {
    return Math.round(
      ((winP[innBaseOut][netHomeScore + 0.5] + winP[innBaseOut][netHomeScore - 0.5]) / 2) * 100
    ) / 100;
  }
}

export function calcWagerValue(wagerObj, shouldGetWinP = false) {
  const { betObjs, odds, amount } = wagerObj;

  const betWinPs = betObjs.map(betObj => {
    const { side, game } = betObj;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';
    const outs = game['outs'] || '-';
    const bases = game['bases'] || '-';

    const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
      document.getElementById(game.id).classList.contains('final')) &&
      document.getElementById(game.id).getElementsByClassName('date-time')[0]
        .innerText !== 'POSTPONED';
    if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
      awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      const homeWinP = calcHomeSpreadWinP(parseInt(awayScore), parseInt(homeScore), dateTime, parseInt(outs), bases);
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
  const wagerValue = Math.round(
    ((reward * (wagerWinP / 100)) - (risk * ((100 - wagerWinP) / 100))) * 100
  ) / 100;

  if (shouldGetWinP) {
    return {
      wagerValue,
      wagerWinP: Math.round(wagerWinP * 10) / 10
    };
  } else {
    return wagerValue;
  }

  // return Math.round(
  //   ((reward * (wagerWinP / 100)) - (risk * ((100 - wagerWinP) / 100))) * 100
  // ) / 100;
}

export function oddsToWinP(odds) {
  return 50;
}

