import axios from 'axios';

export async function getApiKey() {
  const url = 'https://getapikey1-ozfn6hjetq-uc.a.run.app';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
