'use babel';

import {CompositeDisposable} from 'atom'
import Dialog from './dialog'
import path from 'path'

export default class PtAtomDialogView extends Dialog {

  constructor() {

    super(
      { prompt: 'Enter word of searching',
        input: null,
        select: true,
        iconClass: 'icon-arrow-right'});

  }

  onConfirm(search) {
    if(search) {
      console.log(search);
      this.close();
    } else {
      this.showError('error')
    }
  }
}
