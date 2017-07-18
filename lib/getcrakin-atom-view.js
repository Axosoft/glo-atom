'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from 'getcrakin-shared';

export default class GetcrakinAtomView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('getcrakin-atom');
    this.element.classList.add('native-key-bindings');

    ReactDOM.render(
      <AppProvider />,
      this.element
    );
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.element);
    this.element.remove();
  }

  serialize() {
    return {
      deserializer: this.constructor.name
    };
  }

  getURI() {
    return 'atom://getcrakin';
  }

  getTitle() {
    return 'GetCrakin';
  }

}
