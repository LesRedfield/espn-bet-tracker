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

  const teamNameAbbrevContainers = document.getElementsByClassName('sb-team-abbrev');

  Array.from(teamNameAbbrevContainers).forEach((teamNameAbbrevContainer, idx) => {
    const box = document.createElement('button');
    box.className = "team-add-button";
    box.id = "team-add-button-" + (idx + 1);

    box.style.marginLeft = '10px';
    box.innerText = '+';

    const teamName = teamNameAbbrevContainer.parentElement.children[0].innerText;
    box.dataset.teamName = teamName;

    teamNameAbbrevContainer.parentElement.parentElement.appendChild(box);
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
