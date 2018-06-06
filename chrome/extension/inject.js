import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from '../../app/containers/Root';
// import './espnbettracker.css';

window.addEventListener('load', () => {
  console.log('inject js running');

  const scoreboardPage = document.getElementById('scoreboard-page');

  const injectDOM = document.createElement('div');

  injectDOM.style.textAlign = 'center';

  scoreboardPage.prepend(injectDOM);

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
