import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function isObsidianVault() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return false;
    }
    
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
	const obsidianDir = path.join(workspaceRoot, '.obsidian');

	if (fs.existsSync(obsidianDir)) {
		console.log('Obsidian vault detected');
        return true;
	} else {
        return false;
	}
}