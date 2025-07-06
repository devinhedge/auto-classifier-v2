export class Plugin {
  constructor(app: any, manifest: any) {}
  async loadData(): Promise<any> { return {}; }
  async saveData(data: any): Promise<void> {}
}

export class PluginSettingTab {
  app: any;
  plugin: any;
  containerEl: HTMLElement;
  constructor(app: any, plugin: any) {
    this.app = app;
    this.plugin = plugin;
    this.containerEl = {
      empty: jest.fn(),
      createEl: jest.fn(),
    } as unknown as HTMLElement;
  }
  display(): void {}
}

export const Setting = jest.fn().mockImplementation(() => ({
  setName: jest.fn().mockReturnThis(),
  setDesc: jest.fn().mockReturnThis(),
  addText: jest.fn().mockReturnThis(),
}));

export interface App {}

console.log('Mock obsidian module loaded');