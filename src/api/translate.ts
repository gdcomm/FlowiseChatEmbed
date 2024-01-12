import axios from 'axios';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'gdcomm',
  host: 'database-postgresql-1.cnyg6emkyn2a.ap-northeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'gdcomm18!!',
  port: 5432,
});

export async function getApiKey(): Promise<string> {
  try {
    const result = await pool.query('SELECT secret_key FROM auth WHERE active = true');
    if (result.rows.length > 0) {
      return result.rows[0].secret_key;
    }
    return '';
  } catch (error) {
    console.error('Error fetching API key from the database:', error);
    return '';
  }
}

async function translateWithGPT3(from: string, to: string, text: string): Promise<string> {
  const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions';
  const apiKey = await getApiKey();

  if (!apiKey) {
    console.error('API key not found in the database');
    return 'API key not available';
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: `Translate the following ${from} text to ${to}: "${text}"`,
        temperature: 0.7,
        max_tokens: 999,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
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

export default translateWithGPT3;
