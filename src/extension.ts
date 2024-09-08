import * as vscode from 'vscode';
import { detectObsidianVault } from './vault-detection/vault-detection';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('VSCodesidian extension Running');

	try {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
		statusBarItem.text = 'Obsidian Vault';
		statusBarItem.tooltip = 'VSCodesidian detected open vault';
		context.subscriptions.push(statusBarItem);

		detectObsidianVault(statusBarItem);

		// Listen for workspace folder changes
		context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => detectObsidianVault(statusBarItem)));
	} catch (error) {
		console.error('Error activating VSCodesidian:', error);
	}
}

export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}