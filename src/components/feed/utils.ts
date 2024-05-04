export function formatDate(date: string | number | Date) {
  const d = new Date(date);
  const now = new Date();
  const pad = (num: number) => (num < 10 ? `0${num}` : num);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  let dateStr = "";

  if (diffDays === 0) {
    dateStr = "Сегодня";
  } else if (diffDays === 1) {
    dateStr = "Вчера";
  } else {
    dateStr = `${diffDays} дней назад`;
  }

  return `${dateStr}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export enum Status {
  pending = "Готовится",
  done = "Выполнен",
  created = "Отменён",
}
