import * as vscode from 'vscode';
import cratesBasePath from './cratesBasePath';

export const showAndOpenSelected = async (crates: { [key: string]: string }) => {
  try{
    const selection = await showCrates(Object.keys(crates));

    if(!selection){
      return;
    }

    open(selection, crates[selection]);
  } catch(error: any) {
    console.error(error);
    vscode.window.showErrorMessage(`Open Rust Crate: ${error.message}`);
  }
}; 

// show rust crates options
const showCrates = async (choices: string[]) => {
  const options = { placeHolder: 'Select a crate to open' };
  return vscode.window.showQuickPick(choices, options);
};

const open = async (selection: string | void, crateFolder: string) => {
  if (!selection) {
    return;
  }

  // open the selected crate in new window
  const uri = vscode.Uri.file(`${cratesBasePath}/${crateFolder}/${selection}`);
  vscode.commands.executeCommand('vscode.openFolder', uri, true);
};

