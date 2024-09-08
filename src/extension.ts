import * as vscode from 'vscode';
import { isObsidianVault } from './vault-detection/vault-detection';
import { ObsidianMarkdownPreviewProvider } from './obsidian-markdown-preview';




function createStatusBarItem() {
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


let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('VSCodesidian extension Running');

	try {
		// Add status bar item showing Obsidian Vault detected
		statusBarItem = createStatusBarItem();
		context.subscriptions.push(statusBarItem);
		updateStatusBarVisibility(statusBarItem);
		// Listen for workspace folder changes (for vault detection)
		context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => updateStatusBarVisibility(statusBarItem)));

		// Register custom Markdown preview provider
		const obsidianMarkdownPreviewProvider = new ObsidianMarkdownPreviewProvider(context);
		context.subscriptions.push(
			vscode.workspace.registerTextDocumentContentProvider('obsidian-markdown-preview', obsidianMarkdownPreviewProvider)
		);

		// Register command to open custom Markdown preview
		context.subscriptions.push(vscode.commands.registerCommand('vscodesidian.openObsidianPreview', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const uri = editor.document.uri;
				const previewUri = uri.with({ scheme: 'obsidian-markdown-preview' });
				vscode.commands.executeCommand('markdown.showPreview', previewUri);
			}
		}));
	} catch (error) {
		console.error('Error activating VSCodesidian:', error);
	}
}

export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}