import * as vscode from 'vscode';
import { isObsidianVault } from './vault-detection';

function createStatusBarItem(statusBarItem: vscode.StatusBarItem) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = 'Obsidian';
	statusBarItem.tooltip = 'VSCodesidian detected open vault';
	return statusBarItem;
}

function updateStatusBarVisibility(statusBarItem: vscode.StatusBarItem) {
	if (isObsidianVault()) {
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

export {
    createStatusBarItem,
    updateStatusBarVisibility
}