'use babel';

import { CompositeDisposable } from 'atom';
import { VIEW_URI } from './constants';
import GloAtomView from './glo-atom-view';
import StatusBarView from './status-bar-view';

export default {

  subscriptions: null,
  statusBarView: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that opens this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'glo:open': this.open
    }));

    this.subscriptions.add(atom.workspace.addOpener(uri => {
      if (uri === VIEW_URI) {
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

  open() {
    atom.workspace.open(VIEW_URI);
  }

};
