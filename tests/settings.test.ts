import { App, PluginSettingTab, Setting as OriginalSetting, TextComponent } from 'obsidian';
import { AutoClassifierSettingTab } from '../src/settings';
import AutoClassifierPlugin from '../src/main';

jest.mock('obsidian');

// Create a more complete mock of the Setting class
class MockedSetting {
  settingEl: HTMLElement = document.createElement('div');
  infoEl: HTMLElement = document.createElement('div');
  nameEl: HTMLElement = document.createElement('div');
  descEl: HTMLElement = document.createElement('div');

  setName = jest.fn().mockReturnThis();
  setDesc = jest.fn().mockReturnThis();
  addText = jest.fn().mockReturnThis();
  addToggle = jest.fn().mockReturnThis();
  addDropdown = jest.fn().mockReturnThis();
  addTextArea = jest.fn().mockReturnThis();
  addMomentFormat = jest.fn().mockReturnThis();
  addButton = jest.fn().mockReturnThis();
  addExtraButton = jest.fn().mockReturnThis();
  addSearch = jest.fn().mockReturnThis();
  addSlider = jest.fn().mockReturnThis();
  then = jest.fn().mockReturnThis();
}

describe('AutoClassifierSettingTab', () => {
  let app: jest.Mocked<App>;
  let plugin: jest.Mocked<AutoClassifierPlugin>;
  let settingTab: AutoClassifierSettingTab;
  let mockSetting: MockedSetting;

  beforeEach(() => {
    app = {} as jest.Mocked<App>;
    plugin = {
      settings: { apiKey: 'test-api-key' },
      saveSettings: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<AutoClassifierPlugin>;

    mockSetting = new MockedSetting();

    (OriginalSetting as jest.MockedClass<typeof OriginalSetting>).mockImplementation(
      () => mockSetting as unknown as OriginalSetting
    );

    settingTab = new AutoClassifierSettingTab(app, plugin);
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('constructor initializes properties correctly', () => {
    expect(settingTab.app).toBe(app);
    expect(settingTab.plugin).toBe(plugin);
  });

  test('display method creates API key setting', () => {
    settingTab.display();

    expect(settingTab.containerEl.empty).toHaveBeenCalled();
    expect(OriginalSetting).toHaveBeenCalledWith(settingTab.containerEl);
    expect(mockSetting.setName).toHaveBeenCalledWith('API Key');
    expect(mockSetting.setDesc).toHaveBeenCalledWith('Enter your ChatGPT API key');
    expect(mockSetting.addText).toHaveBeenCalled();
  });

  test('API key change saves settings', async () => {
    const mockTextComponent = {
      setPlaceholder: jest.fn().mockReturnThis(),
      setValue: jest.fn().mockReturnThis(),
      onChange: jest.fn().mockImplementation(cb => cb('new-api-key')),
    } as unknown as TextComponent;

    mockSetting.addText.mockImplementation(cb => {
      cb(mockTextComponent);
      return mockSetting;
    });

    settingTab.display();

    expect(plugin.settings.apiKey).toBe('new-api-key');
    expect(plugin.saveSettings).toHaveBeenCalled();
  });
});