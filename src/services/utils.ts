export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(
      new Error(`Ответ сети был не ok. Статус ответа сервера: ${res.status}`)
    );
  }
  return res.json();
}

export async function request(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  return checkResponse(res);
}
