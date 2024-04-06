export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(
      new Error(`Ответ сети был не ok. Статус ответа сервера: ${res.status}`)
    );
  }
  return res.json();
}

export async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}