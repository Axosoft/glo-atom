'use babel';

import { DISPLAY_NAME, VIEW_URI } from './constants';

export default class StatusBarView {
  constructor(statusBar) {
    this.element = document.createElement('a');
    this.element.setAttribute('href', 'javascript:void()');
    this.element.classList.add('inline-block');
    this.element.textContent = DISPLAY_NAME;

    this.element.addEventListener('click', () => atom.workspace.open(VIEW_URI));

    this.statusBarTile = statusBar.addRightTile({
      item: this.element
    });
  }

  dispose() {
    if (this.statusBarTile) {
      this.statusBarTile.destroy();
      this.statusBarTile = null;
    }

    this.element = null;
  }
}
