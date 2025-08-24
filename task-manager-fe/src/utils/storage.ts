export function setItemWithExpiry<T>(key: string, value: T, ttl: number = 60 * 60 * 1000): void {
  const item = {
    value,
    expiry: (new Date()).getTime() + ttl, // time-to-live in ms
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry<T>(key: string): T | null {
  const itemStr: string | null = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item: { value: T; expiry: number } = JSON.parse(itemStr) as { value: T; expiry: number };

    if ((new Date()).getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;

  } catch {
    return null; // In case of invalid JSON
  }
}
