import * as vscode from "vscode";
import { readdirSync } from "fs";
import { homedir } from "os";
import path = require("path");

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "go-to-rust-crate.goToRustCrate",
      () => {
        const cratesPath: string = path.join(
          homedir(),
          "/.cargo/registry/src"
        );

        const getDirectories = (folderPath: string) =>
          readdirSync(folderPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const parentFolders = getDirectories(cratesPath);

        const crates = {} as { [key: string]: string }

        parentFolders.forEach((folder: string) => {
          getDirectories(`${cratesPath}/${folder}`).forEach(
            (crateName: string) => {
              crates[crateName] = folder;
            }
          );
        });

        // TODO: remove following
        vscode.window.showInformationMessage(
          "Hello World from GoToRustCrate!"
        );
      }
    )
  );
}

export function deactivate() {}
