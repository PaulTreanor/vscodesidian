import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class ObsidianMarkdownPreviewProvider implements vscode.TextDocumentContentProvider {
	constructor(private context: vscode.ExtensionContext) {}

	provideTextDocumentContent(uri: vscode.Uri): string {
		const originalUri = uri.with({ scheme: 'file' });
		const content = fs.readFileSync(originalUri.fsPath, 'utf8');
		return this.processBacklinks(content, originalUri);
	}

	private processBacklinks(content: string, currentUri: vscode.Uri): string {
		// Implement backlink processing here
		// This is a simple example and might need to be expanded
		const backlinkRegex = /\[\[(.*?)\]\]/g;
		return content.replace(backlinkRegex, (match, p1) => {
			const linkPath = path.join(path.dirname(currentUri.fsPath), p1 + '.md');
			const linkUri = vscode.Uri.file(linkPath);
			return `[${p1}](${linkUri.with({ scheme: 'obsidian-markdown-preview' })})`;
		});
	}
}