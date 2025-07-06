export interface AutoClassifierSettings {
    apiKey: string;
    apiKeyCreatedAt: Date | null;
    baseURL: string;
    commandOption: CommandOption;
}

export interface CommandOption {
    useRef: boolean;
    refs: string[];
    manualRefs: string[];
    refType: ReferenceType;
    filterRegex: string;
    outLocation: OutLocation;
    outType: OutType;
    key: string;
    outPrefix: string;
    outSuffix: string;
    overwrite: boolean;
    useCustomCommand: boolean;
    chat_role: string;
    prmpt_template: string;
    model: string;
    max_tokens: number;
    max_suggestions: number;
}

export enum ReferenceType {
    All,
    Filter,
    Manual,
}

export enum OutLocation {
    Cursor,
    ContentTop,
}

export enum OutType {
    FrontMatter,
    Title,
    Tag,
    Wikilink,
}

export const DEFAULT_SETTINGS: AutoClassifierSettings = {
    apiKey: '',
    apiKeyCreatedAt: null,
    baseURL: 'https://api.openai.com/v1',
    commandOption: {
        useRef: true,
        refs: [],
        manualRefs: [],
        refType: ReferenceType.All,
        filterRegex: '',
        outLocation: OutLocation.Cursor,
        outType: OutType.Tag,
        key: 'tags',
        outPrefix: '',
        outSuffix: '',
        overwrite: false,
        useCustomCommand: false,
        chat_role: '', // You may need to update this with the correct default value
        prmpt_template: '', // You may need to update this with the correct default value
        model: "gpt-3.5-turbo",
        max_tokens: 150,
        max_suggestions: 3,
    },
};