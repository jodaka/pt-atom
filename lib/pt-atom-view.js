'use babel';

import {CompositeDisposable} from 'atom';
import {TextEditorView, View} from 'atom-space-pen-views';
import * as child from 'child_process';

export default class PtAtomView extends View {

  static content({prompt} = {}) {
    return this.div({class: 'panel overlay from-top'}, () => {
      this.div({class: 'inset-panel'}, () => {
        this.div({class: 'panel-heading'}, () => {
          this.span({class: 'title'}, 'hogehoge');
        }),
        this.div({class: 'panel-body'}, () => {
          this.div({class: 'postForm'}, () => {
            this.subview('searchEditor', new TextEditorView({mini: true, placeholderText: 'search text...'}));
          });
        });
      });
    });
  }

  initialize(serializeState) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'pt-atom:search': () => {
        this.search();
      }
    }));
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  search() {
    this.open();
  }

  open() {
    atom.workspace.addTopPanel({item: this});
    let pwd = atom.project.getPaths();
    let ptcmd = `pt hogehoge ${pwd}`;


    console.warn(`searching root path: ${pwd}`);
    console.warn(`searching command: ${ptcmd}`);

    child.exec(ptcmd, (error, stdout, stderr) => {
      if (error) { console.error(error);}
      if (stderr) { console.error(stderr);}
      console.warn(stdout);
    });
  }
}
