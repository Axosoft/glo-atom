'use babel';

import GetcrakinAtomView from './getcrakin-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'getcrakin-atom:toggle': this.toggle
    }));

    this.subscriptions.add(atom.workspace.addOpener(uri => {
      if (uri === 'atom://getcrakin') {
        return new GetcrakinAtomView();
      }
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  deserializeView() {
    return new GetcrakinAtomView();
  },

  toggle() {
    atom.workspace.open('atom://getcrakin');
  }

};
