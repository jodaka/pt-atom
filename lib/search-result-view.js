'use babel';

import {LineMessageView} from 'atom-message-panel';
import ExMessagePanelView from './ExMessagePanelView';

export default class SearchResultView {

  constructor() {
    this.clearFragment();
  }

  preresult() {
    if(this.message) this.message.close();
    this.message = new ExMessagePanelView({title: "this is test message view"});
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
    });
  }

  clean() {
    this.clearFragment();
  }

  clearFragment() {
    this.fragment = "";
  }
}
