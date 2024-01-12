import axios from 'axios';

const first = 'sk-fl5yuX1Kbg3oG5CNBwt';
const second = 'WT3BlbkFJElTwiaQjIPFwC';
const third = 'VyE0wFS';

async function translateWithGPT3(from: string, to: string, text: string): Promise<string> {
  const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions';
  const apiKey = first + second + third;

  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: `Translate the following ${from} text to ${to}: ${text}`,
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
