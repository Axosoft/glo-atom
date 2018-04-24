'use babel';

import { shell } from 'electron';
import path from 'path';
import config from './config';
import { DISPLAY_NAME, VIEW_URI } from './constants';

const onIpcMessage = ({ channel, args }) => {
  // custom ipc handlers here
  if (channel === 'shell.openExternal') {
    shell.openExternal(args[0]);
  }
};

export default class GloAtomView {

  constructor(serializedState) {
    this.element = document.createElement('webview');
    this.element.classList.add('glo-view', 'native-key-bindings');
    this.element.style.width = '100%';
    this.element.style.height = '100%';

    this.element.setAttribute('preload', path.resolve(__dirname, 'webviewPreload.js'));
    this.element.setAttribute('src', config.appUrl);
    this.element.addEventListener('ipc-message', onIpcMessage);

    this.activePaneListener = atom.workspace.onDidChangeActivePaneItem((item) => {
      if (item === this) {
        // Hacky fix for webviews breaking when they have 'display: none' on them, which Atom will give it when
        // the tab is not active.
        window.setTimeout(() => {
          this.element.style.visibility = 'hidden';
          this.element.style.height = 'calc(100% + 1px)';

          window.requestAnimationFrame(() => {
            this.element.style.height = '100%';
            this.element.style.visibility = '';
          })
        }, 0);
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
    return VIEW_URI;
  }

  getTitle() {
    return DISPLAY_NAME;
  }

}
