import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue !== null ? JSON.parse(storageValue) : initialValue;
  });

  useEffect(() => {
    const storageListener = () => {
      const storageValue = localStorage.getItem(key);
      setValue(storageValue !== null ? JSON.parse(storageValue) : initialValue);
    };
    window.addEventListener('storage', storageListener);
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, [key, initialValue]);

  return value;
}

export default useLocalStorage;