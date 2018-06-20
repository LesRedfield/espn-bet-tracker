import { winP } from '../constants/WinProbs';

export function calcHomeSpreadWinP(awayScore, homeScore, dateTime, homePointSpread = 0) {
  const netHomeScore = parseInt(homeScore) + parseFloat(homePointSpread) - parseInt(awayScore);

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
    return parseFloat(((winP[innBaseOut][netHomeScore + 0.5] + winP[innBaseOut][netHomeScore - 0.5]) / 2).toFixed(2));
  }
}

export function calcBetValue(game, wager) {
  const { homeTeam } = game;
  const awayScore = parseInt(game.away);
  const homeScore = parseInt(game.home);
  const dateTime = game['date-time'];
  const { team, odds, amount } = wager;
  const pointSpread = parseFloat(wager.pointSpread);
  const homeSpreadWinP = calcHomeSpreadWinP(awayScore, homeScore, dateTime, pointSpread);
  const teamSpreadWinP = team === homeTeam ? homeSpreadWinP :
    parseFloat((100 - homeSpreadWinP).toFixed(2));
  const risk = amount;
  const reward = odds > 0 ? ((risk / 100) * odds) :
    ((risk / odds) * -100 );

  return parseFloat(
    (
      (reward * (teamSpreadWinP / 100)) - (risk * ((100 - teamSpreadWinP) / 100))
    ).toFixed(2)
  );
}