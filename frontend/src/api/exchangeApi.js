const BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export async function fetchRates(source = 'EUR') {
  const url = `${BASE_URL}/${source}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('API error');
  return response.json();
}
