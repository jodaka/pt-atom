'use babel';

import PtAtomDialogView from './pt-atom-dialogview';
import { CompositeDisposable } from 'atom';

export default {

  ptAtomView: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pt-atom:search': () => {
        if(!this.ptAtomView) {
          this.ptAtomView = new PtAtomDialogView(state.ptAtomViewState);
        }
        this.ptAtomView.attach();
      }
    }));

  },

  deactivate() {
    this.ptAtomView.destroy();
  }
};
