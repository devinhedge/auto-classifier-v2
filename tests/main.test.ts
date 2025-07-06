import { Plugin, Notice } from 'obsidian';
import AutoClassifierPlugin from '../src/main';
import { ViewManager } from '../src/view-manager';
import { AutoClassifierSettingTab } from '../src/settings';

jest.mock('obsidian');
jest.mock('../src/view-manager');
jest.mock('../src/settings');

describe('AutoClassifierPlugin', () => {
  let plugin: AutoClassifierPlugin;
  let mockApp: any;
  let mockManifest: any;

  beforeEach(() => {
    mockApp = {
      vault: {
        getName: jest.fn().mockReturnValue('Test Vault')
      }
    };
    mockManifest = { name: 'Auto Classifier', version: '1.0.0' };
    plugin = new AutoClassifierPlugin(mockApp as any, mockManifest);

    // Mock loadData and saveData
    (plugin as any).loadData = jest.fn().mockResolvedValue({});
    (plugin as any).saveData = jest.fn().mockResolvedValue(undefined);

    // Mock addSettingTab
    plugin.addSettingTab = jest.fn();
  });

  test('plugin instance', () => {
    expect(plugin).toBeInstanceOf(Plugin);
    expect(plugin).toBeInstanceOf(AutoClassifierPlugin);
  });

  test('loadSettings', async () => {
    await plugin.loadSettings();
    expect(plugin.settings).toBeDefined();
    expect((plugin as any).loadData).toHaveBeenCalled();
  });

  test('saveSettings', async () => {
    plugin.settings = { apiKey: 'test-key' } as any;
    await plugin.saveSettings();
    expect((plugin as any).saveData).toHaveBeenCalledWith(plugin.settings);
  });

  test('onload', async () => {
    await plugin.onload();
    expect(plugin.viewManager).toBeInstanceOf(ViewManager);
    expect(plugin.addSettingTab).toHaveBeenCalledWith(expect.any(AutoClassifierSettingTab));
    // Add more expectations for the commands added in onload
  });
});