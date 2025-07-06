import { App, PluginSettingTab, Setting } from "obsidian";
import { ChatGPT } from './api';
import { AutoClassifierSettings, CommandOption, ReferenceType, OutLocation, OutType, DEFAULT_SETTINGS } from './types';
import { DEFAULT_CHAT_ROLE, DEFAULT_PROMPT_TEMPLATE, DEFAULT_PROMPT_TEMPLATE_WO_REF } from './template'

export class AutoClassifierSettingTab extends PluginSettingTab {
    plugin: any; // Replace 'any' with the actual type of your plugin
    constructor(app: App, plugin: any) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        // Implement your settings UI here
        new Setting(containerEl)
            .setName('API Key')
            .setDesc('Enter your ChatGPT API key')
            .addText(text => text
                .setPlaceholder('Enter API key')
                .setValue(this.plugin.settings.apiKey)
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.plugin.saveSettings();
                }));

        // Add more settings as needed, based on the AutoClassifierSettings interface
    }

    // ... rest of the AutoClassifierSettingTab class implementation ...
}

console.log('Exports from src/settings.ts:', { AutoClassifierSettingTab });
