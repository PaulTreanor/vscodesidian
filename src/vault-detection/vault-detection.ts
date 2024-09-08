import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function detectObsidianVault(statusBarItem: vscode.StatusBarItem) {
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