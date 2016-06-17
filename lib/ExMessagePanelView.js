'use babel';

import {MessagePanelView} from 'atom-message-panel';

export default class ExMessagePanelView extends MessagePanelView {

  initialize(options) {
    super.initialize(options);
    atom.commands.add(this.element, {
      'core:cancel': () => this.cancel()
    });
  }

  attach() {
    super.attach();
    this.focus();
  }

  cancel() {
    this.close();
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'focus');
  }
}
