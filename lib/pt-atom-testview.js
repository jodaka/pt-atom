'use babel';

import {TextEditorView} from 'atom-space-pen-views'
import {CompositeDisposable} from 'atom'
import $ from 'jquery'

export default class TestView {

  element = $('<div>').attr('id, pt-atom');
  editor = new TextEditorView({
    mini: true,
    softTab: false,
    placeholderText: 'Hogehoge'
  });

  constructor () {
    this.editor.appendTo(this.element);
  }

  toggle() {
    if(this.panel && this.panel.isVisible()) {
      this.close();
    } else {
      this.show();
    }
  }

  show() {
    if(this.panel == null) {
      this.panel = atom.workspace.addModalPanel({item: this});
    }
    this.panel.show();
  }
}
