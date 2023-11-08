import { writable } from 'svelte/store';

export function LocalStorageStore(key, initial) {
  const isBrowser = typeof window !== 'undefined'; // Check if the code is running in a browser environment

  if (isBrowser && !localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(initial));
  }

  let saved = isBrowser ? JSON.parse(localStorage.getItem(key)) : initial;
  let { subscribe, set, update } = writable(saved);

  return {
    subscribe,
    set: (value) => {
      if (isBrowser) {
        localStorage.setItem(key, JSON.stringify(value));
      }
      return set(value);
    },
    update,
    get: () => {
      if (isBrowser) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      return saved;
    },
  };
}

