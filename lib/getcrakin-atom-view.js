'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from 'getcrakin-shared';

export default class GetcrakinAtomView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('getcrakin-atom');

    ReactDOM.render(
      <AppProvider />,
      this.element
    );
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    return 'GetCrakin';
  }

}
