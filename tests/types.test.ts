import {
  AutoClassifierSettings,
  CommandOption,
  ReferenceType,
  OutLocation,
  OutType,
  DEFAULT_SETTINGS
} from '../src/types';

describe('Types and Default Settings', () => {
  test('DEFAULT_SETTINGS has the correct structure', () => {
    expect(DEFAULT_SETTINGS).toHaveProperty('apiKey');
    expect(DEFAULT_SETTINGS).toHaveProperty('apiKeyCreatedAt');
    expect(DEFAULT_SETTINGS).toHaveProperty('baseURL');
    expect(DEFAULT_SETTINGS).toHaveProperty('commandOption');

    expect(DEFAULT_SETTINGS.apiKey).toBe('');
    expect(DEFAULT_SETTINGS.apiKeyCreatedAt).toBeNull();
    expect(DEFAULT_SETTINGS.baseURL).toBe('https://api.openai.com/v1');

    const commandOption = DEFAULT_SETTINGS.commandOption;
    expect(commandOption).toHaveProperty('useRef', true);
    expect(commandOption).toHaveProperty('refs', []);
    expect(commandOption).toHaveProperty('manualRefs', []);
    expect(commandOption).toHaveProperty('refType', ReferenceType.All);
    expect(commandOption).toHaveProperty('filterRegex', '');
    expect(commandOption).toHaveProperty('outLocation', OutLocation.Cursor);
    expect(commandOption).toHaveProperty('outType', OutType.Tag);
    expect(commandOption).toHaveProperty('key', 'tags');
    expect(commandOption).toHaveProperty('outPrefix', '');
    expect(commandOption).toHaveProperty('outSuffix', '');
    expect(commandOption).toHaveProperty('overwrite', false);
    expect(commandOption).toHaveProperty('useCustomCommand', false);
    expect(commandOption).toHaveProperty('chat_role', '');
    expect(commandOption).toHaveProperty('prmpt_template', '');
    expect(commandOption).toHaveProperty('model', 'gpt-3.5-turbo');
    expect(commandOption).toHaveProperty('max_tokens', 150);
    expect(commandOption).toHaveProperty('max_suggestions', 3);
  });

  test('ReferenceType enum has correct values', () => {
    expect(ReferenceType.All).toBe(0);
    expect(ReferenceType.Filter).toBe(1);
    expect(ReferenceType.Manual).toBe(2);
    expect(ReferenceType[0]).toBe('All');
    expect(ReferenceType[1]).toBe('Filter');
    expect(ReferenceType[2]).toBe('Manual');
  });

  test('OutLocation enum has correct values', () => {
    expect(OutLocation.Cursor).toBe(0);
    expect(OutLocation.ContentTop).toBe(1);
    expect(OutLocation[0]).toBe('Cursor');
    expect(OutLocation[1]).toBe('ContentTop');
  });

  test('OutType enum has correct values', () => {
    expect(OutType.FrontMatter).toBe(0);
    expect(OutType.Title).toBe(1);
    expect(OutType.Tag).toBe(2);
    expect(OutType.Wikilink).toBe(3);
    expect(OutType[0]).toBe('FrontMatter');
    expect(OutType[1]).toBe('Title');
    expect(OutType[2]).toBe('Tag');
    expect(OutType[3]).toBe('Wikilink');
  });
});