'use babel';

// import PtAtomView from './pt-atom-view';
import PtAtomDialogView from './pt-atom-dialogview'
import { CompositeDisposable } from 'atom';
// import * as child from 'child_process'

export default {

  ptAtomView: null,
  // modalPanel: null,
  // subscriptions: null,

  activate(state) {

    // ptAtomView = new PtAtomView(state.ptAtomViewState);

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pt-atom:search': () => {
        if(!this.ptAtomView) {
          this.ptAtomView = new PtAtomDialogView(state.ptAtomViewState)
        }
        this.ptAtomView.attach();
      }
    }));

    // this.ptAtomView = new PtAtomView(state.ptAtomViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.ptAtomView.getElement(),
    //   visible: false
    // });
    //
    // // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    // this.subscriptions = new CompositeDisposable();
    //
    // // Register command that toggles this view
    // this.subscriptions.add(atom.commands.add('atom-workspace', {
    //   'pt-atom:toggle': () => {
    //     this.toggle()
    //   },
    //
    //   'pt-atom:testview': () => {
    //     if(!this.testView) {
    //       const TestView = require('./pt-atom-testview');
    //       this.testView = new TestView();
    //     }
    //     this.testView.toggle();
    //   },
    //
    //   'pt-atom:open': () => {
    //     this.open();
    //   }
    // }));
  },

  deactivate() {
    ptAtomView.destroy();
    // this.modalPanel.destroy();
    // this.subscriptions.dispose();
    // this.ptAtomView.destroy();
  }

  // serialize() {
  //   return {
  //     ptAtomViewState: this.ptAtomView.serialize()
  //   };
  // }

  // open() {
  //   console.log('hogehoge')
  //   console.log('execute open command');
  //   let pwd = atom.project.getPaths();
  //   let ptcmd = "pt hogehoge ${pwd}";
  //
  //   console.log(pwd);
  //   console.log(ptcmd);
  //
  //   child.exec(ptcmd, (error, stdout, stderr) => {
  //     console.error(error);
  //     console.error(stderr);
  //     console.log(stdout);
  //   });
  // },
  //
  // toggle() {
  //   console.log('PtAtom was toggled!');
  //   return (
  //     this.modalPanel.isVisible() ?
  //     this.modalPanel.hide() :
  //     this.modalPanel.show()
  //   );
  // }

};
