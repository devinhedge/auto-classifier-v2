import {
  DEFAULT_CHAT_ROLE,
  DEFAULT_PROMPT_TEMPLATE,
  DEFAULT_PROMPT_TEMPLATE_WO_REF
} from '../src/template';

describe('Template Constants', () => {
  test('DEFAULT_CHAT_ROLE is defined correctly', () => {
    expect(DEFAULT_CHAT_ROLE).toBe('You are a JSON answer bot. Don\'t answer other words.');
  });

  test('DEFAULT_PROMPT_TEMPLATE is defined correctly', () => {
    const expectedTemplate = `Classify this content:
"""
{{input}}
"""
Answer format is JSON {reliability:0~1, outputs:[tag1,tag2,...]}. 
Even if you are unsure, qualify the reliability and select the best matches.
Respond only with valid JSON. Do not write an introduction or summary.
Output tags must be from these options:

{{reference}}
`;
    expect(DEFAULT_PROMPT_TEMPLATE).toBe(expectedTemplate);
  });

  test('DEFAULT_PROMPT_TEMPLATE_WO_REF is defined correctly', () => {
    const expectedTemplate = `Classify this content:
"""
{{input}}
"""
Answer format is JSON {reliability:0~1, output:selected_category}. 
Even if you are not sure, qualify the reliability and recommend a proper category.
Respond only with valid JSON. Do not write an introduction or summary.
`;
    expect(DEFAULT_PROMPT_TEMPLATE_WO_REF).toBe(expectedTemplate);
  });

  test('Templates contain expected placeholders', () => {
    expect(DEFAULT_PROMPT_TEMPLATE).toContain('{{input}}');
    expect(DEFAULT_PROMPT_TEMPLATE).toContain('{{reference}}');
    expect(DEFAULT_PROMPT_TEMPLATE_WO_REF).toContain('{{input}}');
  });
});