import { vi, describe, it, expect } from 'vitest';
import { detectObsidianVault } from '../../vault-detection/vault-detection';
import * as vscode from 'vscode';

describe('Vault detection when not in obsidian vault', () => {

    const mockStatusBarItem: Partial<vscode.StatusBarItem> = {
        hide: vi.fn(),
        show: vi.fn(),
        text: '',
    };

    it('should hide status bar item if no workspace is open', () => {
        vi.mock('vscode', () => ({
            workspace: {
                workspaceFolders: null
            }
        }));

        detectObsidianVault(mockStatusBarItem as vscode.StatusBarItem);

        expect(mockStatusBarItem.hide).toHaveBeenCalled();
    });

    it('should hide status bar item if workspace item is not obsidian vault', () => {
        vi.mock('vscode', () => ({
            workspace: {
                workspaceFolders: [
                    {
                        uri: {
                            fsPath: '/Users/paul/Documents/normal/folder'
                        }
                    }
                ]
            }
        }));
     
        vi.mock('fs', () => ({
            existsSync: vi.fn().mockReturnValue(false)
        }));

        detectObsidianVault(mockStatusBarItem as vscode.StatusBarItem);

        expect(mockStatusBarItem.hide).toHaveBeenCalled();
    });
});

