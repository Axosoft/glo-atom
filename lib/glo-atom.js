'use babel';

import GloAtomView from './glo-atom-view';
import StatusBarView from './status-bar-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  statusBarView: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'glo-atom:toggle': this.toggle
    }));

    this.subscriptions.add(atom.workspace.addOpener(uri => {
      if (uri === 'atom://glo') {
        return new GloAtomView();
      }
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
    this.statusBarView.dispose();
  },

  serialize() {
    return {};
  },

  deserializeView() {
    return new GloAtomView();
  },

  consumeStatusBar(statusBar) {
    this.statusBarView = new StatusBarView(statusBar);
  },

  toggle() {
    atom.workspace.open('atom://glo');
  }

};
