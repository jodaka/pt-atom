'use babel';

import Dialog from './dialog';
import searchResultView from './search-result-view';

export default class PtAtomDialogView extends Dialog {

  constructor() {
    super(
      { prompt: 'Enter word of searching',
        input: null,
        select: true,
        iconClass: 'icon-arrow-right'});

  }

  onConfirm(searchStr) {
    if(searchStr) {
      if(!this.resultView) this.resultView = new searchResultView();
      this.resultView.search(searchStr);
      this.close();
    } else {
      this.showError('error');
    }
  }
}
