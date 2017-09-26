'use babel';

// TODO: remove dependencies
// import React from 'react';
// import ReactDOM from 'react-dom';
import path from 'path';

const onIpcMessage = ({ channel, args }) => {
  // switch (channel) {
  //   case 'card-added':
  //     atom.notifications.addInfo('Card Created: ' + args[0]);
  // }
}

export default class GetcrakinAtomView {

  constructor(serializedState) {
    this.element = document.createElement('webview');
    this.element.classList.add('glo-view', 'native-key-bindings');
    this.element.style.width = '100%';
    this.element.style.height = '100%';

    this.element.setAttribute('preload', path.resolve(__dirname, 'webviewPreload.js'));
    this.element.setAttribute('src', 'http://localhost:3000/boards/');
    this.element.addEventListener('ipc-message', onIpcMessage);

    this.hasBeenActive = false;

    this.activePaneListener = atom.workspace.onDidChangeActivePaneItem((item) => {
      if (item === this) {
        // Hacky fix for webviews breaking when they have 'display: none' on them, which Atom will give it when
        // the tab is not active. However...there's yet another bug where a webview that has 'visibility: hidden'
        // when loaded will stay hidden permanently... so we don't do this the first time.
        if (!this.hasBeenActive) {
          this.hasBeenActive = true;
          return;
        }

        window.requestAnimationFrame(() => {
          this.element.style.visibility = 'hidden';
          this.element.style.height = 'calc(100% + 1px)';

          window.requestAnimationFrame(() => {
            this.element.style.height = '100%';
            this.element.style.visibility = '';
          })
        });
      }
    });
  }

  destroy() {
    this.activePaneListener.dispose();
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
    return 'Glo';
  }

}
