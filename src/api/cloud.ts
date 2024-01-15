import axios from 'axios';

export async function getApiKey1() {
  const url = 'https://getapikey1-ozfn6hjetq-uc.a.run.app';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getApiKey2() {
  const url = 'https://getapikey2-ozfn6hjetq-uc.a.run.app';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


