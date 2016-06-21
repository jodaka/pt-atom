'use babel';

import {LineMessageView} from 'atom-message-panel';
import ExMessagePanelView from './ExMessagePanelView';
import * as child from 'child_process';

export default class SearchResultView {

  constructor() {
    this.clearFragment();
  }

  search(searchStr) {
    if(this.message) {
      this.message.clear();
    } else {
      this.message = new ExMessagePanelView({title: "search result:"});
    }
    this.message.attach();
    this.execute(searchStr);
  }

  execute(searchStr) {
    this.pwd = atom.project.getPaths();
    //TODO: switch pt command options, OSX/Linux/Windows
    let pt = child.spawn('pt', ['/nogroup', '/nocolor', '/column', '/e', `${searchStr}`, `${this.pwd}`]);

    pt.stdout.setEncoding('utf8');
    pt.stdout.on('data', (chunk) => {
      this.data(chunk);
    });

    pt.stderr.on('data', (data) => {
      console.error(data);
    });

    pt.on('exit', (code) => {
      if(code != 0) {
        atom.notifications.addFatalError(`pt error code: ${code}`, {detail: 'detail string',dismissable: true});
      }
      this.clearFragment();
    });
  }

  data(chunk) {
    if(chunk == "") return;
    let lines = chunk.split("\n");
    lines[0] = this.fragment + lines[0];
    this.fragment = lines.pop();
    lines.forEach( (line) => {
      let val = this.separater(line);
      this.message.add(new LineMessageView({
        file: val.file,
        line: val.line,
        character: val.column,
        message: val.desc,
        className: 'text-success'
      }));
    });
  }

  separater(line) {
    let baseline = line.replace(this.pwd, "");
    let props = ['file','line','column','desc'];
    let result = {};
    let index = 0;
    let len = props.length;

    for(let i = 0; i < len; i++) {
      if(i + 1 < len) {
        result[props[i]] = baseline.slice(index, baseline.indexOf(":", index));
        index = baseline.indexOf(":", index) + 1;
      } else {
        result[props[i]] = baseline.slice(index);
      }
    }
    return result;
  }

  clearFragment() {
    this.fragment = "";
  }
}
