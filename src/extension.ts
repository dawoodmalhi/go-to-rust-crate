import * as vscode from "vscode";
import { readdirSync, existsSync } from "fs";
import { showAndOpenSelected } from './showAndOpenSelected';
import cratesBasePath from './cratesBasePath';

const sanity = () => {
  try {
    if(!existsSync(cratesBasePath)){
      throw new Error('Crates Directory does not exist.');
    }
  } catch(error: any) {
    console.error(error);
    vscode.window.showErrorMessage(`Go To Rust Crate: ${error?.message}`);
    return false;
  }
  return true;
};



export function activate(context: vscode.ExtensionContext) {
  if(!sanity){
    return;
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "go-to-rust-crate.goToRustCrate",
      () => {

        const getDirectories = (folderPath: string) =>
          readdirSync(folderPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const parentFolders = getDirectories(cratesBasePath);

        const crates = {} as { [key: string]: string };

        parentFolders.forEach((folder: string) => {
          getDirectories(`${cratesBasePath}/${folder}`).forEach(
            (crateName: string) => {
              crates[crateName] = folder;
            }
          );
        });

        showAndOpenSelected(crates);
      }
    )
  );
}

export function deactivate() {}
