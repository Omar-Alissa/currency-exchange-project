const BASE_URL = 'https://api.exchangerate.host/live';

export async function fetchRates(source = 'USD') {
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
  const url = `${BASE_URL}?access_key=${apiKey}&source=${source}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('API error');
  return response.json();
}
