import axios from 'axios';
import { getApiKey } from '@/api/cloud';

export async function translateWithGPT3(from: string, to: string, text: string): Promise<string> {
  const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions';
  const { key } = await getApiKey();

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: `Translate the following ${from} text to ${to}. """${text}"""`,
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

    const translatedText = response.data.choices[0]?.text.trim().replace(/^"|"$/g, '');
    return translatedText || '번역이 제대로 되지 않았습니다.';
  } catch (e) {
    console.error(e);
    return '에러가 발생했습니다. 잠시후 다시 시도해주시기 바랍니다.';
  }
}
