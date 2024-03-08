import { useEffect, useState } from 'react';

function loadStoredValue(storageKey, defaultValue) {
  const storedValue = JSON.parse(localStorage.getItem(storageKey));
  const storedSessionValue = JSON.parse(sessionStorage.getItem(storageKey));

  if (storedValue) {
    return storedValue;
  }

  if (storedSessionValue) {
    return storedSessionValue;
  }

  return defaultValue;
}

export default function useCustomLocalStorage(storageKey, defaultValue) {
  const [storedContent, setStoredContent] = useState(() => {
    return loadStoredValue(storageKey, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(storedContent));
    sessionStorage.setItem(storageKey, JSON.stringify(storedContent));
  }, [storageKey, storedContent]);

  return [storedContent, setStoredContent];
}
