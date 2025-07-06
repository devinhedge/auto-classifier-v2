jest.mock('openai/shims/node', () => {}, { virtual: true });

const mockOpenAI = {
  chat: {
    completions: {
      create: jest.fn()
    }
  }
};

class MockAPIError extends Error {
  status: number;
  error: any;
  headers: any;

  constructor(status: number, error: any, message: string, headers: any) {
    super(message);
    this.status = status;
    this.error = error;
    this.headers = headers;
  }
}

jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn(() => mockOpenAI),
  APIError: MockAPIError
}));

import { ChatGPT } from '../src/api';
import OpenAI from 'openai';

describe('ChatGPT', () => {
  const mockApiKey = 'test-api-key';
  const mockSystemRole = 'You are a helpful assistant.';
  const mockUserPrompt = 'Hello, how are you?';
  const mockResponse = 'I am an AI language model, so I don\'t have feelings, but I\'m functioning well and ready to assist you. How can I help you today?';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('callAPI successful call', async () => {
    mockOpenAI.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: mockResponse } }]
    });

    const result = await ChatGPT.callAPI(mockSystemRole, mockUserPrompt, mockApiKey);

    expect(result).toBe(mockResponse);
    expect(OpenAI).toHaveBeenCalledWith({
      apiKey: mockApiKey,
      dangerouslyAllowBrowser: true,
      baseURL: 'https://api.openai.com/v1'
    });
    expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: mockSystemRole },
        { role: "user", content: mockUserPrompt }
      ],
      max_tokens: 150,
      temperature: 0,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0.5
    });
  });

  test('callAPI with custom parameters', async () => {
    mockOpenAI.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: mockResponse } }]
    });

    const customModel = 'gpt-4';
    const customMaxTokens = 200;
    const customTemperature = 0.8;
    const customBaseURL = 'https://custom-openai-api.com/v1';

    await ChatGPT.callAPI(
      mockSystemRole,
      mockUserPrompt,
      mockApiKey,
      customModel,
      customMaxTokens,
      customTemperature,
      undefined,
      undefined,
      undefined,
      customBaseURL
    );

    expect(OpenAI).toHaveBeenCalledWith({
      apiKey: mockApiKey,
      dangerouslyAllowBrowser: true,
      baseURL: customBaseURL
    });
    expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith(expect.objectContaining({
      model: customModel,
      max_tokens: customMaxTokens,
      temperature: customTemperature
    }));
  });

  test('callAPI handles OpenAI.APIError', async () => {
    const mockError = new MockAPIError(500, {
      message: 'Internal Server Error',
      type: 'internal_server_error',
      code: 'internal_server_error'
    }, 'Error', {});

    mockOpenAI.chat.completions.create.mockRejectedValue(mockError);

    await expect(ChatGPT.callAPI(mockSystemRole, mockUserPrompt, mockApiKey))
      .rejects
      .toThrow('OpenAI API Error: 500 - Error');
  });

  test('callAPI handles other errors', async () => {
    const mockError = new Error('Network error');

    mockOpenAI.chat.completions.create.mockRejectedValue(mockError);

    await expect(ChatGPT.callAPI(mockSystemRole, mockUserPrompt, mockApiKey))
      .rejects
      .toThrow('Network error');
  });
});