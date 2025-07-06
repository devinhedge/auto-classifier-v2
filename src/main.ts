import { Plugin, Notice } from "obsidian";
import { AutoClassifierSettings, CommandOption, OutLocation, OutType, DEFAULT_SETTINGS } from "./types";
import { AutoClassifierSettingTab } from "./settings";
import { ViewManager } from "./view-manager";
import { ChatGPT } from "./api";

export default class AutoClassifierPlugin extends Plugin {
    settings: AutoClassifierSettings;
    viewManager: ViewManager;

    async onload() {
        await this.loadSettings();
        this.viewManager = new ViewManager(this.app);

        // ... rest of the onload method implementation ...

        this.addSettingTab(new AutoClassifierSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    // ... rest of the AutoClassifierPlugin class implementation ...
}

console.log('Exports from src/main.ts:', { default: AutoClassifierPlugin });
