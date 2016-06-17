'use babel';

import {SelectListView} from 'atom-space-pen-views';
import {MessagePanelView, PlainMessageView, LineMessageView} from 'atom-message-panel';

export default class ResultView extends SelectListView {

  initialize() {
    super.initialize();
    this.fragment = "";
    this.addClass('overlay from-top');
    this.setItems(['hello', 'world']);
    if(!this.panel) {
      this.panel = atom.workspace.addBottomPanel({item: this});
    }
    this.panel.show();
    this.focusFilterEditor();
  }

  viewForItem(item) {
    return `<li>${item}</li>`;
  }

  confirmed(item) {
    console.info(`${item} was selected`);
  }

  cancelled() {
    console.info(`this view was cancelled`);
  }

  preresult() {
    if(this.message) this.message.close();
    this.message = new MessagePanelView({title: "this is test message view"});
    this.message.clear();
    this.message.attach();
  }

  data(chunk) {
    if(chunk == "") return;
    let lines = chunk.split("\n");
    lines[0] = this.fragment + lines[0];
    this.fragment = lines.pop();
    lines.forEach( (line) => {
      console.info(line);
      this.message.add(new LineMessageView({
        message: line,
        line: 1,
        character: 2,
        className: 'text-error'
      }));
      // this.message.add(new PlainMessageView({
      //   message: line,
      //   className: 'text-success'
      // }));
    });
  }

  clean() {
    this.fragment = "";
  }
}
