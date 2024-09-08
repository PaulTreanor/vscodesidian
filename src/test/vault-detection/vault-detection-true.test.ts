import { vi, describe, it, expect } from 'vitest';
import { isObsidianVault } from '../../vault-detection/vault-detection';

describe('isObsidianVault when VSCode open in obsidian vault', () => {

    it('should return true if workspace item is obsidian vault', () => {
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

        expect(isObsidianVault()).toBe(true);
    });
});
