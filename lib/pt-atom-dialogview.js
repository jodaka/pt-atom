'use babel';

// import {CompositeDisposable} from 'atom';
import Dialog from './dialog';
import * as child from 'child_process';
// import resultView from './result-view';
import resultView from './search-result-view';

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
      if(!this.rview) this.rview = new resultView();

      this.rview.preresult();

      this.search2(searchStr);

      this.close();
    } else {
      this.showError('error');
    }
  }

  search2(searchStr) {
    let pwd = atom.project.getPaths();
    // let rview = new resultView();

    let pt = child.spawn('pt', ['/nogroup', '/nocolor', '/e', `${searchStr}`, `${pwd}`]);
    pt.stdout.setEncoding('utf8');
    pt.stdout.on('data', (chunk) => {
      this.rview.data(chunk);
    });

    pt.stderr.on('data', (data) => {
      console.error(data);
    });

    pt.on('exit', (code) => {
      console.info(`pt process exited with code: ${code}`);
      this.rview.clean();
    });
  }

  search(searchStr) {
    let pwd = atom.project.getPaths();
    let ptcmd = `pt /nogroup /color /e ${searchStr} ${pwd}`;

    console.info(`searching root path: ${pwd}`);
    console.info(`searching command: ${ptcmd}`);

    let rview = new resultView();

    child.exec(ptcmd, (error, stdout, stderr) => {
      if (error) { console.error(error);}
      if (stderr) { console.error(stderr);}
      console.log(stdout);
      rview.data(stdout);
    });
  }
}
