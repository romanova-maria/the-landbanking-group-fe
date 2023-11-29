export function getMinutesToMilliseconds(minutes: number) {
  return minutes * 60 * 1000;
}

export function isExpired(timestamp: Date, minutes = 5) {
  const cacheExpirationMilliseconds = getMinutesToMilliseconds(minutes);
  const difference = new Date().getTime() - timestamp.getTime();

  return difference > cacheExpirationMilliseconds;
}

export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function getStoredItem<T>(name: string): T | null {
  const localItem = localStorage.getItem(name);
  return localItem !== null ? JSON.parse(localItem) : localItem;
}

export function storeItem<T>(name: string, item: T) {
  localStorage.setItem(name, JSON.stringify(item));
}
