import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from '../../app/containers/Root';
import './espnbettracker.css';

window.addEventListener('load', () => {
  console.log('inject js running');

  const scoreboardPage = document.getElementById('scoreboard-page');

  const injectDOM = document.createElement('div');

  injectDOM.style.textAlign = 'center';

  scoreboardPage.prepend(injectDOM);

  const gameContainers = document.getElementById('events')
                                 .getElementsByClassName('scoreboard');

  Array.from(gameContainers).forEach((gameContainer, idx) => {
    const gameAddButton = document.createElement('button');
    gameAddButton.className = "game-add-button";
    gameAddButton.id = "game-add-button-" + (idx + 1);

    gameAddButton.style.marginLeft = '10px';
    gameAddButton.innerText = '+';

    const gameId = gameContainer.id;
    gameAddButton.dataset.gameId = gameId;

    gameContainer.getElementsByClassName('away')[0]
                 .getElementsByClassName('sb-team-short')[0]
                 .parentElement.parentElement
                 .appendChild(gameAddButton);
  });


  // (FOR DEV) => clear state in local storage each page reload
  chrome.storage.local.set({ state: JSON.stringify({}) });


  chrome.storage.local.get('state', (obj) => {
    const { state } = obj;

    const initialState = JSON.parse(state || '{}');

    const createStore = require('../../app/store/configureStore');

    render(
      <Root store={createStore(initialState)} />,
      injectDOM
    );
  });
});
