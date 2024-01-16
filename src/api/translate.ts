import axios from 'axios';
import { getApiKey1, getApiKey2 } from '@/api/cloud';

export async function translateKor(text: string): Promise<string> {
  const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions';
  const { key } = await getApiKey1();

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: `Translate the following English text to Korean: ${text}`,
        temperature: 0.7,
        max_tokens: 999,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
      },
    );

    const translatedText = response.data.choices[0]?.text.trim();
    return translatedText || '번역이 제대로 되지 않았습니다.';
  } catch (e) {
    console.error(e);
    return '에러가 발생했습니다. 잠시후 다시 시도해주시기 바랍니다.';
  }
}

export async function translateEng(text: string): Promise<string> {
  const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct-0914/completions';
  const { key } = await getApiKey2();

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: `Translate the following Korean text to English: ${text}`,
        temperature: 0.7,
        max_tokens: 999,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
      },
    );

    const translatedText = response.data.choices[0]?.text.trim();
    return translatedText || 'Translation not available';
  } catch (e) {
    console.error(e);
    return 'Error during translation';
  }
}
