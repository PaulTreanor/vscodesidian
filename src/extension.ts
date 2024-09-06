import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('VSCodesidian extension Running');

    try {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        statusBarItem.text = 'Obsidian Vault';
        statusBarItem.tooltip = 'VSCodesidian detected open vault';
        context.subscriptions.push(statusBarItem);

        detectObsidianVault();

        // Listen for workspace folder changes
        context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => detectObsidianVault()));
    } catch (error) {
        console.error('Error activating VSCodesidian:', error);
    }
}

function detectObsidianVault() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        statusBarItem.hide();
        return;
    }

    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const obsidianDir = path.join(workspaceRoot, '.obsidian');

    if (fs.existsSync(obsidianDir)) {
        console.log('Obsidian vault detected');
        statusBarItem.text = 'Obsidian';
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}