'use babel';

import {$, TextEditorView, View} from 'atom-space-pen-views'

export default class dialog extends View {
  static content({prompt} = {}) {
    return this.div({class: 'pt-atom-dialog'}, () => {
      this.label(prompt, {class: 'icon', outlet: 'promptText'}),
      this.subview('miniEditor', new TextEditorView({mini: true, placeholderText: 'add search word...'})),
      this.div({class: 'error-message text-error', outlet: 'errorMessage'})
    });
  }

  initialize({input, select, iconClass} = {}) {
    if(iconClass) this.promptText.addClass(iconClass)

    atom.commands.add(this.element, {
      'core:confirm': () => this.onConfirm(this.miniEditor.getText()),
      'core:cancel': () => this.cancel()
    });

    this.miniEditor.on('blur', () => {
      this.close();
    });

    this.miniEditor.getModel().onDidChange( () => {
      this.showError();
    });

    if(input) this.miniEditor.getModel().setText(input);

  }

  attach() {
    this.panel = atom.workspace.addModalPanel({item: this.element});
    this.miniEditor.setText("");
    this.miniEditor.focus();
    this.miniEditor.getModel().scrollToCursorPosition();
  }

  close() {
    let panelToDestroy = this.panel
    this.panel = null;
    if(panelToDestroy) panelToDestroy.destroy();
    atom.workspace.getActivePane().activate();
  }

  cancel() {
    this.close();
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'focus');
  }

  showError(message = '') {
    this.errorMessage.text(message);
    if(message) this.flashError();
  }
}
