import * as vscode from 'vscode';
import { createStatusBarItem, updateStatusBarVisibility } from './vault-detection/statusbar-utils';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('VSCodesidian extension Running');

	try {
		// Add status bar item showing Obsidian Vault detected
		statusBarItem = createStatusBarItem(statusBarItem);
		context.subscriptions.push(statusBarItem);
		updateStatusBarVisibility(statusBarItem);
		// Listen for workspace folder changes (for vault detection)
		context.subscriptions.push(
			vscode.workspace.onDidChangeWorkspaceFolders(
				() => updateStatusBarVisibility(statusBarItem)
			)
		);

	} catch (error) {
		console.error('Error activating VSCodesidian:', error);
	}
}

export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}