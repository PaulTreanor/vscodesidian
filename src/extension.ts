import * as vscode from 'vscode';
import { createStatusBarItem, updateStatusBarVisibility } from './vault-detection/statusbar-utils';
import * as path from 'path';

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
		// Load custom markdown styles
		const styleFilePath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'styles', 'markdown-styles.css'));
		vscode.workspace.getConfiguration('markdown').update('styles', [styleFilePath.fsPath], vscode.ConfigurationTarget.Global);


	} catch (error) {
		console.error('Error activating VSCodesidian:', error);
	}
}

export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}