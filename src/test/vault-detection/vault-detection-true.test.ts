import { vi, describe, it, expect } from 'vitest';
import { detectObsidianVault } from '../../vault-detection/vault-detection';
import * as vscode from 'vscode';

describe('Vault detection when open in obsidian vault', () => {

    const mockStatusBarItem: Partial<vscode.StatusBarItem> = {
        hide: vi.fn(),
        show: vi.fn(),
        text: '',
    };

    it('should show status bar item if workspace item is obsidian vault', () => {
        vi.mock('vscode', () => ({
            workspace: {
                workspaceFolders: [
                    {
                        uri: {
                            fsPath: '/Users/paul/Documents/obsidian/vault'
                        }
                    }
                ]
            }
        }));
     
        vi.mock('fs', () => ({
            existsSync: vi.fn().mockReturnValue(true)
        }));

        detectObsidianVault(mockStatusBarItem as vscode.StatusBarItem);

        expect(mockStatusBarItem.show).toHaveBeenCalled();
    });

});
