'use babel';

export default class StatusBarView {
  constructor(statusBar) {
    this.element = document.createElement('a');
    this.element.setAttribute('href', 'javascript:void()');
    this.element.classList.add('inline-block');
    this.element.textContent = 'GK Glo';

    this.element.addEventListener('click', () => atom.workspace.open('atom://getcrakin'));

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
