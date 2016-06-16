'use babel';

// import {CompositeDisposable} from 'atom';
import Dialog from './dialog';
import * as child from 'child_process';

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
      this.search(searchStr);
      this.close();
    } else {
      this.showError('error');
    }
  }

  search(searchStr) {
    let pwd = atom.project.getPaths();
    let ptcmd = `pt ${searchStr} ${pwd}`;

    console.info(`searching root path: ${pwd}`);
    console.info(`searching command: ${ptcmd}`);

    child.exec(ptcmd, (error, stdout, stderr) => {
      if (error) { console.error(error);}
      if (stderr) { console.error(stderr);}
      console.log(stdout);
    });
  }
}
