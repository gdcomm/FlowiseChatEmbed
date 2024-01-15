import axios from 'axios';

async function getApiKey() {
  const url = 'https://getapikey-ozfn6hjetq-uc.a.run.app/';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default getApiKey
