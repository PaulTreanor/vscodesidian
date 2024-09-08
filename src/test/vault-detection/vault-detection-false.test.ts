import { vi, describe, it, expect } from 'vitest';
import { isObsidianVault } from '../../vault-detection/vault-detection';

describe('isObsidianVault when VSCode open in obsidian vault', () => {

    it('should return false if no workspace is open', () => {
        vi.mock('vscode', () => ({
            workspace: {
                workspaceFolders: null
            }
        }));

        expect(isObsidianVault()).toBe(false);
    });

    it('should return false if workspace item is not obsidian vault', () => {
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

        expect(isObsidianVault()).toBe(false);
    });
});

